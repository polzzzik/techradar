package add_technology_handler

type AddTechnologyIn struct {
	Name        string  `json:"name" validate:"required"`
	Description *string `json:"description"`
	Ring        string  `json:"ring" validate:"required"`
	Section     string  `json:"section" validate:"required"`
	Category    string  `json:"category" validate:"required"`
}

type AddTechnologyOut struct {
	ID int `json:"id"`
}
