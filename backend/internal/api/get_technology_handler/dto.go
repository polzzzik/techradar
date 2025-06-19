package get_technology_handler

import "time"

type TechnologyResult struct {
	ID          int       `json:"id"`
	Name        string    `json:"name"`
	Description *string   `json:"description"`
	Ring        string    `json:"ring"`
	Section     string    `json:"section"`
	Status      string    `json:"status"`
	Category    string    `json:"category"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}
