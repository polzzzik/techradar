ifneq (,$(wildcard .env))
    include .env
    export
endif

install_deps: goouse mockery

goouse:
	go install github.com/pressly/goose/v3/cmd/goose@latest

mockery:
	go install github.com/vektra/mockery/v2@latest

migrate:
	go tool goose -dir=./migrations/postgres postgres "$(DB_URL)" up

down:
	go tool goose -dir=./migrations/postgres postgres "$(DB_URL)" down

lint:
	go tool golangci-lint run