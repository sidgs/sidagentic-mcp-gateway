package types

type DashboardStatus string

const (
	DashboardStatusRunning  DashboardStatus = "running"
	DashboardStatusDegraded DashboardStatus = "degraded"
	DashboardStatusUnknown  DashboardStatus = "unknown"
)

type DashboardServerStatus string

const (
	DashboardServerStatusConnected DashboardServerStatus = "connected"
	DashboardServerStatusReachable DashboardServerStatus = "reachable"
	DashboardServerStatusFailed    DashboardServerStatus = "failed"
	DashboardServerStatusUnknown   DashboardServerStatus = "unknown"
)

type DashboardEndpoint struct {
	Label string `json:"label"`
	URL   string `json:"url"`
}

type DashboardEmptyState struct {
	Title       string   `json:"title"`
	Description string   `json:"description"`
	Commands    []string `json:"commands,omitempty"`
}

type DashboardOverviewResponse struct {
	Status          DashboardStatus      `json:"status"`
	Mode            string               `json:"mode"`
	Version         string               `json:"version"`
	Endpoints       []DashboardEndpoint  `json:"endpoints"`
	ServerCount     int                  `json:"server_count"`
	ToolCount       int                  `json:"tool_count"`
	PromptCount     int                  `json:"prompt_count"`
	ResourceCount   int                  `json:"resource_count"`
	EmptyState      *DashboardEmptyState `json:"empty_state,omitempty"`
	Troubleshooting []string             `json:"troubleshooting,omitempty"`
	OIDCLoginPath   string               `json:"oidc_login_path,omitempty"`
	OIDCLogoutPath  string               `json:"oidc_logout_path,omitempty"`
}

type DashboardServerConfigSummary struct {
	Kind             string   `json:"kind"`
	ServerKind       string   `json:"server_kind,omitempty"`
	Transport        string   `json:"transport,omitempty"`
	Target           string   `json:"target,omitempty"`
	Command          string   `json:"command,omitempty"`
	ArgumentCount    int      `json:"argument_count,omitempty"`
	EnvKeys          []string `json:"env_keys,omitempty"`
	HeaderKeys       []string `json:"header_keys,omitempty"`
	SessionMode      string   `json:"session_mode,omitempty"`
	Description      string   `json:"description,omitempty"`
	SanitizedSummary string   `json:"sanitized_summary"`
}

type DashboardServer struct {
	Name               string                       `json:"name"`
	ServerKind         string                       `json:"server_kind,omitempty"`
	Transport          string                       `json:"transport"`
	Enabled            bool                         `json:"enabled"`
	Status             DashboardServerStatus        `json:"status"`
	ToolCount          int                          `json:"tool_count"`
	PromptCount        int                          `json:"prompt_count"`
	ResourceCount      int                          `json:"resource_count"`
	LastDiscoveredAt   string                       `json:"last_discovered_at,omitempty"`
	UpdatedAt          string                       `json:"updated_at,omitempty"`
	ConnectionSummary  string                       `json:"connection_summary"`
	ConfigSummary      DashboardServerConfigSummary `json:"config_summary"`
	NamespacedExamples []string                     `json:"namespaced_examples,omitempty"`
}

type DashboardServersResponse struct {
	Servers    []DashboardServer    `json:"servers"`
	EmptyState *DashboardEmptyState `json:"empty_state,omitempty"`
}

type DashboardTool struct {
	Name           string         `json:"name"`
	CanonicalName  string         `json:"canonical_name"`
	Server         string         `json:"server"`
	Description    string         `json:"description"`
	Enabled        bool           `json:"enabled"`
	ServerEnabled  bool           `json:"server_enabled"`
	InputSchema    map[string]any `json:"input_schema,omitempty"`
	InputPreview   string         `json:"input_preview,omitempty"`
	Transport      string         `json:"transport,omitempty"`
	ServerStatus   string         `json:"server_status,omitempty"`
	AnnotationKeys []string       `json:"annotation_keys,omitempty"`
}

type DashboardToolsResponse struct {
	Tools      []DashboardTool      `json:"tools"`
	EmptyState *DashboardEmptyState `json:"empty_state,omitempty"`
}

type DashboardPrompt struct {
	Name             string           `json:"name"`
	CanonicalName    string           `json:"canonical_name"`
	Server           string           `json:"server"`
	Description      string           `json:"description"`
	Enabled          bool             `json:"enabled"`
	ServerEnabled    bool             `json:"server_enabled"`
	Arguments        []map[string]any `json:"arguments,omitempty"`
	ArgumentsPreview string           `json:"arguments_preview,omitempty"`
	Transport        string           `json:"transport,omitempty"`
	ServerStatus     string           `json:"server_status,omitempty"`
}

type DashboardPromptsResponse struct {
	Prompts    []DashboardPrompt    `json:"prompts"`
	EmptyState *DashboardEmptyState `json:"empty_state,omitempty"`
}

type DashboardResource struct {
	URI          string `json:"uri"`
	Name         string `json:"name"`
	Server       string `json:"server"`
	Description  string `json:"description"`
	MIMEType     string `json:"mime_type,omitempty"`
	Enabled      bool   `json:"enabled"`
	Transport    string `json:"transport,omitempty"`
	ServerStatus string `json:"server_status,omitempty"`
}

type DashboardResourcesResponse struct {
	Resources  []DashboardResource  `json:"resources"`
	EmptyState *DashboardEmptyState `json:"empty_state,omitempty"`
}

// DashboardAuthStatusResponse is returned by GET /dashboard/auth-status (callable without OIDC cookie).
type DashboardAuthStatusResponse struct {
	Authenticated bool                      `json:"authenticated"`
	OIDCEnabled   bool                      `json:"oidc_enabled"`
	LoginPath     string                    `json:"login_path,omitempty"`
	LogoutPath    string                    `json:"logout_path,omitempty"`
	Email         string                    `json:"email,omitempty"`
	Sub           string                    `json:"sub,omitempty"`
	Role          string                    `json:"role,omitempty"`
	TenantID      string                    `json:"tenant_id,omitempty"`
	UserID        uint                      `json:"user_id,omitempty"`
	PlatformAdmin bool                      `json:"platform_admin,omitempty"`
	Teams         []DashboardTeamMembership `json:"teams,omitempty"`
}

type DashboardDiagnosticsResponse struct {
	Version                  string               `json:"version"`
	Mode                     string               `json:"mode"`
	ConfigSource             string               `json:"config_source,omitempty"`
	ConfigPath               string               `json:"config_path,omitempty"`
	Database                 string               `json:"database"`
	EnabledTransports        []string             `json:"enabled_transports"`
	MetricsEndpoint          string               `json:"metrics_endpoint,omitempty"`
	PrimaryEndpoint          string               `json:"primary_endpoint"`
	TroubleshootingHints     []string             `json:"troubleshooting_hints"`
	ServerCount              int                  `json:"server_count"`
	ToolCount                int                  `json:"tool_count"`
	PromptCount              int                  `json:"prompt_count"`
	ResourceCount            int                  `json:"resource_count"`
	EmptyState               *DashboardEmptyState `json:"empty_state,omitempty"`
}

type DashboardObservabilitySummary struct {
	TotalCalls     int64   `json:"total_calls"`
	SuccessCalls   int64   `json:"success_calls"`
	ErrorCalls     int64   `json:"error_calls"`
	SuccessRate    float64 `json:"success_rate"`
	ActiveAgents   int     `json:"active_agents"`
	ActiveTools    int     `json:"active_tools"`
	ActiveToolSets int     `json:"active_tool_sets"`
	AvgLatencyMs   float64 `json:"avg_latency_ms"`
}

type DashboardAgentUsage struct {
	AgentAppID   *uint   `json:"agent_app_id,omitempty"`
	AgentName    string  `json:"agent_name"`
	ClientID     string  `json:"client_id,omitempty"`
	TotalCalls   int64   `json:"total_calls"`
	SuccessCalls int64   `json:"success_calls"`
	ErrorCalls   int64   `json:"error_calls"`
	SuccessRate  float64 `json:"success_rate"`
	AvgLatencyMs float64 `json:"avg_latency_ms"`
}

type DashboardToolTraffic struct {
	MCPServerName string  `json:"mcp_server_name"`
	ToolName      string  `json:"tool_name"`
	CanonicalName string  `json:"canonical_name"`
	TotalCalls    int64   `json:"total_calls"`
	SuccessCalls  int64   `json:"success_calls"`
	ErrorCalls    int64   `json:"error_calls"`
	SuccessRate   float64 `json:"success_rate"`
	AvgLatencyMs  float64 `json:"avg_latency_ms"`
	P95LatencyMs  float64 `json:"p95_latency_ms"`
}

type DashboardToolGroupTraffic struct {
	ToolGroupName string  `json:"tool_group_name"`
	TotalCalls    int64   `json:"total_calls"`
	SuccessCalls  int64   `json:"success_calls"`
	ErrorCalls    int64   `json:"error_calls"`
	SuccessRate   float64 `json:"success_rate"`
	AvgLatencyMs  float64 `json:"avg_latency_ms"`
}

type DashboardTimeBucket struct {
	Timestamp    string `json:"timestamp"`
	TotalCalls   int64  `json:"total_calls"`
	SuccessCalls int64  `json:"success_calls"`
	ErrorCalls   int64  `json:"error_calls"`
}

type DashboardObservabilityResponse struct {
	Range            string                      `json:"range"`
	From             string                      `json:"from"`
	To               string                      `json:"to"`
	Summary          DashboardObservabilitySummary `json:"summary"`
	ByAgent          []DashboardAgentUsage       `json:"by_agent"`
	TopTools         []DashboardToolTraffic      `json:"top_tools"`
	TopToolGroups    []DashboardToolGroupTraffic `json:"top_tool_groups"`
	ToolTraffic      []DashboardToolTraffic      `json:"tool_traffic"`
	CallVolumeSeries []DashboardTimeBucket       `json:"call_volume_series"`
	EmptyState       *DashboardEmptyState        `json:"empty_state,omitempty"`
}

type DashboardLineageNode struct {
	ID    string            `json:"id"`
	Kind  string            `json:"kind"`
	Label string            `json:"label"`
	Meta  map[string]string `json:"meta,omitempty"`
}

type DashboardLineageEdge struct {
	ID     string `json:"id"`
	Source string `json:"source"`
	Target string `json:"target"`
	Kind   string `json:"kind"`
	Label  string `json:"label,omitempty"`
	Weight int64  `json:"weight,omitempty"`
}

type DashboardLineageResponse struct {
	UsageWindow string                   `json:"usage_window,omitempty"`
	Nodes       []DashboardLineageNode   `json:"nodes"`
	Edges       []DashboardLineageEdge   `json:"edges"`
	EmptyState  *DashboardEmptyState     `json:"empty_state,omitempty"`
}
