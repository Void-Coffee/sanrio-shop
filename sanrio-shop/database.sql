CREATE DATABASE IF NOT EXISTS sanrio_shop CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE sanrio_shop;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    color VARCHAR(7) DEFAULT '#ffb7c5',
    emoji VARCHAR(10)
);
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    stock INT DEFAULT 0,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);
CREATE TABLE basket (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT DEFAULT 1,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE KEY unique_basket_item (user_id, product_id)
);
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    status ENUM('pending','paid','shipped','delivered') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price_at_purchase DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- CATEGORIES
INSERT INTO categories (name, slug, description, color, emoji) VALUES
('Hello Kitty',   'hello-kitty',   'The iconic white cat with a red bow.',                              '#ff8fab', '🎀'),
('My Melody',     'my-melody',     'A gentle bunny in a pink hood.',                                    '#f4a4c0', '🐰'),
('Cinnamoroll',   'cinnamoroll',   'A fluffy white puppy with cinnamon-roll ears.',                     '#a8d8ea', '☁️'),
('Kuromi',        'kuromi',        'My Melody''s mischievous rival -- edgy and secretly sweet.',        '#9b59b6', '💜'),
('Pompompurin',   'pompompurin',   'A golden retriever who loves pudding and long naps.',               '#f9ca24', '🍮'),
('Keroppi',       'keroppi',       'A cheerful frog from Donut Pond.',                                  '#6ab04c', '🐸'),
('Chococat',      'chococat',      'The lovable black cat with a chocolate-chip nose.',                 '#795548', '🍫'),
('Badtz-Maru',    'badtz-maru',    'A mischievous penguin with a rebellious attitude.',                 '#424242', '🐧'),
('Pochacco',      'pochacco',      'A playful white puppy with floppy ears.',                           '#42a5f5', '🐾'),
('Collabs',       'collabs',       'Special crossovers -- Hatsune Miku, Funko POP & more.',            '#39c5bb', '🌟'),
('Character Mix', 'character-mix', 'Posters & prints featuring all your favourite Sanrio characters.', '#e91e8c', '🎨');

-- PRODUCTS
INSERT INTO products (category_id, name, description, price, stock, image_url) VALUES
-- Hello Kitty (cat 1) ids 1-5
(1, 'Hello Kitty Plush',          'Soft Hello Kitty plush with iconic red bow, 25cm.',           49.99, 20, 'images/Hellokitty.avif'),
(1, 'Hello Kitty Keychain',       'Metal Hello Kitty keychain charm.',                           19.99, 40, 'images/hellokittycharm.webp'),
(1, 'Hello Kitty Pins Set',       'Set of 5 Hello Kitty enamel pins.',                           22.99, 35, 'images/hellokittybadgeset.jpg'),
(1, 'Hello Kitty Figurine',       'Hello Kitty classic figurine.',                               33.99, 40, 'images/hellokittyfigurine.webp'),
(1, 'Hello Kitty Dress Figurine', 'Hello Kitty figurine in a cute dress.',                       45.99, 40, 'images/hellokittyfigurine(2).webp'),

-- My Melody (cat 2) ids 6-9
(2, 'My Melody Figurine',         'My Melody classic figurine.',                                 29.99, 12, 'images/Mymelodyfigurine.jpg'),
(2, 'My Melody Plush',            'Fluffy My Melody in her pink hood, 30cm.',                    54.99, 18, 'images/mymelody.jpg'),
(2, 'My Melody Keychain Charm',   'Soft rubber My Melody keychain charm, 7cm.',                  14.99, 50, 'images/Mymelodycharm.webp'),
(2, 'My Melody Badgepin',         'My Melody steel badgepin.',                                    5.99, 60, 'images/mymelodypin.jpg'),

-- Cinnamoroll (cat 3) ids 10-15
(3, 'Cinnamoroll Head Keychain',  'Cinnamoroll head-shaped silicone keychain.',                  16.99, 40, 'images/cinnamonrollcharm.webp'),
(3, 'Cinnamoroll Plush',          'White puppy with huge head and cinnamon-roll ears.',          44.99, 22, 'images/cinnamonroll.webp'),
(3, 'Cinnamoroll Keychain',       'Soft silicone Cinnamoroll keychain charm.',                   14.99, 40, 'images/cinnamonrollkeychain.webp'),
(3, 'Cinnamoroll Pins Set',       'Set of 9 Cinnamoroll enamel pins.',                           19.99, 35, 'images/cinnamonrollpin.webp'),
(3, 'Cinnamoroll Figurine',       'Cinnamoroll figurine with a little crown.',                   64.99, 30, 'images/cinnamonrollfigurine.webp'),
(3, 'Cinnamoroll Pin',            'Cinnamoroll single enamel pin.',                               5.99, 35, 'images/cinnamonrollpin(2).webp'),

-- Kuromi (cat 4) ids 16-19
(4, 'Kuromi Plush',               'Black-and-pink Kuromi with skull motif, 25cm.',               49.99, 16, 'images/kuromi.webp'),
(4, 'Kuromi Keychain',            'Kuromi rubber charm.',                                         15.99, 28, 'images/kuromicharm.webp'),
(4, 'Kuromi Figurine',            'Kuromi collectible PVC figurine.',                             40.99, 25, 'images/Kuromifigurine.webp'),
(4, 'Kuromi Maid Figurine',       'Cute Kuromi in maid dress figurine.',                          50.99, 20, 'images/Kuromifigurine(2).webp'),

-- Pompompurin (cat 5) ids 20-23
(5, 'Pompompurin Plush',          'Golden retriever plush in yellow beret, 20cm.',               44.99, 19, 'images/pompompurin.jpg'),
(5, 'Pompompurin Figurine',       'PVC Pompompurin figurine with pudding base, 8cm.',            64.99,  8, 'images/pompomfigurine.jpg'),
(5, 'Pompompurin Keychain',       'Pudding-shaped Pompompurin rubber keychain.',                 13.99, 30, 'images/pompompurincharm.jpg'),
(5, 'Pompompurin Badgepin',       'Pompompurin small steel pin.',                                 5.99, 30, 'images/pompompin.webp'),

-- Keroppi (cat 6) ids 24-26
(6, 'Keroppi Plush',              'Green Keroppi frog with wide smile, 18cm.',                   39.99, 14, 'images/Keroppi.jpeg'),
(6, 'Keroppi Keychain',           'Translucent green Keroppi rubber keychain.',                  13.99, 22, 'images/keroppicharm.jpg'),
(6, 'Keroppi Pin',                'Small, steel pin with Keroppi frog.',                         5.99,  50, 'images/keroppipin.jpg'),

-- Chococat (cat 7) ids 26-29
(7, 'Chococat Plush',             'Black Chococat with big eyes and chocolate-chip nose, 22cm.', 46.99, 15, 'images/chococat.webp'),
(7, 'Chococat Keychain',          'Chococat rubber antenna keychain charm.',                     16.99, 32, 'images/chococatcharm.webp'),
(7, 'Chococat Figurine',          'Chococat PVC collectible figurine, 8cm.',                     59.99, 10, 'images/chococatfigurine.webp'),
(7, 'Chococat Badgepin',          'Chococat pink badgepin.',                                      5.99, 10, 'images/chococatpin.webp'),

-- Badtz-Maru (cat 8) ids 30-33
(8, 'Badtz-Maru Plush',           'Mischievous Badtz-Maru penguin with spiky hair, 20cm.',      44.99, 14, 'images/badtz-maru.webp'),
(8, 'Badtz-Maru Keychain',        'Badtz-Maru rubber expression keychain.',                     15.99, 30, 'images/badtz-marucharm.webp'),
(8, 'Badtz-Maru Figurine',        'Badtz-Maru collectible PVC figurine, 10cm.',                 59.99, 10, 'images/badtz-marufigurine.webp'),
(8, 'Badtz-Maru Badgepin',        'Badtz-Maru steel pin.',                                       5.99, 40, 'images/badtz-marupin.jpg'),

-- Pochacco (cat 9) ids 34-37
(9, 'Pochacco Plush',             'Sporty white Pochacco puppy plush, 22cm.',                    43.99, 16, 'images/pochacco.webp'),
(9, 'Pochacco Keychain',          'Pochacco rubber keychain charm.',                             14.99, 35, 'images/pochaccocharm.webp'),
(9, 'Pochacco Figurine',          'Pochacco collectible PVC figurine, 8cm.',                     59.99, 12, 'images/pochaccofigurine.jpg'),
(9, 'Pochacco Pin',               'Pochacco small steel pin.',                                    5.99, 12, 'images/pochaccopin.jpg'),

-- Collabs (cat 10) ids 39-41
(10, 'Hatsune Miku x Cinnamoroll Figurine Vol.1', 'Collab figurine vol.1 -- teal & sky blue editions.', 89.99, 10, 'images/HatsuneMikuCinnamonRoll.webp'),
(10, 'Hatsune Miku x Cinnamoroll Figurine Vol.2', 'Collab figurine vol.2 -- bow & clouds editions.',    74.99,  8, 'images/HatsuneMikuxCinnamoroll(2).webp'),
(10, 'Hatsune Miku x Cinnamoroll Figurine Vol.3', 'Collab figurine vol.3 -- black & school editions.',  74.99,  8, 'images/HatsuneMikuxCinnamoroll(3).webp'),
(10, 'Keroppi Funko POP Figurine',                'Keroppi Funko POP collectible.', 69.99, 8, 'images/keroppifigurine.webp'),

-- Character Mix (cat 11) ids 42-45
(11, 'Sanrio Sticker Pack',               'Sanrio sticker pack vol. 1.',                         9.99, 30, 'images/stickerpack.webp'),
(11, 'Sanrio Art Print A3',               'Official Sanrio A3 art print.',                      24.99, 20, 'images/print.jpg'),
(11, 'Sanrio Sticker Pack Vol. 2',        'Sanrio sticker pack vol. 2.',                         9.99, 30, 'images/stickerpack(2).webp'),
(11, 'Sanrio Art Print A3 Sweet Edition', 'Official Sanrio A3 art print -- Sweet Edition.',     24.99, 20, 'images/print(2).jpg');
