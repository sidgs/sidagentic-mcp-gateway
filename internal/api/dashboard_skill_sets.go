package api

import (
	"fmt"
	"net/http"
	"net/url"

	"github.com/gin-gonic/gin"
	"sami.io/mcpgateway/pkg/tenant"
	"sami.io/mcpgateway/pkg/types"
)

type dashboardSkillSet struct {
	types.SkillSetDetail
	MemberCount     int                          `json:"member_count"`
	CatalogEndpoint string                       `json:"catalog_endpoint"`
	SkillEndpoints  []dashboardSkillSetSkillURLs `json:"skill_endpoints"`
}

type dashboardSkillSetSkillURLs struct {
	Name              string `json:"name"`
	Version           string `json:"version"`
	DetailEndpoint    string `json:"detail_endpoint"`
	ReferenceBasePath string `json:"reference_base_path"`
}

type dashboardSkillSetsResponse struct {
	SkillSets []dashboardSkillSetSummary `json:"skill_sets"`
}

type dashboardSkillSetSummary struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	MemberCount int    `json:"member_count"`
}

func (s *Server) dashboardSkillSetsHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		p := mustDashboardPrincipal(c)
		sets, err := s.skillSetService.ListSkillSets(c.Request.Context())
		if err != nil {
			handleServiceError(c, err)
			return
		}
		out := make([]dashboardSkillSetSummary, 0, len(sets))
		for _, set := range sets {
			ok, err := s.canSeeCatalog(c, p, types.TeamResourceSkillSet, set.Name)
			if err != nil {
				handleServiceError(c, err)
				return
			}
			if !ok {
				continue
			}
			detail, err := s.skillSetService.GetSkillSetDetail(c.Request.Context(), set.Name)
			if err != nil {
				handleServiceError(c, err)
				return
			}
			out = append(out, dashboardSkillSetSummary{
				Name: set.Name, Description: set.Description, MemberCount: len(detail.Members),
			})
		}
		c.JSON(http.StatusOK, dashboardSkillSetsResponse{SkillSets: out})
	}
}

func (s *Server) dashboardGetSkillSetHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		item, err := s.buildDashboardSkillSet(c, c.Param("name"))
		if err != nil {
			handleServiceError(c, err)
			return
		}
		c.JSON(http.StatusOK, item)
	}
}

func (s *Server) dashboardCreateSkillSetHandler() gin.HandlerFunc {
	return s.createSkillSetHandler()
}

func (s *Server) dashboardUpdateSkillSetHandler() gin.HandlerFunc {
	return s.updateSkillSetHandler()
}

func (s *Server) dashboardDeleteSkillSetHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		if err := s.skillSetService.DeleteSkillSet(c.Request.Context(), c.Param("name")); err != nil {
			handleServiceError(c, err)
			return
		}
		c.Status(http.StatusNoContent)
	}
}

func (s *Server) buildDashboardSkillSet(c *gin.Context, name string) (dashboardSkillSet, error) {
	detail, err := s.skillSetService.GetSkillSetDetail(c.Request.Context(), name)
	if err != nil {
		return dashboardSkillSet{}, err
	}
	item := dashboardSkillSet{
		SkillSetDetail:  *detail,
		MemberCount:     len(detail.Members),
		CatalogEndpoint: s.skillSetCatalogEndpoint(c, name),
	}
	for _, m := range detail.Members {
		item.SkillEndpoints = append(item.SkillEndpoints, dashboardSkillSetSkillURLs{
			Name:              m.Name,
			Version:           m.Version,
			DetailEndpoint:    s.skillSetSkillDetailEndpoint(c, name, m.Name, m.Version),
			ReferenceBasePath: s.skillSetSkillReferenceBase(c, name, m.Name, m.Version),
		})
	}
	return item, nil
}

func (s *Server) skillSetCatalogEndpoint(c *gin.Context, setName string) string {
	return s.tenantSkillSetBase(c, setName) + "/skills"
}

func (s *Server) skillSetSkillDetailEndpoint(c *gin.Context, setName, skillName, version string) string {
	return fmt.Sprintf("%s/skills/%s/versions/%s",
		s.tenantSkillSetBase(c, setName),
		url.PathEscape(skillName),
		url.PathEscape(version),
	)
}

func (s *Server) skillSetSkillReferenceBase(c *gin.Context, setName, skillName, version string) string {
	return s.skillSetSkillDetailEndpoint(c, setName, skillName, version) + "/references/"
}

func (s *Server) tenantSkillSetBase(c *gin.Context, setName string) string {
	tid := tenant.MustFromContext(c.Request.Context())
	prefix := NormalizeHTTPPathPrefix(s.httpPathPrefix)
	raw := fmt.Sprintf("%s/%s/v0/skillsets/%s", prefix, url.PathEscape(tid), url.PathEscape(setName))
	u := url.URL{
		Scheme: s.publicSchemeForURLs(c),
		Host:   c.Request.Host,
		Path:   raw,
	}
	return u.String()
}

func (s *Server) getSkillSetCatalogEndpoints(c *gin.Context, setName string) dashboardAgentAppGroupEndpoints {
	base := s.skillSetCatalogEndpoint(c, setName)
	return dashboardAgentAppGroupEndpoints{
		Name:                   setName,
		StreamableHTTPEndpoint: base,
		SSEEndpoint:            base,
		SSEMessageEndpoint:     base,
	}
}
