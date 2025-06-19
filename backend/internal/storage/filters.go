package storage

import "techradar_backend/internal/model"

type TechnologiesFilter struct {
	Section  *model.TechnologySection
	Category *model.TechnologyCategory
	Limit    *int
	Offset   *int
}
