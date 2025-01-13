-- name: CreateCart :one
INSERT INTO cart (user_uuid, product_code,  amount)
VALUES (
    $1,
    $2,
    $3
)
RETURNING *;

-- name: UpdateCart :one
UPDATE cart
SET user_uuid = $1, product_code = $2, amount = $3
WHERE id = $4
RETURNING *;

-- name: UpdateCartUserUUID :one
UPDATE cart SET user_uuid = $1
WHERE id = $2
RETURNING *;

-- name: UpdateCartProductCode :one
UPDATE cart SET product_code = $1
WHERE id = $2
RETURNING *;

-- name: UpdateCartProductAmount :one
UPDATE cart SET amount = $1
WHERE id = $2
RETURNING *;

-- name: DeleteCartByID :exec
delete from cart WHERE id = $1;

-- name: GetCart :one
SELECT * FROM cart WHERE $1 = cart.id;

-- name: GetCartByUserUUID :one
SELECT * FROM cart WHERE $1 = cart.user_uuid;

-- name: DeleteCarts :exec
delete  from cart;
