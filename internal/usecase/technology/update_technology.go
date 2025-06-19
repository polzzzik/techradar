package technology

import (
	"context"
	"errors"
	"fmt"

	"techradar_backend/internal/storage"
	"techradar_backend/pkg/sqlxhelper"
)

func (u *UseCase) UpdateTechnology(ctx context.Context, in *UpdateTechnologyDTO) error {
	err := u.storage.UpdateTechnology(ctx, &storage.UpdateTechnologyDTO{
		ID:          in.ID,
		Name:        in.Name,
		Description: in.Description,
		Ring:        in.Ring,
		Section:     in.Section,
		Status:      in.Status,
		Category:    in.Category,
	})
	if err != nil {
		if errors.Is(err, sqlxhelper.ErrNotFound) {
			return ErrNotFound
		}
		return fmt.Errorf("failed to update technology: %w", err)
	}

	return nil
}
