package pool_item

import (
	"context"
	"errors"
	"fmt"
	"time"

	"techradar_backend/internal/storage"
	"techradar_backend/pkg/sqlxhelper"
	"techradar_backend/pkg/sugar"
)

func (u *Usecase) UpVote(ctx context.Context, poolID, techID int) error {
	item, err := u.poolItemStorage.GetPoolItem(ctx, poolID, techID)
	if err != nil {
		if errors.Is(err, sqlxhelper.ErrNotFound) {
			return ErrNotFound
		}
		return fmt.Errorf("get pool item: %w", err)
	}
	if item.FinishedAt != nil && time.Now().After(*item.FinishedAt) {
		return ErrFinished
	}

	return u.poolItemStorage.UpdatePoolItem(ctx, &storage.UpdatePoolItemDTO{
		ID:           poolID,
		TechnologyID: techID,
		VoteUp:       sugar.ToPtr(item.VotesUp + 1),
	})
}
