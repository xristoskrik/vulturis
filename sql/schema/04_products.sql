-- +goose Up
CREATE TABLE products (
    id SERIAL PRIMARY KEY,  -- 'id' is the only unique identifier
    name TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    category TEXT NOT NULL, 
    image TEXT,
    stock INT NOT NULL,
    description TEXT,
    slug TEXT NOT NULL 
);

-- Inserting values with unique slugs
INSERT INTO products (name, price, category, image, stock, description, slug)
VALUES
    ('Eros the Bittersweet', 12.00, 'Book', 'ErosTheBittersweetImage', 10, 'The book traces the concept of eros in ancient Greece through its representations in writings of the time.', 'eros-the-bittersweet-1'),
    ('Stories of Painting', 19.88, 'Art', 'Zwgr', 10, 'Daniel Arasse takes the reader on a journey through the history of art from the invention of perspective to the disappearance of the motif.', 'histories-of-painting-1'),
    ('The mysterious flame of Queen Loana', 18.99, 'Literature', 'Fiamma', 10, 'The book is a literary exploration of the traditional phenomenon whereby a persons life flashes before him or her, as a 59-year-old Milanese antiquarian book dealer (who has lost his episodic memory due to a stroke) struggles to regain the one memory he seeks above all others: the face of the girl he loved ever since he was a student.', 'regina-loana-1'),
    ('Legendary Lands', 16.99, 'Geography', 'Land', 10, 'Legendary lands and places are of various kinds and have only one characteristic in common: whether they depend on ancient legends whose origins are lost in the mists of time or whether they are an effect of a modern invention, they have created flows of belief.', 'legendary-1'),
    ('Seven Japanese Tales', 17.99, 'Fiction', 'Yokai', 10, 'Junichiro Tanizakis Seven Japanese Tales collects stories that explore the boundary at which love becomes self-annihilation, where the contemplation of beauty gives way to fetishism, and where tradition becomes an instrument of voluptuous cruelty.', 'tanizaki-1'),
    ('The art of not being governed', 27.99, 'Philosophy', 'Asia', 10, 'An anti-history of human civilization', 'zomia-1'),
    ('The island of the day before', 15.99, 'Historical Fiction', 'Island', 10, 'Another extended meditation on the subjective nature of reality that demonstrates the deceptive nature of all signs and metaphors. Eco presents his historical romance as the collected letters of Roberto de La Griva, a shipwrecked 17th-century nobleman who becomes stranded on an abandoned ship, the Daphne, anchored off a mysterious Pacific island. With no way of locating himself or finding a way home, Roberto abandons himself to philosophical contemplation, roaming the crewless ship and composing letters to his beloved Lilia, a woman he has admired from afar.', 'zomia-1'),
    ('On Beauty', 20.00, 'Philosophy', 'Beauty', 10, 'The book On Beauty by Umberto Eco explores the concept of beauty and its significance in human culture and society. It is a philosophical exploration of the various dimensions of beauty, ranging from art and aesthetics to personal appearance and the role of beauty in social interactions.', 'beauty-1');

-- +goose Down
DROP TABLE products;
