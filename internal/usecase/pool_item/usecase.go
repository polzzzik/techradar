package pool_item

import (
	"context"

	"techradar_backend/internal/model"
	"techradar_backend/internal/storage"
)

type poolItemStorage interface {
	CreatePoolItem(ctx context.Context, pool *model.PoolItem) error
	UpdatePoolItem(ctx context.Context, pool *storage.UpdatePoolItemDTO) error
	GetPoolItem(ctx context.Context, poolID, technologyID int) (*model.PoolItem, error)
}

type technologyStorage interface {
	GetTechnologiesWithFilter(ctx context.Context, filter *storage.TechnologiesFilter) ([]model.Technology, error)
}

type Usecase struct {
	poolItemStorage poolItemStorage
	techStorage     technologyStorage
}

func New(poolStorage poolItemStorage, techStorage technologyStorage) *Usecase {
	return &Usecase{
		poolItemStorage: poolStorage,
		techStorage:     techStorage,
	}
}
