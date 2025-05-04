package main

import (
	"log"
	"log/slog"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
	"github.com/joho/godotenv"

	"techradar_backend/internal/api/add_technology_handler"
	"techradar_backend/internal/api/delete_technology_handler"
	"techradar_backend/internal/api/get_technologies_handler"
	"techradar_backend/internal/api/get_technology_handler"
	"techradar_backend/internal/storage/postgres"
	"techradar_backend/internal/usecase/technology"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	storage, err := postgres.NewStorage()
	if err != nil {
		log.Fatalf("failed to create storage: %v", err)
	}

	techUseCase := technology.New(storage)

	router := chi.NewRouter()

	router.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"*"}, // или []string{"*"} для всех
		AllowedMethods:   []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300,
	}))

	router.Route("/api/technology", func(r chi.Router) {
		r.Get("/{id}", get_technology_handler.New(techUseCase).Handle)
		r.Get("/", get_technologies_handler.New(techUseCase).Handle)
		r.Post("/", add_technology_handler.New(techUseCase).Handle)
		r.Delete("/{id}", delete_technology_handler.New(techUseCase).Handle)
	})

	slog.Info("Server started on :8080")
	err = http.ListenAndServe(":8080", router)
	if err != nil {
		log.Fatalf("failed to start server: %v", err)
	}
}
