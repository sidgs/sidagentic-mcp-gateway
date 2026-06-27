package dashboard

import (
	"fmt"
	"math"
	"sort"
	"strings"
	"time"

	"sami.io/mcpgateway/internal/model"
	"sami.io/mcpgateway/pkg/types"
)

const (
	defaultObservabilityLimit       = 10
	defaultObservabilityTrafficLimit = 50
)

type observabilityWindow struct {
	Range string
	From  time.Time
	To    time.Time
}

func parseObservabilityWindow(rangeKey string, fromRaw, toRaw string) (observabilityWindow, error) {
	now := time.Now().UTC()
	window := observabilityWindow{Range: strings.TrimSpace(rangeKey), To: now}

	switch window.Range {
	case "", "24h":
		window.Range = "24h"
		window.From = now.Add(-24 * time.Hour)
	case "7d":
		window.From = now.Add(-7 * 24 * time.Hour)
	case "30d":
		window.From = now.Add(-30 * 24 * time.Hour)
	case "custom":
		if fromRaw == "" || toRaw == "" {
			return window, fmt.Errorf("custom range requires from and to")
		}
		from, err := time.Parse(time.RFC3339, fromRaw)
		if err != nil {
			return window, fmt.Errorf("invalid from timestamp: %w", err)
		}
		to, err := time.Parse(time.RFC3339, toRaw)
		if err != nil {
			return window, fmt.Errorf("invalid to timestamp: %w", err)
		}
		window.From = from.UTC()
		window.To = to.UTC()
	default:
		return window, fmt.Errorf("unsupported range %q", rangeKey)
	}

	if !window.From.Before(window.To) {
		return window, fmt.Errorf("from must be before to")
	}
	return window, nil
}

func normalizeLimit(limit, fallback int) int {
	if limit <= 0 {
		return fallback
	}
	if limit > 100 {
		return 100
	}
	return limit
}

// Observability returns aggregated tool invocation metrics for the dashboard.
func (s *Service) Observability(rangeKey, fromRaw, toRaw string, limit int) (*types.DashboardObservabilityResponse, error) {
	window, err := parseObservabilityWindow(rangeKey, fromRaw, toRaw)
	if err != nil {
		return nil, err
	}
	limit = normalizeLimit(limit, defaultObservabilityLimit)

	summary, err := s.loadObservabilitySummary(window.From, window.To)
	if err != nil {
		return nil, err
	}

	resp := &types.DashboardObservabilityResponse{
		Range: window.Range,
		From:  window.From.Format(time.RFC3339),
		To:    window.To.Format(time.RFC3339),
		Summary: summary,
	}

	if summary.TotalCalls == 0 {
		resp.EmptyState = &types.DashboardEmptyState{
			Title:       "No tool traffic yet",
			Description: "Invocation metrics appear after agents or clients call tools through the MCP gateway.",
		}
		return resp, nil
	}

	byAgent, err := s.loadObservabilityByAgent(window.From, window.To, limit)
	if err != nil {
		return nil, err
	}
	topTools, err := s.loadObservabilityToolTraffic(window.From, window.To, limit)
	if err != nil {
		return nil, err
	}
	topGroups, err := s.loadObservabilityToolGroups(window.From, window.To, limit)
	if err != nil {
		return nil, err
	}
	toolTraffic, err := s.loadObservabilityToolTraffic(window.From, window.To, defaultObservabilityTrafficLimit)
	if err != nil {
		return nil, err
	}
	series, err := s.loadObservabilityCallVolume(window.From, window.To)
	if err != nil {
		return nil, err
	}

	resp.ByAgent = byAgent
	resp.TopTools = topTools
	resp.TopToolGroups = topGroups
	resp.ToolTraffic = toolTraffic
	resp.CallVolumeSeries = series
	return resp, nil
}

type summaryRow struct {
	TotalCalls   int64
	SuccessCalls int64
	ErrorCalls   int64
	AvgLatency   float64
	ActiveAgents int
	ActiveTools  int
	ActiveGroups int
}

func (s *Service) loadObservabilitySummary(from, to time.Time) (types.DashboardObservabilitySummary, error) {
	var row summaryRow
	err := s.db.Model(&model.ToolInvocationEvent{}).
		Select(`
			COUNT(*) AS total_calls,
			SUM(CASE WHEN outcome = ? THEN 1 ELSE 0 END) AS success_calls,
			SUM(CASE WHEN outcome = ? THEN 1 ELSE 0 END) AS error_calls,
			AVG(latency_ms) AS avg_latency,
			COUNT(DISTINCT CASE WHEN agent_app_id IS NOT NULL THEN agent_app_id END) AS active_agents,
			COUNT(DISTINCT mcp_server_name || ? || tool_name) AS active_tools,
			COUNT(DISTINCT CASE WHEN tool_group_name != '' THEN tool_group_name END) AS active_groups`,
			model.ToolInvocationOutcomeSuccess,
			model.ToolInvocationOutcomeError,
			"__",
		).
		Where("created_on >= ? AND created_on < ?", from, to).
		Scan(&row).Error
	if err != nil {
		return types.DashboardObservabilitySummary{}, err
	}

	return types.DashboardObservabilitySummary{
		TotalCalls:     row.TotalCalls,
		SuccessCalls:   row.SuccessCalls,
		ErrorCalls:     row.ErrorCalls,
		SuccessRate:    successRate(row.SuccessCalls, row.TotalCalls),
		ActiveAgents:   row.ActiveAgents,
		ActiveTools:    row.ActiveTools,
		ActiveToolSets: row.ActiveGroups,
		AvgLatencyMs:   round2(row.AvgLatency),
	}, nil
}

type agentUsageRow struct {
	AgentAppID   *uint
	AgentName    string
	ClientID     string
	TotalCalls   int64
	SuccessCalls int64
	ErrorCalls   int64
	AvgLatency   float64
}

func (s *Service) loadObservabilityByAgent(from, to time.Time, limit int) ([]types.DashboardAgentUsage, error) {
	var rows []agentUsageRow
	err := s.db.Table("tool_invocation_events AS e").
		Select(`
			e.agent_app_id,
			COALESCE(a.name, 'Unattributed') AS agent_name,
			COALESCE(a.client_id, '') AS client_id,
			COUNT(*) AS total_calls,
			SUM(CASE WHEN e.outcome = ? THEN 1 ELSE 0 END) AS success_calls,
			SUM(CASE WHEN e.outcome = ? THEN 1 ELSE 0 END) AS error_calls,
			AVG(e.latency_ms) AS avg_latency`,
			model.ToolInvocationOutcomeSuccess,
			model.ToolInvocationOutcomeError,
		).
		Joins("LEFT JOIN agent_apps AS a ON a.id = e.agent_app_id").
		Where("e.created_on >= ? AND e.created_on < ?", from, to).
		Group("e.agent_app_id, a.name, a.client_id").
		Order("total_calls DESC").
		Limit(limit).
		Scan(&rows).Error
	if err != nil {
		return nil, err
	}

	out := make([]types.DashboardAgentUsage, 0, len(rows))
	for _, row := range rows {
		out = append(out, types.DashboardAgentUsage{
			AgentAppID:   row.AgentAppID,
			AgentName:    row.AgentName,
			ClientID:     row.ClientID,
			TotalCalls:   row.TotalCalls,
			SuccessCalls: row.SuccessCalls,
			ErrorCalls:   row.ErrorCalls,
			SuccessRate:  successRate(row.SuccessCalls, row.TotalCalls),
			AvgLatencyMs: round2(row.AvgLatency),
		})
	}
	return out, nil
}

type toolTrafficRow struct {
	MCPServerName string
	ToolName      string
	TotalCalls    int64
	SuccessCalls  int64
	ErrorCalls    int64
	AvgLatency    float64
}

func (s *Service) loadObservabilityToolTraffic(from, to time.Time, limit int) ([]types.DashboardToolTraffic, error) {
	var rows []toolTrafficRow
	err := s.db.Model(&model.ToolInvocationEvent{}).
		Select(`
			mcp_server_name,
			tool_name,
			COUNT(*) AS total_calls,
			SUM(CASE WHEN outcome = ? THEN 1 ELSE 0 END) AS success_calls,
			SUM(CASE WHEN outcome = ? THEN 1 ELSE 0 END) AS error_calls,
			AVG(latency_ms) AS avg_latency`,
			model.ToolInvocationOutcomeSuccess,
			model.ToolInvocationOutcomeError,
		).
		Where("created_on >= ? AND created_on < ?", from, to).
		Group("mcp_server_name, tool_name").
		Order("total_calls DESC").
		Limit(limit).
		Scan(&rows).Error
	if err != nil {
		return nil, err
	}

	out := make([]types.DashboardToolTraffic, 0, len(rows))
	for _, row := range rows {
		p95, err := s.loadToolP95Latency(from, to, row.MCPServerName, row.ToolName)
		if err != nil {
			return nil, err
		}
		out = append(out, types.DashboardToolTraffic{
			MCPServerName: row.MCPServerName,
			ToolName:      row.ToolName,
			CanonicalName: row.MCPServerName + "__" + row.ToolName,
			TotalCalls:    row.TotalCalls,
			SuccessCalls:  row.SuccessCalls,
			ErrorCalls:    row.ErrorCalls,
			SuccessRate:   successRate(row.SuccessCalls, row.TotalCalls),
			AvgLatencyMs:  round2(row.AvgLatency),
			P95LatencyMs:  p95,
		})
	}
	return out, nil
}

func (s *Service) loadToolP95Latency(from, to time.Time, serverName, toolName string) (float64, error) {
	var latencies []int64
	err := s.db.Model(&model.ToolInvocationEvent{}).
		Where("created_on >= ? AND created_on < ? AND mcp_server_name = ? AND tool_name = ?", from, to, serverName, toolName).
		Order("latency_ms ASC").
		Pluck("latency_ms", &latencies).Error
	if err != nil {
		return 0, err
	}
	if len(latencies) == 0 {
		return 0, nil
	}
	idx := int(math.Ceil(float64(len(latencies))*0.95)) - 1
	if idx < 0 {
		idx = 0
	}
	if idx >= len(latencies) {
		idx = len(latencies) - 1
	}
	return float64(latencies[idx]), nil
}

type toolGroupTrafficRow struct {
	ToolGroupName string
	TotalCalls    int64
	SuccessCalls  int64
	ErrorCalls    int64
	AvgLatency    float64
}

func (s *Service) loadObservabilityToolGroups(from, to time.Time, limit int) ([]types.DashboardToolGroupTraffic, error) {
	var rows []toolGroupTrafficRow
	err := s.db.Model(&model.ToolInvocationEvent{}).
		Select(`
			tool_group_name,
			COUNT(*) AS total_calls,
			SUM(CASE WHEN outcome = ? THEN 1 ELSE 0 END) AS success_calls,
			SUM(CASE WHEN outcome = ? THEN 1 ELSE 0 END) AS error_calls,
			AVG(latency_ms) AS avg_latency`,
			model.ToolInvocationOutcomeSuccess,
			model.ToolInvocationOutcomeError,
		).
		Where("created_on >= ? AND created_on < ? AND tool_group_name != ''", from, to).
		Group("tool_group_name").
		Order("total_calls DESC").
		Limit(limit).
		Scan(&rows).Error
	if err != nil {
		return nil, err
	}

	out := make([]types.DashboardToolGroupTraffic, 0, len(rows))
	for _, row := range rows {
		out = append(out, types.DashboardToolGroupTraffic{
			ToolGroupName: row.ToolGroupName,
			TotalCalls:    row.TotalCalls,
			SuccessCalls:  row.SuccessCalls,
			ErrorCalls:    row.ErrorCalls,
			SuccessRate:   successRate(row.SuccessCalls, row.TotalCalls),
			AvgLatencyMs:  round2(row.AvgLatency),
		})
	}
	return out, nil
}

func (s *Service) loadObservabilityCallVolume(from, to time.Time) ([]types.DashboardTimeBucket, error) {
	type eventPoint struct {
		CreatedOn time.Time
		Outcome   string
	}
	var events []eventPoint
	err := s.db.Model(&model.ToolInvocationEvent{}).
		Select("created_on, outcome").
		Where("created_on >= ? AND created_on < ?", from, to).
		Order("created_on ASC").
		Scan(&events).Error
	if err != nil {
		return nil, err
	}

	buckets := map[time.Time]*types.DashboardTimeBucket{}
	for _, event := range events {
		hour := event.CreatedOn.UTC().Truncate(time.Hour)
		bucket, ok := buckets[hour]
		if !ok {
			bucket = &types.DashboardTimeBucket{Timestamp: hour.Format(time.RFC3339)}
			buckets[hour] = bucket
		}
		bucket.TotalCalls++
		if event.Outcome == model.ToolInvocationOutcomeSuccess {
			bucket.SuccessCalls++
		} else {
			bucket.ErrorCalls++
		}
	}

	hours := make([]time.Time, 0, len(buckets))
	for hour := range buckets {
		hours = append(hours, hour)
	}
	sort.Slice(hours, func(i, j int) bool { return hours[i].Before(hours[j]) })

	out := make([]types.DashboardTimeBucket, 0, len(hours))
	for _, hour := range hours {
		out = append(out, *buckets[hour])
	}
	return out, nil
}

func successRate(success, total int64) float64 {
	if total == 0 {
		return 0
	}
	return round2(float64(success) / float64(total) * 100)
}

func round2(v float64) float64 {
	return math.Round(v*100) / 100
}
