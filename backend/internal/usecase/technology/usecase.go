package technology

import (
	"context"

	"techradar_backend/internal/model"
	"techradar_backend/internal/storage"
)

type technologyStorage interface {
	SaveTechnology(ctx context.Context, tech *model.Technology) error
	GetTechnology(ctx context.Context, id int) (*model.Technology, error)
	DeleteTechnology(ctx context.Context, id int) error
	GetTechnologiesWithFilter(ctx context.Context, filter *storage.TechnologiesFilter) ([]model.Technology, error)
	UpdateTechnology(ctx context.Context, in *storage.UpdateTechnologyDTO) error
}

type UseCase struct {
	storage technologyStorage
}

func New(storage technologyStorage) *UseCase {
	return &UseCase{
		storage: storage,
	}
}
