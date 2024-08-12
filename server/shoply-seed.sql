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
('electronics', 'https://www.cnet.com/a/img/resize/05f4f1af2b2243d7dfb1349ab1888878fbf84ceb/hub/2022/10/24/a316fc5e-b8d6-4914-925a-a33170c9abeb/ps5.jpg?auto=webp&fit=crop&height=1200&width=1200'), 
('toys', 'https://www.buildabear.com/dw/image/v2/BBNG_PRD/on/demandware.static/-/Sites-buildabear-master/default/dw5c9af120/69231211226518Alt1x20714018.jpg?sw=800&sh=800&sm=fit'),
('clothing', 'https://i.pinimg.com/564x/ca/e8/e1/cae8e156647fbd46e26752fb7433ec2d.jpg'), 
('groceries', 'https://anchorridge.org/wp-content/uploads/2020/05/Bag-Of-Groceries-1.png'), 
('furniture', 'https://www.ikea.com/us/en/images/products/paerup-sofa-vissle-gray__1041907_pe841187_s5.jpg'), 
('sports', 'https://media.npr.org/assets/img/2020/06/10/gettyimages-200199027-001-77516efa4fe5d700d23be705ce64c89a3471910c.jpg');

-- Insert sample products
INSERT INTO products (name, description, price, image_url, stock, category_id)
VALUES 
('Gaming Console', 'A fun gaming console.', 499.99, 'https://www.cnet.com/a/img/resize/05f4f1af2b2243d7dfb1349ab1888878fbf84ceb/hub/2022/10/24/a316fc5e-b8d6-4914-925a-a33170c9abeb/ps5.jpg?auto=webp&fit=crop&height=1200&width=1200', 100, 1),
('Laptop', 'A high performance laptop.', 999.99, 'https://m.media-amazon.com/images/I/61Qe0euJJZL.jpg', 50, 1),
('Smartphone', 'Latest model smartphone.', 599.99, 'https://i.ebayimg.com/images/g/XqQAAOSwZbJkAUnm/s-l400.jpg', 75, 1),
('Teddy Bear', 'A snuggly teddy bear.', 29.99, 'https://www.buildabear.com/dw/image/v2/BBNG_PRD/on/demandware.static/-/Sites-buildabear-master/default/dw5c9af120/69231211226518Alt1x20714018.jpg?sw=800&sh=800&sm=fit', 98, 2),
('3-D Puzzle', 'A challenging 3-D puzzle.', 49.99, 'https://ae01.alicdn.com/kf/Saff4cc9ddc1a41c2b3293bc760c68e4aJ/CubicFun-3D-Puzzles-696-Pcs-Large-LED-Spain-Sagrada-Fam-lia-Moveable-Church-Model-Kits-Jigsaw.jpg', 55, 2),
('Rocking Horse', 'An original rocking horse.', 59.99, 'https://www.tenderleaftoys.com/cdn/shop/products/TL8592-lucky-rocking-horse-1.jpg?v=1641798913', 15, 2),
('T-shirt', 'Comfortable cotton t-shirt.', 19.99, 'https://i.pinimg.com/564x/ca/e8/e1/cae8e156647fbd46e26752fb7433ec2d.jpg', 99, 3),
('Jeans', 'Stylish blue jeans.', 29.99, 'https://images.jackjones.com/12202489/3796886/001/jackjones-jjieddiejjoriginalcj911pcwloosefitjeans-blue.jpg?v=3fdfa81383ff7fcdc5e78abdb8e8674a&format=webp&width=1280&quality=90&key=25-0-3', 34, 3),
('Sweater', 'Cozy wool sweater.', 25.99, 'https://i.etsystatic.com/10777022/c/2400/2400/60/0/il/4a0fba/5519731481/il_300x300.5519731481_du1i.jpg', 70, 3),
('Red Apple', 'Crisp red apple.', 0.59, 'https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com/PIE/product/56e808d8f6e8791100e80028_365_-red-delicious-apple.2.jpg', 22, 4),
('Organic Banana', 'Sweet organic banana.', 0.99, 'https://i5.walmartimages.com/seo/Fresh-Banana-Fruit-Each_5939a6fa-a0d6-431c-88c6-b4f21608e4be.f7cd0cc487761d74c69b7731493c1581.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF', 34, 4),
('Yello Onion', 'Yellow onion.', .49, 'https://upload.wikimedia.org/wikipedia/commons/2/25/Onion_on_White.JPG', 62, 4),
('Futon', 'A great futon.', 199.99, 'https://assets.weimgs.com/weimgs/ab/images/wcm//products/202425/0064/jannick-full-futon-sleeper-85-fwh.jpg', 31, 5),
('Bed Mattress', 'Comfortable bed matress.', 399.49, 'https://mobileimages.lowes.com/productimages/ff366373-6469-4e78-9954-301435fa9489/42617831.jpg', 58, 5),
('Couch', 'Stylish couch.', 299.49, 'https://www.ikea.com/us/en/images/products/paerup-sofa-vissle-gray__1041907_pe841187_s5.jpg', 37, 5),
('Baseball Bat', 'Wooden baseball bat.', 59.99, 'https://cdn.shopify.com/s/files/1/0390/8909/products/K-3_Clear-733328_400x400.jpg?v=1702413280', 29, 6),
('Football', 'Leather football.', 29.99, 'https://t4.ftcdn.net/jpg/00/96/13/71/360_F_96137109_ojPuIAl4e3LqslKAMxJ5CgmbqOQeCcHr.jpg', 32, 6),
('Tennis Racket', 'Pro tennis racket.', 19.99, 'https://media.istockphoto.com/id/1051131134/vector/tennis-icon-on-white-background.jpg?s=612x612&w=0&k=20&c=gFiOceH1tVNoyBHtGVpmZ7qw5lUermLPBlAZbP7YHOo=', 57, 6);

-- Insert sample carts
INSERT INTO carts (user_id)
VALUES 
(1);