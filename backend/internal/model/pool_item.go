package model

import "time"

type PoolItem struct {
	ID           int        `db:"id"`            // ID голосования
	TechnologyID int        `db:"technology_id"` // ID технологии
	VotesUp      int        `db:"votes_up"`      // количество голосов за повышение технологии
	VotesDown    int        `db:"votes_down"`    // количество голосов за понижение технологии
	CreatedAt    time.Time  `db:"created_at"`    // дата создания голосования
	FinishedAt   *time.Time `db:"finished_at"`   // дата обновления голосования
}
