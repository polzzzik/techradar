package create_pool_items

import (
	"context"
	"fmt"
)

type poolItemUC interface {
	CreatePoolItems(ctx context.Context) error
}

type Handler struct {
	poolItemUsecase poolItemUC
}

func New(poolItemUsecase poolItemUC) *Handler {
	return &Handler{
		poolItemUsecase: poolItemUsecase,
	}
}

func (h *Handler) Handle(ctx context.Context) error {
	err := h.poolItemUsecase.CreatePoolItems(ctx)
	if err != nil {
		return fmt.Errorf("create pool items handler: %w", err)
	}

	return nil
}
