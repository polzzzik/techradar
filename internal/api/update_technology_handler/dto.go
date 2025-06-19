package update_technology_handler

import (
	"techradar_backend/internal/model"
	"techradar_backend/internal/usecase/technology"
)

type UpdateTechnologyRequest struct {
	Name        *string `json:"name"`
	Description *string `json:"description"`
	Ring        *string `json:"ring"`
	Section     *string `json:"section"`
	Status      *string `json:"status"`
	Category    *string `json:"category"`
}

func (r *UpdateTechnologyRequest) ToDTO(id int) (*technology.UpdateTechnologyDTO, error) {
	dto := &technology.UpdateTechnologyDTO{
		ID:          id,
		Name:        r.Name,
		Description: r.Description,
	}

	if r.Ring != nil {
		ring, err := model.GetRing(*r.Ring)
		if err != nil {
			return nil, err
		}
		dto.Ring = &ring
	}

	if r.Section != nil {
		section, err := model.GetSection(*r.Section)
		if err != nil {
			return nil, err
		}
		dto.Section = &section
	}

	if r.Status != nil {
		status, err := model.GetStatus(*r.Status)
		if err != nil {
			return nil, err
		}
		dto.Status = &status
	}

	if r.Category != nil {
		category, err := model.GetCategory(*r.Category)
		if err != nil {
			return nil, err
		}
		dto.Category = &category
	}

	return dto, nil
}
