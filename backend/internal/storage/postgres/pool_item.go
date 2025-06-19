package postgres

import (
	"context"

	sq "github.com/Masterminds/squirrel"

	"techradar_backend/internal/model"
	"techradar_backend/internal/storage"
	"techradar_backend/pkg/sqlxhelper"
)

func (s *Storage) CreatePoolItem(ctx context.Context, pool *model.PoolItem) error {
	stmt := sq.Insert("pool_items").
		SetMap(map[string]any{
			"id":            pool.ID,
			"technology_id": pool.TechnologyID,
		}).PlaceholderFormat(sq.Dollar)

	return sqlxhelper.Insert[model.PoolItem](ctx, s.db, stmt)
}

func (s *Storage) UpdatePoolItem(ctx context.Context, pool *storage.UpdatePoolItemDTO) error {
	stmt := sq.Update("pool_items").
		Where(sq.Eq{
			"id":            pool.ID,
			"technology_id": pool.TechnologyID,
		}).
		PlaceholderFormat(sq.Dollar)

	for key, value := range pool.ToMap() {
		stmt = sqlxhelper.SetIfNotNil(stmt, key, &value)
	}

	return sqlxhelper.Update[model.PoolItem](ctx, s.db, stmt)
}

func (s *Storage) GetPoolItem(ctx context.Context, poolID, technologyID int) (*model.PoolItem, error) {
	stmt := sq.Select("*").
		From("pool_items").
		Where(sq.Eq{
			"id":            poolID,
			"technology_id": technologyID,
		}).
		PlaceholderFormat(sq.Dollar)

	return sqlxhelper.Get[model.PoolItem](ctx, s.db, stmt)
}
