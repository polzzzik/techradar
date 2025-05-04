package postgres

import (
	"os"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

type Storage struct {
	db *sqlx.DB
}

func NewStorage() (*Storage, error) {
	db, err := sqlx.Open("postgres", os.Getenv("DB_URL"))
	if err != nil {
		return nil, err
	}

	return &Storage{
		db: db,
	}, nil
}
