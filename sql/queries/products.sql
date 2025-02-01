-- name: CreateProduct :one
INSERT INTO products (name, price, category, image, stock, description, slug)
VALUES (
    $1, $2, $3, $4, $5, $6, $7
)
RETURNING id, name, price, category, image, stock, description, slug;

-- name: UpdateProduct :one
UPDATE products
SET name = $1, price = $2, category = $3, image = $4, stock = $5, description = $6, slug = $7
WHERE id = $8
RETURNING id, name, price, category, image, stock, description, slug;

-- name: GetAllProducts :many
SELECT id, name, price, category, image, stock, description, slug
FROM products;

-- name: DeleteProductById :exec
DELETE FROM products WHERE id = $1;

-- name: GetProductById :one
SELECT * FROM products WHERE id = $1;

-- name: GetProductBySlug :one
SELECT * FROM products WHERE slug = $1;
