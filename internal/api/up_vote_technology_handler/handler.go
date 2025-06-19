package up_vote_technology_handler

import (
	"context"
	"encoding/json"
	"errors"
	"log/slog"
	"net/http"

	"techradar_backend/internal/api"
	"techradar_backend/internal/usecase/pool_item"
)

type (
	UpVoteUC interface {
		UpVote(ctx context.Context, poolID, technologyID int) error
	}

	Handler struct {
		uc UpVoteUC
	}
)

func New(uc UpVoteUC) *Handler {
	return &Handler{uc: uc}
}

func (h *Handler) Handle(w http.ResponseWriter, r *http.Request) {
	var req UpVoteTechnologyRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		api.SendError(w, 400, "invalid request")
		return
	}
	defer r.Body.Close()

	if err := h.uc.UpVote(r.Context(), req.PoolID, req.TechnologyID); err != nil {
		slog.Error("up vote", slog.String("error", err.Error()))
		switch {
		case errors.Is(err, pool_item.ErrFinished):
			api.SendError(w, 400, "pool is already finished")
		case errors.Is(err, pool_item.ErrNotFound):
			api.SendError(w, 404, "pool item not found")
		default:
			api.SendError(w, 500, "internal server error")
		}
	}

	w.WriteHeader(http.StatusOK)
}
