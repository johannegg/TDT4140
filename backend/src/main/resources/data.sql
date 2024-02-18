-- Roles standard data
INSERT IGNORE INTO
    roles (name)
VALUES ('ROLE_USER'),
    ('ROLE_MODERATOR'),
    ('ROLE_ADMIN');

-- Users standard data
INSERT IGNORE INTO
    users (username, email, password)
VALUES (
        'adminuser', 'adminuser@gmail.com', '$2a$10$OI75566u2Zln7oE1WcmHr.p19fY7R23aMAvV5x8TGH.6N6G2hr4dG'
    ),
    (
        'moduser', 'moduser@gmail.com', '$2a$10$DhqAgwEixJJ7Dh5MO0Z85OaIr/FD58ROSNLHL5568MCJFUyoXhNNm'
    ),
    (
        'normaluser', 'normaluser@gmail.com', '$2a$10$zo.S3Th9HIdxkEegDiZCFOl8lHq/ZHg0iE7X8q3brrOdk9/bCKC26'
    );

-- Assign roles to users
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

-- Categories standard data
INSERT IGNORE INTO
    categories (name)
VALUES ('Familie'),
    ('Fest'),
    ('Barn'),
    ('Innendørs'),
    ('Utendørs'),
    ('Quiz'),
    ('Musikkquiz'),
    ('Student'),
    ('Individuell'),
    ('Teambuilding');

-- Gamecards standard data
INSERT IGNORE INTO
    gamecards (
        title, description, rules, username, average_rating
    )
VALUES (
        'Beer pong', 'Treff ballen i 10 glass', 'To lag steller seg på hver sin ende av et bord. 
Hvert lag har 6 eller 10 glass med valgfri drikke plassert som en triangel (slik som i bowling). 
Lagene skal etter tur kaste ballen og treffe i motstanderens glass. 
Når et lag treffer, skal glasset fjernes og innholdet må drikkes opp. 
Det lage som treffer alle glassene til motstanderen først vinner.', 'adminuser', 4.5
    );

INSERT IGNORE INTO
    gamecards (
        title, description, rules, username, average_rating
    )
VALUES (
        'Cider pong', 'Treff ballen i 10 glass', 'To lag steller seg på hver sin ende av et bord.
Hvert lag har 6 eller 10 glass med valgfri drikke plassert som en triangel (slik som i bowling). 
Lagene skal etter tur kaste ballen og treffe i motstanderens glass.
Når et lag treffer, skal glasset fjernes og innholdet må drikkes opp.
Det lage som treffer alle glassene til motstanderen først vinner.', 'normaluser', 2.5
    );

-- Assign categories to gamecards
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

-- Ratings standard data for users and gamecards
INSERT IGNORE INTO
    ratings (
        score, comment, user_id, gamecard_id
    )
VALUES (4, 'Great game!', 1, 1),
    (5, 'Awesome!', 2, 1),
    (3, 'Not bad.', 3, 2),
    (2, NULL, 1, 2);