-- name: CreateUser :one
INSERT INTO users (id, created_at, updated_at, email,hashed_password,name,surname,phone,mobile,address)
VALUES (
    gen_random_uuid (),
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP,
    $1,
    $2,
    $3,
    $4,
    $5,
    $6,
    $7
)
RETURNING *;

-- name: UpdateUsers :exec
UPDATE users
SET email = $1, hashed_password = $2
WHERE id = $3;

-- name: UpdateUserEmailById :one
UPDATE users SET email = $1
WHERE id = $2
RETURNING *;

-- name: UpdateUserPasswordByEmail :one
UPDATE users SET hashed_password = $1
WHERE email = $2
RETURNING *;

-- name: DeleteUserById :exec
delete from users WHERE id = $1;
-- name: DeleteUserByEmail :exec
delete from users WHERE email = $1;

-- name: GetUser :one
SELECT * FROM users WHERE $1 = users.email;
-- name: GetUserById :one
SELECT * FROM users WHERE $1 = users.id;
-- name: DeleteUsers :exec
delete  from users;
