package pool_item

type UpdatePoolItemDTO struct {
	ID           int
	TechnologyID int
	VoteUp       *int
	VoteDown     *int
}
