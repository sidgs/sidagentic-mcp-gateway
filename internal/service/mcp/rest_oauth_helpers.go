package mcp

import (
	"context"
	"errors"

	mcpgotransport "github.com/mark3labs/mcp-go/client/transport"
	"sami.io/mcpgateway/internal/model"
	"gorm.io/gorm"
)

func loadUpstreamOAuthTokenForREST(ctx context.Context, db *gorm.DB, tenantID, serverName string) (*mcpgotransport.Token, error) {
	store := &upstreamOAuthTokenStore{
		db:         db,
		tenantID:   tenantID,
		serverName: serverName,
	}
	token, err := store.GetToken(ctx)
	if err != nil {
		if errors.Is(err, mcpgotransport.ErrNoToken) {
			return nil, mcpgotransport.ErrNoToken
		}
		return nil, err
	}
	return token, nil
}

func prepareRestOAuthClientOptions(serverName string, conf *model.RestConfig) []mcpgotransport.StreamableHTTPCOption {
	headers := map[string]string{
		"User-Agent": "sami-mcp-gateway-" + serverName,
	}
	for k, v := range conf.Auth.Headers {
		headers[k] = v
	}
	return []mcpgotransport.StreamableHTTPCOption{
		mcpgotransport.WithHTTPHeaders(headers),
	}
}
