-- name: CreateOrderedProduct :one
INSERT INTO ordered_products (order_code, user_uuid, product_code,  amount)
VALUES (
    $1,
    $2,
    $3,
    $4
)
RETURNING *;

-- name: UpdateOrderedProduct :one
UPDATE ordered_products
SET order_code = $1, user_uuid = $2, product_code = $3, amount = $4
WHERE id = $5
RETURNING *;

-- name: UpdateOrderedProductOrderCode :one
UPDATE ordered_products SET order_code = $1
WHERE id = $2
RETURNING *;

-- name: UpdateOrderedProductUserUUID :one
UPDATE ordered_products SET user_uuid = $1
WHERE id = $2
RETURNING *;

-- name: UpdateOrderedProductProductCode :one
UPDATE ordered_products SET product_code = $1
WHERE id = $2
RETURNING *;

-- name: UpdateOrderedProductAmount :one
UPDATE ordered_products SET amount = $1
WHERE id = $2
RETURNING *;

-- name: DeleteOrderedProductByCode :exec
delete from ordered_products WHERE id = $1;

-- name: DeleteOrderedProductByUserUUID :exec
delete from ordered_products WHERE user_uuid = $1;

-- name: DeleteOrderedProductByOrderCode :exec
delete from ordered_products WHERE order_code = $1;

-- name: GetOrderedProduct :one
SELECT * FROM ordered_products WHERE $1 = ordered_products.id;

-- name: GetOrderedProductByUserUUID :one
SELECT * FROM ordered_products WHERE $1 = ordered_products.user_uuid;

-- name: GetOrderedProductByOrderCode :one
SELECT * FROM ordered_products WHERE $1 = ordered_products.order_code;

-- name: DeleteOrderedProducts :exec
delete  from ordered_products;
