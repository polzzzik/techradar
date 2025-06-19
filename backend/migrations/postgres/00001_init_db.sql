-- +goose Up
CREATE TABLE technologies (
    id bigint NOT NULL PRIMARY KEY,
    name text NOT NULL,
    description text,
    ring text NOT NULL,
    section text NOT NULL,
    status text NOT NULL,
    category text NOT NULL,
    created_at timestamp DEFAULT now (),
    updated_at timestamp DEFAULT now ()
);

-- +goose Down
DROP TABLE technologies;
