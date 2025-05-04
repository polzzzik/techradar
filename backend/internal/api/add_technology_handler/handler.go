package add_technology_handler

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log/slog"
	"math/rand/v2"
	"net/http"
	"strings"

	"github.com/go-playground/validator/v10"

	"techradar_backend/internal/api"
	"techradar_backend/internal/model"
	"techradar_backend/internal/storage"
)

type technologyUseCase interface {
	SaveTechnology(ctx context.Context, in *model.Technology) error
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
	tech, err := extractInput(r)
	if err != nil {
		slog.Error("extract input", slog.String("err", err.Error()))
		api.SendError(w, http.StatusBadRequest, err.Error())
		return
	}
	err = h.uc.SaveTechnology(r.Context(), tech)
	if err != nil {
		switch {
		case errors.Is(err, storage.ErrAlreadyExists):
			w.WriteHeader(http.StatusBadRequest)
		default:
			w.WriteHeader(http.StatusInternalServerError)
		}
		slog.Error("failed to save technology", slog.String("error", err.Error()))
		return
	}

	out := AddTechnologyOut{
		ID: tech.ID,
	}
	api.SendJSON(w, http.StatusCreated, out)

	slog.Info("technology saved successfully", slog.Int("id", tech.ID))
}

func extractInput(r *http.Request) (*model.Technology, error) {
	var in AddTechnologyIn
	err := json.NewDecoder(r.Body).Decode(&in)
	if err != nil {
		return nil, err
	}
	defer r.Body.Close()

	in.Ring = strings.ToLower(in.Ring)
	in.Category = strings.ToLower(in.Category)
	in.Section = strings.ToLower(in.Section)

	validate := validator.New()
	err = validate.Struct(in)
	if err != nil {
		return nil, fmt.Errorf("validation error: %w", err)
	}
	ring, err := model.GetRing(in.Ring)
	if err != nil {
		return nil, err
	}
	section, err := model.GetSection(in.Section)
	if err != nil {
		return nil, err
	}
	category, err := model.GetCategory(in.Category)
	if err != nil {
		return nil, err
	}
	return &model.Technology{
		ID:          int(rand.Int32()),
		Name:        in.Name,
		Description: in.Description,
		Ring:        ring,
		Section:     section,
		Status:      model.TechnologyStatusNew,
		Category:    category,
	}, nil
}
