package technology

import (
	"context"

	"techradar_backend/internal/model"
)

func (uc *UseCase) GetTechnologyByID(ctx context.Context, id int) (*model.Technology, error) {
	return uc.storage.GetTechnology(ctx, id)
}
