
-- name: CreateProduct :one
INSERT INTO products (name, stock, price, description)
VALUES (
    $1,
    $2,
    $3,
    $4
)
RETURNING *;

-- name: UpdateProduct :one
UPDATE products
SET name = $1, stock = $2, price = $3, description = $4
WHERE product_code = $5
RETURNING *;

-- name: UpdateProductStock :one
UPDATE products SET stock = $1
WHERE product_code = $2
RETURNING *;

-- name: UpdateProductDescription :one
UPDATE products SET description = $1
WHERE product_code = $2
RETURNING *;

-- name: UpdateProductName :one
UPDATE products SET name = $1
WHERE product_code = $2
RETURNING *;

-- name: UpdateProductPrice :one
UPDATE products SET price = $1
WHERE product_code = $2
RETURNING *;

-- name: DeleteProductByCode :exec
delete from products WHERE product_code = $1;

-- name: GetProduct :one
SELECT * FROM products WHERE $1 = products.name;

-- name: GetUserByCode :one
SELECT * FROM products WHERE $1 = products.product_code;

-- name: DeleteProducts :exec
delete  from products;
