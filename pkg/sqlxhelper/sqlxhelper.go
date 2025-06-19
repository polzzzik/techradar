package sqlxhelper

import (
	"context"
	"database/sql"
	"errors"
	"fmt"

	sq "github.com/Masterminds/squirrel"
	"github.com/jmoiron/sqlx"
)

var (
	ErrNotFound      = errors.New("not found")
	ErrAlreadyExists = errors.New("already exists")
)

func Get[T any](ctx context.Context, db *sqlx.DB, query sq.SelectBuilder) (*T, error) {
	q, args, err := query.ToSql()
	if err != nil {
		return nil, err
	}

	var result T
	err = db.GetContext(ctx, &result, q, args...)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, ErrNotFound
		}
		return nil, err
	}

	return &result, err
}

func Insert[T any](ctx context.Context, db *sqlx.DB, query sq.InsertBuilder) error {
	q, args, err := query.ToSql()
	if err != nil {
		return fmt.Errorf("failed to build insert query: %w", err)
	}

	res, err := db.ExecContext(ctx, q, args...)
	if err != nil {
		return fmt.Errorf("failed to execute insert query: %w", err)
	}

	if rows, err := res.RowsAffected(); err != nil {
		return fmt.Errorf("failed to get rows affected: %w", err)
	} else if rows == 0 {
		return ErrAlreadyExists
	}

	return nil
}

func Update[T any](ctx context.Context, db *sqlx.DB, q sq.UpdateBuilder) error {
	query, args, err := q.ToSql()
	if err != nil {
		return fmt.Errorf("failed to build update query: %w", err)
	}

	affected, err := db.ExecContext(ctx, query, args...)
	if err != nil {
		return fmt.Errorf("failed to execute update query: %w", err)
	}

	if rows, err := affected.RowsAffected(); err != nil {
		return fmt.Errorf("failed to get rows affected: %w", err)
	} else if rows == 0 {
		return ErrNotFound
	}
	return nil
}

func SetIfNotNil[T any](q sq.UpdateBuilder, key string, value *T) sq.UpdateBuilder {
	if value != nil {
		return q.Set(key, *value)
	}

	return q
}
