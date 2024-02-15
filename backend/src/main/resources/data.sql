-- Insert roles if they don't exist
INSERT IGNORE INTO roles (name) VALUES 
('ROLE_USER'),
('ROLE_MODERATOR'),
('ROLE_ADMIN');

-- Insert users if they don't exist
-- Insert users if they don't exist
INSERT IGNORE INTO users (username, email, password) VALUES 
('adminuser', 'adminuser@gmail.com', '$2a$10$8IV1I9l0J8rJZdjamP5KsuNPemjs2Kz8serb2xf0LPvAAsKsz9o8.'),
('moduser', 'moduser@gmail.com', '$2a$10$rOdRyR8c2A9HyfFMuJs5rOxoJjZoFwtGoj5qZnMfyaK.WF8liuEt.'),
('normaluser', 'normaluser@gmail.com', '$2a$10$VOVQVfwa7TPx.w.axw9VcutfyTmUXUGPfR/t6lh.mXYrNvfHiA2Dm');

-- Assign roles to users if not already assigned
INSERT IGNORE INTO
    user_roles (user_id, role_id)
SELECT u.id, r.id
FROM users u, roles r
WHERE
    u.username = 'normaluser'
    AND r.name = 'ROLE_USER';

INSERT IGNORE INTO
    user_roles (user_id, role_id)
SELECT u.id, r.id
FROM users u, roles r
WHERE
    u.username = 'moduser'
    AND r.name IN ('ROLE_USER', 'ROLE_MODERATOR');

INSERT IGNORE INTO
    user_roles (user_id, role_id)
SELECT u.id, r.id
FROM users u, roles r
WHERE
    u.username = 'adminuser'
    AND r.name IN (
        'ROLE_USER', 'ROLE_MODERATOR', 'ROLE_ADMIN'
    );

--Gamecard
INSERT IGNORE INTO categories (name) VALUES 
('Familie'),
('Fest'),
('Barn'),
('Innendørs'),
('Utendørs'),
('Quiz'),
('Musikkquiz'),
('Student'),
('Individuell'),
('Teambuilding');

--Add gamecard so they already exists--
INSERT IGNORE INTO
    gamecards (
        title, description, rules, username
    )
VALUES (
        'Beer pong', 'Treff ballen i 10 glass', 'To lag steller seg på hver sin ende av et bord. 
Hvert lag har 6 eller 10 glass med valgfri drikke plassert som en triangel (slik som i bowling). 
Lagene skal etter tur kaste ballen og treffe i motstanderens glass. 
Når et lag treffer, skal glasset fjernes og innholdet må drikkes opp. 
Det lage som treffer alle glassene til motstanderen først vinner.', 'adminuser'
    );

INSERT IGNORE INTO
    gamecards (
        title, description, rules, username
    )
VALUES (
        'Cider pong', 'Treff ballen i 10 glass', 'To lag steller seg på hver sin ende av et bord.
Hvert lag har 6 eller 10 glass med valgfri drikke plassert som en triangel (slik som i bowling). 
Lagene skal etter tur kaste ballen og treffe i motstanderens glass.
Når et lag treffer, skal glasset fjernes og innholdet må drikkes opp.
Det lage som treffer alle glassene til motstanderen først vinner.', 'normaluser'
    );

INSERT IGNORE INTO
    gamecard_category (gamecard_id, category_id)
SELECT g.id, c.id
FROM gamecards g, categories c
WHERE
    g.title = 'Beer pong'
    AND c.name = 'Fest';

INSERT IGNORE INTO
    gamecard_category (gamecard_id, category_id)
SELECT g.id, c.id
FROM gamecards g, categories c
WHERE
    g.title = 'Cider pong'
    AND c.name IN ('Fest', 'Familie');