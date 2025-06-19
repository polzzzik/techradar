-- +goose Up
create table pool_items (
    id bigint primary key,
    technology_id bigint not null references technologies (id),
    votes_up integer not null default 0,
    votes_down integer not null default 0,
    created_at timestamp not null default now (),
    finished_at timestamp
);

-- +goose Down
drop table pool_items;
