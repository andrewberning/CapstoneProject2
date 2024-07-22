-- Insert sample users
INSERT INTO users (username, password, first_name, last_name, email)
VALUES ('testuser',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User',
        'testuser@gmail.com'),
        ('testadmin',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'Admin',
        'testadmin@gmail.com');

-- Insert sample categories
INSERT INTO categories (name, image_url)
VALUES 
('electronics', 'https://www.shutterstock.com/image-vector/lost-items-line-vector-icon-260nw-1436787446.jpg'), 
('toys', 'https://www.shutterstock.com/image-vector/lost-items-line-vector-icon-260nw-1436787446.jpg'),
('clothing', 'https://www.shutterstock.com/image-vector/lost-items-line-vector-icon-260nw-1436787446.jpg'), 
('groceries', 'https://www.shutterstock.com/image-vector/lost-items-line-vector-icon-260nw-1436787446.jpg'), 
('furniture', 'https://www.shutterstock.com/image-vector/lost-items-line-vector-icon-260nw-1436787446.jpg'), 
('sports', 'https://www.shutterstock.com/image-vector/lost-items-line-vector-icon-260nw-1436787446.jpg');

-- Insert sample products
INSERT INTO products (name, description, price, image_url, stock, category_id)
VALUES 
('Gaming Console', 'A fun gaming console.', 499.99, 'https://www.shutterstock.com/image-vector/lost-items-line-vector-icon-260nw-1436787446.jpg', 100, 1),
('Laptop', 'A high performance laptop.', 999.99, 'https://www.shutterstock.com/image-vector/lost-items-line-vector-icon-260nw-1436787446.jpg', 50, 1),
('Smartphone', 'Latest model smartphone.', 599.99, 'https://www.shutterstock.com/image-vector/lost-items-line-vector-icon-260nw-1436787446.jpg', 75, 1),
('Teddy Bear', 'A snuggly teddy bear.', 29.99, 'https://www.shutterstock.com/image-vector/lost-items-line-vector-icon-260nw-1436787446.jpg', 98, 2),
('3-D Puzzle', 'A challenging 3-D puzzle.', 49.99, 'https://www.shutterstock.com/image-vector/lost-items-line-vector-icon-260nw-1436787446.jpg', 55, 2),
('Rocking Horse', 'An original rocking horse.', 59.99, 'https://www.shutterstock.com/image-vector/lost-items-line-vector-icon-260nw-1436787446.jpg', 15, 2),
('T-shirt', 'Comfortable cotton t-shirt.', 19.99, 'https://www.shutterstock.com/image-vector/lost-items-line-vector-icon-260nw-1436787446.jpg', 99, 3),
('Jeans', 'Stylish blue jeans.', 29.99, 'https://www.shutterstock.com/image-vector/lost-items-line-vector-icon-260nw-1436787446.jpg', 34, 3),
('Sweater', 'Cozy wool sweater.', 25.99, 'https://www.shutterstock.com/image-vector/lost-items-line-vector-icon-260nw-1436787446.jpg', 70, 3),
('Red Apple', 'Crisp red apple.', 0.59, 'https://www.shutterstock.com/image-vector/lost-items-line-vector-icon-260nw-1436787446.jpg', 22, 4),
('Organic Banana', 'Sweet organic banana.', 0.99, 'https://www.shutterstock.com/image-vector/lost-items-line-vector-icon-260nw-1436787446.jpg', 34, 4),
('Yello Onion', 'Yellow onion.', .49, 'https://www.shutterstock.com/image-vector/lost-items-line-vector-icon-260nw-1436787446.jpg', 62, 4),
('Futon', 'A great futon.', 199.99, 'https://www.shutterstock.com/image-vector/lost-items-line-vector-icon-260nw-1436787446.jpg', 31, 5),
('Bed Matress', 'Comfortable bed matress.', 399.49, 'https://www.shutterstock.com/image-vector/lost-items-line-vector-icon-260nw-1436787446.jpg', 58, 5),
('Couch', 'Stylish couch.', 299.49, 'https://www.shutterstock.com/image-vector/lost-items-line-vector-icon-260nw-1436787446.jpg', 37, 5),
('Baseball Bat', 'Wooden baseball bat.', 59.99, 'https://www.shutterstock.com/image-vector/lost-items-line-vector-icon-260nw-1436787446.jpg', 29, 6),
('Football', 'Leather football.', 29.99, 'https://www.shutterstock.com/image-vector/lost-items-line-vector-icon-260nw-1436787446.jpg', 32, 6),
('Tennis Racket', 'Pro tennis racket.', 19.99, 'https://www.shutterstock.com/image-vector/lost-items-line-vector-icon-260nw-1436787446.jpg', 57, 6);

-- Insert sample carts
INSERT INTO carts (user_id, guest_id)
VALUES 
(1, NULL),
(2, NULL),
(NULL, '550e8400-e29b-41d4-a716-446655440000'),
(NULL, '660e8400-e29b-41d4-a716-446655440001');

-- Insert sample cart items
INSERT INTO cart_items (cart_id, product_id, quantity, price)
VALUES
(1, 1, 1, 499.99),
(1, 3, 2, 599.99),
(2, 2, 1, 999.99),
(3, 4, 1, 29.99);

-- Insert sample orders
INSERT INTO orders (user_id, guest_id, total_price, status)
VALUES
(1, NULL, 1399.97, 'Pending'),
(2, NULL, 699.99, 'Completed'),
(NULL, '550e8400-e29b-41d4-a716-446655440000', 299.99, 'Pending');

-- Insert sample order items
INSERT INTO order_items (order_id, product_id, quantity, price)
VALUES
(1, 1, 1, 499.99),
(1, 3, 2, 599.99),
(2, 2, 1, 999.99),
(3, 4, 1, 29.99)