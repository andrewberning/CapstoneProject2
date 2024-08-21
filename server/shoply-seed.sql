-- Insert sample users
INSERT INTO users (username, password, first_name, last_name, email)
VALUES ('testuser',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User',
        'testuser@gmail.com');

-- Insert sample categories
INSERT INTO categories (name, image_url)
VALUES 
('electronics', 'https://res.cloudinary.com/dp7lzqbk3/image/upload/v1724175310/shoply/game-console.webp'), 
('toys', 'https://res.cloudinary.com/dp7lzqbk3/image/upload/v1724177483/shoply/teddybear_xjzbb7.jpg'),
('clothing', 'https://res.cloudinary.com/dp7lzqbk3/image/upload/v1724177487/shoply/t-shirt_sejdnv.jpg'), 
('groceries', 'https://res.cloudinary.com/dp7lzqbk3/image/upload/v1724177487/shoply/groceries_ogez9o.png'), 
('furniture', 'https://res.cloudinary.com/dp7lzqbk3/image/upload/v1724177487/shoply/couch_hhvd1u.avif'), 
('sports', 'https://res.cloudinary.com/dp7lzqbk3/image/upload/v1724177489/shoply/sports_dogovq.jpg');

-- Insert sample products
INSERT INTO products (name, description, price, image_url, stock, category_id)
VALUES 
('Gaming Console', 'A fun gaming console.', 499.99, 'https://res.cloudinary.com/dp7lzqbk3/image/upload/v1724175310/shoply/game-console.webp', 100, 1),
('Laptop', 'A high performance laptop.', 999.99, 'https://res.cloudinary.com/dp7lzqbk3/image/upload/v1724177486/shoply/laptop_ze2teq.jpg', 50, 1),
('Smartphone', 'Latest model smartphone.', 599.99, 'https://res.cloudinary.com/dp7lzqbk3/image/upload/v1724177486/shoply/smart-phone_d0xhli.jpg', 75, 1),
('Teddy Bear', 'A snuggly teddy bear.', 29.99, 'https://res.cloudinary.com/dp7lzqbk3/image/upload/v1724177483/shoply/teddybear_xjzbb7.jpg', 98, 2),
('3-D Puzzle', 'A challenging 3-D puzzle.', 49.99, 'https://res.cloudinary.com/dp7lzqbk3/image/upload/v1724177486/shoply/3d-puzzle_fpvn43.webp', 55, 2),
('Rocking Horse', 'An original rocking horse.', 59.99, 'https://res.cloudinary.com/dp7lzqbk3/image/upload/v1724177485/shoply/rocking-horse_nhnszi.webp', 15, 2),
('T-shirt', 'Comfortable cotton t-shirt.', 19.99, 'https://res.cloudinary.com/dp7lzqbk3/image/upload/v1724177487/shoply/t-shirt_sejdnv.jpg', 99, 3),
('Jeans', 'Stylish blue jeans.', 29.99, 'https://res.cloudinary.com/dp7lzqbk3/image/upload/v1724177486/shoply/jeans_ws1f39.webp', 34, 3),
('Sweater', 'Cozy wool sweater.', 25.99, 'https://res.cloudinary.com/dp7lzqbk3/image/upload/v1724177485/shoply/sweater_hzkfu8.webp', 70, 3),
('Red Apple', 'Crisp red apple.', 0.59, 'https://res.cloudinary.com/dp7lzqbk3/image/upload/v1724177487/shoply/apple_l0iew2.jpg', 22, 4),
('Organic Banana', 'Sweet organic banana.', 0.99, 'https://res.cloudinary.com/dp7lzqbk3/image/upload/v1724177484/shoply/banana_z5gepk.avif', 34, 4),
('Yellow Onion', 'Yellow onion.', .49, 'https://res.cloudinary.com/dp7lzqbk3/image/upload/v1724177487/shoply/onion_dzu1cu.jpg', 62, 4),
('Futon', 'A great futon.', 199.99, 'https://res.cloudinary.com/dp7lzqbk3/image/upload/v1724177484/shoply/futon_wpqp1m.jpg', 31, 5),
('Bed Mattress', 'Comfortable bed mattress.', 399.49, 'https://res.cloudinary.com/dp7lzqbk3/image/upload/v1724177484/shoply/bed-mattress_v9xw9p.webp', 58, 5),
('Couch', 'Stylish couch.', 299.49, 'https://res.cloudinary.com/dp7lzqbk3/image/upload/v1724177487/shoply/couch_hhvd1u.avif', 37, 5),
('Baseball Bat', 'Wooden baseball bat.', 59.99, 'https://res.cloudinary.com/dp7lzqbk3/image/upload/v1724177484/shoply/baseball-bat_reie7v.webp', 29, 6),
('Football', 'Leather football.', 29.99, 'https://res.cloudinary.com/dp7lzqbk3/image/upload/v1724177483/shoply/football_uiacwm.jpg', 32, 6),
('Tennis Racket', 'Pro tennis racket.', 19.99, 'https://res.cloudinary.com/dp7lzqbk3/image/upload/v1724177483/shoply/tennis-racket_i5j7du.jpg', 57, 6);

-- Insert sample carts
INSERT INTO carts (user_id)
VALUES 
(1);