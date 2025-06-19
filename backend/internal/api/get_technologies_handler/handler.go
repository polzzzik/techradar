package get_technologies_handler

import (
	"context"
	"fmt"
	"log/slog"
	"net/http"
	"strconv"

	"techradar_backend/internal/api"
	"techradar_backend/internal/model"
	"techradar_backend/internal/storage"
)

type technologyUseCase interface {
	GetTechnologiesWithFilters(ctx context.Context, params *storage.TechnologiesFilter) ([]model.Technology, error)
}
type Handler struct {
	uc technologyUseCase
}

func New(ts technologyUseCase) *Handler {
	return &Handler{
		uc: ts,
	}
}

func (h *Handler) Handle(w http.ResponseWriter, r *http.Request) {
	params, err := extractInput(r)
	if err != nil {
		slog.Error("extract input", slog.String("error", err.Error()))
		api.SendError(w, http.StatusBadRequest, err.Error())
		return
	}

	result, err := h.uc.GetTechnologiesWithFilters(r.Context(), &storage.TechnologiesFilter{
		Section:  params.Section,
		Category: params.Category,
		Limit:    params.Limit,
		Offset:   params.Offset,
	})
	if err != nil {
		slog.Error("get technologies", slog.String("error", err.Error()))
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	api.SendJSON(w, http.StatusOK, technologyModelsToDTO(result))
	slog.Info("list technologies successfully")
}

func extractInput(r *http.Request) (*TechnologiesParams, error) {
	var params TechnologiesParams
	query := r.URL.Query()

	sec := query.Get("section")
	if sec != "" {
		section, err := model.GetSection(sec)
		if err != nil {
			return nil, err
		}
		params.Section = &section
	}

	cat := query.Get("category")
	if cat != "" {
		category, err := model.GetCategory(cat)
		if err != nil {
			return nil, err
		}
		params.Category = &category
	}

	lim := query.Get("limit")
	if lim != "" {
		limit, err := strconv.Atoi(lim)
		if err != nil {
			return nil, fmt.Errorf("invalid limit")
		}
		params.Limit = &limit
	}

	off := query.Get("offset")
	if off != "" {
		offset, err := strconv.Atoi(off)
		if err != nil {
			return nil, fmt.Errorf("invalid offset")
		}
		params.Offset = &offset
	}
	return &params, nil
}

func technologyModelsToDTO(techs []model.Technology) []TechnologyResult {
	dto := make([]TechnologyResult, len(techs))
	for i, tech := range techs {
		dto[i] = TechnologyResult{
			ID:          tech.ID,
			Name:        tech.Name,
			Description: tech.Description,
			Ring:        string(tech.Ring),
			Category:    string(tech.Category),
			Status:      string(tech.Status),
			Section:     string(tech.Section),
			CreatedAt:   tech.CreatedAt,
			UpdatedAt:   tech.UpdatedAt,
		}
	}
	return dto
}
