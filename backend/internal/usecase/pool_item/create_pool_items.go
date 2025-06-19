package pool_item

import (
	"context"
	"fmt"
	"math/rand/v2"

	"techradar_backend/internal/model"
	"techradar_backend/internal/storage"
)

func (u *Usecase) CreatePoolItems(ctx context.Context) error {
	technologies, err := u.techStorage.GetTechnologiesWithFilter(ctx, &storage.TechnologiesFilter{})
	if err != nil {
		return fmt.Errorf("get technologies with filter: %w", err)
	}

	for _, technology := range technologies {
		err = u.poolItemStorage.CreatePoolItem(ctx, &model.PoolItem{
			ID:           rand.Int(),
			TechnologyID: technology.ID,
		})
		if err != nil {
			return fmt.Errorf("create pool item: %w", err)
		}
	}

	return nil
}
