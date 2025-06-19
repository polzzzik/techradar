package pool_item

import (
	"errors"
)

var (
	ErrNotFound      = errors.New("pool not found")
	ErrAlreadyExists = errors.New("pool already exists")
	ErrFinished      = errors.New("pool finished")
)
