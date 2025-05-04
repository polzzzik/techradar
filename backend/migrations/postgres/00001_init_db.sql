-- +goose Up
CREATE TABLE technologies (
    id bigint NOT NULL,
    name text NOT NULL,
    description text,
    ring text NOT NULL, 
    section text NOT NULL,
    status text NOT NULL,
    category text NOT NULL,
    created_at timestamp DEFAULT now(),
    updated_at timestamp DEFAULT now(),

    PRIMARY KEY(id)
);


-- +goose Down
DROP TABLE technologies;
