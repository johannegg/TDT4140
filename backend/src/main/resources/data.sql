-- Insert roles if they don't exist
INSERT IGNORE INTO roles (name) VALUES ('ROLE_USER');

INSERT IGNORE INTO roles (name) VALUES ('ROLE_MODERATOR');

INSERT IGNORE INTO roles (name) VALUES ('ROLE_ADMIN');

-- Insert users if they don't exist
INSERT IGNORE INTO
    users (username, email, password)
VALUES (
        'adminuser', 
        'adminuser@gmail.com', 
        '$2a$10$8IV1I9l0J8rJZdjamP5KsuNPemjs2Kz8serb2xf0LPvAAsKsz9o8.'
    );

INSERT IGNORE INTO
    users (username, email, password)
VALUES (
        'moduser', 
        'moduser@gmail.com', 
        '$2a$10$rOdRyR8c2A9HyfFMuJs5rOxoJjZoFwtGoj5qZnMfyaK.WF8liuEt.'
    );

INSERT IGNORE INTO
    users (username, email, password)
VALUES (
        'normaluser', 
        'normaluser@gmail.com', 
        '$2a$10$VOVQVfwa7TPx.w.axw9VcutfyTmUXUGPfR/t6lh.mXYrNvfHiA2Dm'
    );

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
    AND r.name = 'ROLE_USER';

INSERT IGNORE INTO
    user_roles (user_id, role_id)
SELECT u.id, r.id
FROM users u, roles r
WHERE
    u.username = 'moduser'
    AND r.name = 'ROLE_MODERATOR';

INSERT IGNORE INTO
    user_roles (user_id, role_id)
SELECT u.id, r.id
FROM users u, roles r
WHERE
    u.username = 'adminuser'
    AND r.name = 'ROLE_USER';

INSERT IGNORE INTO
    user_roles (user_id, role_id)
SELECT u.id, r.id
FROM users u, roles r
WHERE
    u.username = 'adminuser'
    AND r.name = 'ROLE_MODERATOR';

INSERT IGNORE INTO
    user_roles (user_id, role_id)
SELECT u.id, r.id
FROM users u, roles r
WHERE
    u.username = 'adminuser'
    AND r.name = 'ROLE_ADMIN';