package technology

import "context"

func (uc *UseCase) DeleteTechnologyByID(ctx context.Context, id int) error {
	return uc.storage.DeleteTechnology(ctx, id)
}
