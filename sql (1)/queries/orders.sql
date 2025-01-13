-- name: CreateOrder :one
INSERT INTO orders (order_code, created_at, updated_at ,user_uuid)
VALUES (
    gen_random_uuid (),
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP,
    $1
)
RETURNING *;

-- name: GetOrder :one
SELECT * FROM orders WHERE $1 = orders.order_code;

-- name: GetOrderByUserID :one
SELECT * FROM orders WHERE $1 = orders.user_uuid;

-- name: UpdateOrder :one
UPDATE orders
SET updated_at = NOW (), user_uuid = $1, complete_status = $2
WHERE order_code = $3
RETURNING *;

-- name: UpdateOrderStatus :one
UPDATE orders
SET updated_at = NOW (), complete_status = $1
WHERE order_code = $2
RETURNING *;

-- name: DeleteOrderByID :exec
delete from orders WHERE order_code = $1;

-- name: DeleteOrderByUser :exec
delete from orders WHERE user_uuid = $1;

-- name: CommitOrder :one
select * from commit_order($1::UUID, $2::UUID);

-- name: DeleteOrders :exec
delete  from orders;
