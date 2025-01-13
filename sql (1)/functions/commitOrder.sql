CREATE OR REPLACE FUNCTION commit_order(usruuid UUID, ordcode UUID)
RETURNS VOID AS $$
    DECLARE
        insufficient_stock BOOLEAN := FALSE;
        rec record;

    -- step 1: test if the amout (of products) cart are within the stock (of products) --
    -- IF TRUE FOR EVERY PRODUCT then insert them in the ordered_products              --
    -- IF NOT raice flag insufficient_stock                                            --
    BEGIN

        FOR rec IN
            SELECT c.product_code, c.amount, p.stock
            FROM cart c
            JOIN products p ON p.product_code = c.product_code
            WHERE c.user_uuid = usruuid
        LOOP
            IF rec.amount <= rec.stock THEN

                INSERT INTO ordered_products (order_code, user_uuid, product_code, amount)
                SELECT
                    o.order_code,
                    c.user_uuid,
                    c.product_code,
                    c.amount
                FROM cart c
                JOIN products p ON p.product_code = c.product_code
                JOIN orders o ON o.user_uuid = c.user_uuid
                WHERE c.user_uuid = usruuid and o.order_code = ordcode;

            ELSE
                insufficient_stock := TRUE;
            END IF;
        END LOOP;

        -- step 2: Deduct the ordered amount from the product stock in the products table (since they were bought) --
        UPDATE products
        SET stock = stock - c.amount
        FROM cart c
        WHERE products.product_code = c.product_code
        AND c.user_uuid = usruuid;

        -- step 3: Remove products from the cart --
        DELETE  FROM cart
        WHERE user_uuid = usruuid;

        -- step 4: if flag insufficient_stock raised throw exception and ROLLBACK the changes --
        IF insufficient_stock THEN
            RAISE EXCEPTION 'Transaction aborted: Insufficient stock for one or more products in the cart.';
        END IF;
    END;
$$ LANGUAGE plpgsql;
