package down_vote_technology_handler

type DownVoteTechnologyRequest struct {
	PoolID       int `json:"pool_id" validate:"required"`
	TechnologyID int `json:"technology_id" validate:"required"`
}
