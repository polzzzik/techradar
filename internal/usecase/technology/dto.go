package technology

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
