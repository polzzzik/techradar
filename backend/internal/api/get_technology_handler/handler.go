package get_technology_handler

import (
	"context"
	"errors"
	"log/slog"
	"net/http"
	"strconv"

	"techradar_backend/internal/api"
	"techradar_backend/internal/model"
	"techradar_backend/internal/storage"

	"github.com/go-chi/chi/v5"
)

type technologyUseCase interface {
	GetTechnologyByID(ctx context.Context, id int) (*model.Technology, error)
}

type Handler struct {
	uc technologyUseCase
}

func New(uc technologyUseCase) *Handler {
	return &Handler{
		uc: uc,
	}
}

func (h *Handler) Handle(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(chi.URLParam(r, "id"))
	if err != nil {
		api.SendError(w, http.StatusBadRequest, "Invalid technology ID")
		slog.Error("failed to parse technology ID", slog.String("error", err.Error()))
		return
	}

	technology, err := h.uc.GetTechnologyByID(r.Context(), id)
	if err != nil {
		switch {
		case errors.Is(err, storage.ErrNotFound):
			api.SendError(w, http.StatusNotFound, "technology not found")
		default:
			api.SendError(w, http.StatusInternalServerError, "internal server error")
		}
		slog.Error("get technology", slog.Int("id", id), slog.String("error", err.Error()))
		return
	}

	api.SendJSON(w, http.StatusOK, technologyModalToDTO(technology))
	slog.Info("technology retrieved successfully", slog.Int("id", id))
}

func technologyModalToDTO(m *model.Technology) *TechnologyResult {
	return &TechnologyResult{
		ID:          m.ID,
		Name:        m.Name,
		Description: m.Description,
		Ring:        string(m.Ring),
		Category:    string(m.Category),
		Status:      string(m.Status),
		Section:     string(m.Section),
		CreatedAt:   m.CreatedAt,
		UpdatedAt:   m.UpdatedAt,
	}
}
