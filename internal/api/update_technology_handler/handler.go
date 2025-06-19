package update_technology_handler

import (
	"context"
	"encoding/json"
	"errors"
	"log/slog"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"

	"techradar_backend/internal/api"
	"techradar_backend/internal/usecase/technology"
)

type updateUsecase interface {
	UpdateTechnology(ctx context.Context, technology *technology.UpdateTechnologyDTO) error
}

type Handler struct {
	uc updateUsecase
}

func New(uc updateUsecase) *Handler {
	return &Handler{uc: uc}
}

func (h *Handler) Handle(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	in, err := extractInput(r)
	if err != nil {
		slog.Error("invalid input", slog.String("error", err.Error()))
		api.SendError(w, 400, "invalid input")
		return
	}

	err = h.uc.UpdateTechnology(ctx, in)
	if err != nil {
		switch {
		case errors.Is(err, technology.ErrNotFound):
			api.SendError(w, 404, "technology not found")
			slog.Error("technology not found", slog.Int("id", in.ID))
		default:
			api.SendError(w, 500, "internal server error")
		}
		return
	}

	w.WriteHeader(http.StatusOK)
}

func extractInput(r *http.Request) (*technology.UpdateTechnologyDTO, error) {
	id := chi.URLParam(r, "id")
	if id == "" {
		return nil, errors.New("missing id")
	}

	intID, err := strconv.Atoi(id)
	if err != nil {
		return nil, err
	}

	var in UpdateTechnologyRequest
	if err := json.NewDecoder(r.Body).Decode(&in); err != nil {
		return nil, err
	}
	defer r.Body.Close()

	return in.ToDTO(intID)
}
