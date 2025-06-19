package technology

import "errors"

var (
	// ErrNotFound is returned when a technology is not found.
	ErrNotFound = errors.New("technology not found")
	// ErrAlreadyExists is returned when a technology already exists.
	ErrAlreadyExists = errors.New("technology already exists")
)