package technology

import (
	"context"
	
	"techradar_backend/internal/model"
)

func (uc *UseCase) SaveTechnology(ctx context.Context, in *model.Technology) error {
	return uc.storage.SaveTechnology(ctx, in)
}
