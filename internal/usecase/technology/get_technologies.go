package technology

import (
	"context"

	"techradar_backend/internal/model"
	"techradar_backend/internal/storage"
)

func (uc *UseCase) GetTechnologiesWithFilters(ctx context.Context, filter *storage.TechnologiesFilter) ([]model.Technology, error) {
	return uc.storage.GetTechnologiesWithFilter(ctx, filter)
}
