package postgres

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"time"

	sq "github.com/Masterminds/squirrel"

	"techradar_backend/internal/model"
	"techradar_backend/internal/storage"
	"techradar_backend/pkg/sqlxhelper"
)

func (s *Storage) SaveTechnology(ctx context.Context, technology *model.Technology) error {
	inset := sq.Insert("technologies").
		SetMap(map[string]any{
			"id":          technology.ID,
			"name":        technology.Name,
			"description": technology.Description,
			"ring":        technology.Ring,
			"section":     technology.Section,
			"status":      technology.Status,
			"category":    technology.Category,
			"created_at":  time.Now(),
			"updated_at":  time.Now(),
		}).
		PlaceholderFormat(sq.Dollar)

	q, args, err := inset.ToSql()
	if err != nil {
		return fmt.Errorf("failed to build insert query: %w", err)
	}

	res, err := s.db.ExecContext(ctx, q, args...)
	if err != nil {
		return fmt.Errorf("failed to execute insert query: %w", err)
	}

	if rows, err := res.RowsAffected(); err != nil {
		return fmt.Errorf("failed to get rows affected: %w", err)
	} else if rows == 0 {
		return storage.ErrAlreadyExists
	}

	return nil
}

func (s *Storage) GetTechnology(ctx context.Context, id int) (*model.Technology, error) {
	q := sq.Select("*").
		From("technologies").
		Where(sq.Eq{"id": id}).
		PlaceholderFormat(sq.Dollar)

	query, args, err := q.ToSql()
	if err != nil {
		return nil, fmt.Errorf("failed to build select query: %w", err)
	}

	var tech model.Technology
	err = s.db.GetContext(ctx, &tech, query, args...)
	if errors.Is(err, sql.ErrNoRows) {
		return nil, storage.ErrNotFound
	}
	if err != nil {
		return nil, fmt.Errorf("failed to execute select query: %w", err)
	}

	return &tech, nil
}

func (s *Storage) GetTechnologiesWithFilter(ctx context.Context, filter *storage.TechnologiesFilter) ([]model.Technology, error) {
	q := sq.Select("*").
		From("technologies").
		PlaceholderFormat(sq.Dollar)

	if filter.Category != nil {
		q = q.Where(sq.Eq{"category": filter.Category})
	}

	if filter.Section != nil {
		q = q.Where(sq.Eq{"section": filter.Section})
	}

	if filter.Limit != nil {
		q = q.Limit(uint64(*filter.Limit))
	}

	if filter.Offset != nil {
		q = q.Offset(uint64(*filter.Offset))
	}

	query, args, err := q.ToSql()
	if err != nil {
		return nil, fmt.Errorf("failed to build select query: %w", err)
	}

	var tech []model.Technology
	err = s.db.SelectContext(ctx, &tech, query, args...)
	if err != nil {
		return nil, fmt.Errorf("failed to execute select query: %w", err)
	}

	return tech, nil
}

func (s *Storage) DeleteTechnology(ctx context.Context, id int) error {
	q := sq.Delete("technologies").
		Where(sq.Eq{"id": id}).
		PlaceholderFormat(sq.Dollar)

	query, args, err := q.ToSql()
	if err != nil {
		return fmt.Errorf("failed to build delete query: %w", err)
	}

	affected, err := s.db.ExecContext(ctx, query, args...)
	if err != nil {
		return fmt.Errorf("failed to execute delete query: %w", err)
	}

	if rows, err := affected.RowsAffected(); err != nil {
		return fmt.Errorf("failed to get rows affected: %w", err)
	} else if rows == 0 {
		return storage.ErrNotFound
	}

	return nil
}

func (s *Storage) UpdateTechnology(ctx context.Context, in *storage.UpdateTechnologyDTO) error {
	stmt := sq.Update("technologies").
		Where(sq.Eq{"id": in.ID}).
		PlaceholderFormat(sq.Dollar)

	for key, value := range in.ToMap() {
		sqlxhelper.SetIfNotNil(stmt, key, &value)
	}

	return sqlxhelper.Update[storage.UpdateTechnologyDTO](ctx, s.db, stmt)
}
