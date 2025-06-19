package storage

import (
	"techradar_backend/internal/model"
)

type UpdateTechnologyDTO struct {
	ID          int
	Name        *string
	Description *string
	Ring        *model.TechnologyRing
	Section     *model.TechnologySection
	Status      *model.TechnologyStatus
	Category    *model.TechnologyCategory
}

func (t UpdateTechnologyDTO) ToMap() map[string]any {
	return map[string]any{
		"name":        t.Name,
		"description": t.Description,
		"ring":        t.Ring,
		"section":     t.Section,
		"status":      t.Status,
		"category":    t.Category,
	}
}

type UpdatePoolItemDTO struct {
	ID           int
	TechnologyID int
	VoteUp       *int
	VoteDown     *int
}

func (p UpdatePoolItemDTO) ToMap() map[string]any {
	return map[string]any{
		"id":            p.ID,
		"technology_id": p.TechnologyID,
		"vote_up":       p.VoteUp,
		"vote_down":     p.VoteDown,
	}
}
