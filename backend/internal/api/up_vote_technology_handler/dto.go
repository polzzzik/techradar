package up_vote_technology_handler

type UpVoteTechnologyRequest struct {
	PoolID       int `json:"pool_id" validate:"required"`
	TechnologyID int `json:"technology_id" validate:"required"`
}
