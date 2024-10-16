-- +goose Up
CREATE TABLE users(
        id UUID PRIMARY KEY,
        created_at TIMESTAMP NOT NULL,
        updated_at TIMESTAMP NOT NULL,
        email TEXT NOT NULL,
        UNIQUE(email),
        hashed_password TEXT NOT NULL,
        name TEXT NOT NULL,
        surname TEXT NOT NULL,
        username  TEXT NOT NULL);

-- +goose Down
DROP TABLE users;