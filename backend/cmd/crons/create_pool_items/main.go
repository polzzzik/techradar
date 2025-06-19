package main

import (
	"context"
	"log"
	"log/slog"

	"github.com/joho/godotenv"

	"techradar_backend/internal/cron/create_pool_items"
	"techradar_backend/internal/storage/postgres"
	"techradar_backend/internal/usecase/pool_item"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	storage, err := postgres.NewStorage()
	if err != nil {
		panic(err)
	}

	uc := pool_item.New(storage, storage)

	handler := create_pool_items.New(uc)

	if err := handler.Handle(context.Background()); err != nil {
		slog.Error("cron create pool items", slog.String("error", err.Error()))
		return
	}

	slog.Info("cron create pool items completed successfully")
}
