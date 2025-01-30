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
        phone TEXT NOT NULL,
        mobile TEXT NOT NULL,
        address TEXT NOT NULL,
        isadmin BOOL NOT NULL DEFAULT FALSE);

-- +goose Down
DROP TABLE users;
