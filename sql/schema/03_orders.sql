-- +goose Up
CREATE TABLE orders(
        order_code UUID PRIMARY KEY,
        created_at TIMESTAMP NOT NULL,
        updated_at TIMESTAMP NOT NULL,
        email VARCHAR(256) NOT NULL,
        complete_status VARCHAR(45) NOT NULL DEFAULT 'pending');


-- +goose Down
DROP TABLE orders;

