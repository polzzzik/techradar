package delete_technology_handler

import (
	"context"
	"errors"
	"log/slog"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"

	"techradar_backend/internal/api"
	"techradar_backend/internal/storage"
)

type technologyUseCase interface {
	DeleteTechnologyByID(ctx context.Context, id int) error
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
	id, err := strconv.Atoi(chi.URLParam(r, "id"))
	if err != nil {
		slog.Error("invalid technology id", slog.Int("id", id))
		api.SendError(w, http.StatusBadRequest, "invalid technology id")
	}

	err = h.uc.DeleteTechnologyByID(r.Context(), id)
	if err != nil {
		switch {
		case errors.Is(err, storage.ErrNotFound):
			w.WriteHeader(http.StatusNotFound)
		default:
			w.WriteHeader(http.StatusInternalServerError)
		}
		slog.Error("delete technology", slog.String("error", err.Error()))
		return
	}

	w.WriteHeader(http.StatusNoContent)
	slog.Info("success delete technology", slog.Int("id", id))
}
