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
WHERE (
        u.username = 'normaluser'
        AND r.name = 'ROLE_USER'
    )
    OR (
        u.username = 'moduser'
        AND r.name IN ('ROLE_USER', 'ROLE_MODERATOR')
    )
    OR (
        u.username = 'adminuser'
        AND r.name IN (
            'ROLE_USER', 'ROLE_MODERATOR', 'ROLE_ADMIN'
        )
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
        'Beer pong', 'Kast deg inn i en klassisk festfavoritt med dette utfordrende øl-pongspillet!', 'To lag stiller seg på hver sin ende av et bord. 
Hvert lag har 6 eller 10 glass med valgfri drikke plassert som en triangel (slik som i bowling). 
Lagene skal etter tur kaste ballen og treffe i motstanderens glass. 
Når et lag treffer, skal glasset fjernes og innholdet må drikkes opp. 
Det laget som treffer i alle glassene til motstanderen først vinner.', 'adminuser', 4.0
    ),
    (
        'Dance-Off', 'Et energisk og underholdende innendørsspill der deltakerne konkurrerer i danseferdigheter.', 'Deltakerne danner grupper og improviserer dansekoreografier basert på forskjellige musikksjangre. 
En jury eller publikum stemmer på de beste forestillingene.', 'adminuser', null
    ),
    (
        'To sannheter og en løgn', 'Del "fakta" om deg selv og la de andre gjette om er sant!', 'Hver deltaker presenterer tre påstander om seg selv, hvorav to er sanne og en er falsk. 
Resten av gruppen skal gjette hvilken påstand som er løgn.', 'normaluser', null
    ),
    (
        'Gjett melodien', 'Test musikkunnskapen din med dette morsomme gjetteleken!', 'Spillerne hører på korte klipp av sanger og prøver å gjette tittelen og artisten. 
Spilleren med flest riktige gjetninger vinner.', 'moduser', null
    ),
    (
        'Team Trivia Trek', 'Et teambasert trivia-spill som tester deltakernes kunnskap om ulike emner.', 'Deltakerne deles inn i lag og konkurrerer mot hverandre for å svare på trivia-spørsmål. 
Laget med flest poeng vinner.', 'moduser', null
    ),
    (
        'Babels tårn', 'Bygg det høyeste tårnet!', 'Bygg et så høyt tårn som mulig ved å sette sammen spaghetti og marshmallows.
Du har 3 minutter.
På slutten av tiden har ingen lov til å holde eller berøre tårnet, og det er heller ikke lov å lene seg mot noe.
Høyeste vinner!', 'normaluser', 5.0
    ),
    (
        'Flytt vann', 'Flytt så mye vann du kan!', 'Plasser to bøtter, en fylt med vann og en tom. 
Plasser et sett med hjelpemidler ved siden av den fylte bøtta, for eksempel svamp, kopp, skje, osv.
Deltakerne må flytte vannet fra den fylte bøtta til den tomme bøtta ved hjelp av de valgte hjelpemidlene. 
Du må ikke røre eller flytte noen av bøttene. 
Laget som flytter mest vann vinner. 
Du har 3 minutter.', 'normaluser', null
    ),
    (
        'Kjenn smaken', 'Gjett hva du spiser!', 'Deltakerne får bind for øynene og smaker på forskjellige matvarer.
De må gjette hva de spiser.
Flest riktige gjetninger vinner.', 'normaluser', 1
    ),
    (
        'Kast ring', 'Kast ringen på pinnen!', 'Plasser en stol i midten av rommet og en ring på gulvet rundt stolen.
Deltakerne skal kaste ringen og treffe pinnen som står i midten av stolen.
Flest treff vinner.', 'normaluser', 4.0
    ),
    (
        'Spark av skoen', 'Test skuddferdighetene dine!', 'Deltakerne skal sparke av skoen og treffe et bestemt mål. 
Det deles inn i lag. 
Laget med flest treff oppi bøtta på 2 minutt vinner.', 'adminuser', null
    ),
    (
        'Mariekjeks', 'Spis kjeks og løp fort!', 'Hvert lag stiller seg i rekkefølge.
Den fremste fra hvert lag løper til et bord og spiser f. eks. fire kjeks, og løper tilbake og veksler med nestemann. 
Det laget som først har fått alle sine deltakere i mål vinner.', 'moduser', 3.5
    ),
    (
        'En som begynner med', 'Skriv ord innenfor en kategori som starter med riktig bokstav.', 'En utvalgt person på gruppa bestemmer 5 kategorier, for eksempel dyr, sport, bilmerke osv.
Hvert lag må da skrive ned kategoriene på sitt eget papir. 
Den samme personen som bestemte kategoriene sier en bokstav, f.eks. S og så må alle skrive et ord som begynner med S innenfor de valgte kategoriene. 
For eksempel et land (Sverige), et dyr (Skilpadde) og en sport (Skiskyting), etc. 
Lagene har bare 45 sekunder! 
Har to lag svart likt får du 1 poeng, er du alene med svaret ditt får du 2 poeng. 
Har du ikke skrevet noe får du 0 poeng.', 'moduser', null
    );

-- Assign categories to gamecards
INSERT IGNORE INTO
    gamecard_category (gamecard_id, category_id)
SELECT g.id, c.id
FROM gamecards g, categories c
WHERE (
        g.title = 'Beer pong'
        AND c.name IN (
            'Fest', 'Innendørs', 'Utendørs', 'Student'
        )
    )
    OR (
        g.title = 'Dance-Off'
        AND c.name IN (
            'Fest', 'Innendørs', 'Teambuilding'
        )
    )
    OR (
        g.title = 'To sannheter og en løgn'
        AND c.name IN (
            'Teambuilding', 'Fest', 'Student', 'Innendørs'
        )
    )
    OR (
        g.title = 'Gjett Melodien'
        AND c.name IN (
            'Musikkquiz', 'Innendørs', 'Individuell'
        )
    )
    OR (
        g.title = 'Team Trivia Trek'
        AND c.name IN (
            'Student', 'Quiz', 'Teambuilding', 'Innendørs'
        )
    )
    OR (
        g.title = 'Babels tårn'
        AND c.name IN (
            'Individuell', 'Teambuilding', 'Student', 'Innendørs'
        )
    )
    OR (
        g.title = 'Flytt vann'
        AND c.name IN (
            'Utendørs', 'Teambuilding', 'Student', 'Individuell'
        )
    )
    OR (
        g.title = 'Kjenn smaken'
        AND c.name IN (
            'Familie', 'Barn', 'Teambuilding', 'Student', 'Innendørs'
        )
    )
    OR (
        g.title = 'Kast ring'
        AND c.name IN (
            'Barn', 'Familie', 'Teambuilding', 'Innendørs'
        )
    )
    OR (
        g.title = 'Spark av skoen'
        AND c.name IN (
            'Utendørs', 'Teambuilding', 'Student', 'Barn', 'Familie'
        )
    )
    OR (
        g.title = 'Mariekjeks'
        AND c.name IN (
            'Student', 'Teambuilding', 'Utendørs'
        )
    )
    OR (
        g.title = 'En som begynner med'
        AND c.name IN (
            'Innendørs', 'Student', 'Teambuilding'
        )
    );

-- Ratings standard data for users and gamecards
INSERT IGNORE INTO
    ratings (
        score, comment, user_id, gamecard_id, timestamp
    )
SELECT 4, 'Gøy!', u.id, g.id, '2024-02-16 18:25:06.820740'
FROM users u, gamecards g
WHERE
    u.username = 'adminuser'
    AND g.title = 'Beer pong'
UNION ALL
SELECT 5, 'Fantastisk!', u.id, g.id, '2024-02-16 18:25:12.820740'
FROM users u, gamecards g
WHERE
    u.username = 'moduser'
    AND g.title = 'Beer pong'
UNION ALL
SELECT 3, 'Helt ok.', u.id, g.id, '2024-02-16 18:40:18.820740'
FROM users u, gamecards g
WHERE
    u.username = 'normaluser'
    AND g.title = 'Beer pong'
UNION ALL
SELECT 5, 'Dette var gøy!', u.id, g.id, '2024-02-16 18:25:24.820740'
FROM users u, gamecards g
WHERE
    u.username = 'adminuser'
    AND g.title = 'Mariekjeks'
UNION ALL
SELECT 2, NULL, u.id, g.id, '2024-02-16 18:25:32.820740'
FROM users u, gamecards g
WHERE
    u.username = 'moduser'
    AND g.title = 'Mariekjeks'
UNION ALL
SELECT 1, 'Dårlig, alle mobba meg :(', u.id, g.id, '2024-02-16 18:25:38.820740'
FROM users u, gamecards g
WHERE
    u.username = 'moduser'
    AND g.title = 'Kjenn smaken'
UNION ALL
SELECT 3, 'Meh', u.id, g.id, '2024-02-16 18:25:42.820740'
FROM users u, gamecards g
WHERE
    u.username = 'moduser'
    AND g.title = 'Kast ring'
UNION ALL
SELECT 5, 'Kjempestas med familien', u.id, g.id, '2024-02-16 18:28:06.820740'
FROM users u, gamecards g
WHERE
    u.username = 'adminuser'
    AND g.title = 'Kast ring'
UNION ALL
SELECT 5, 'Nå snakker vi!!', u.id, g.id, '2024-02-16 18:29:06.820740'
FROM users u, gamecards g
WHERE
    u.username = 'moduser'
    AND g.title = 'Babels tårn'
UNION ALL
SELECT 5, 'Gøy!!', u.id, g.id, '2024-02-16 18:30:06.820740'
FROM users u, gamecards g
WHERE
    u.username = 'normaluser'
    AND g.title = 'Babels tårn';

-- Add game cards to user favorites
INSERT IGNORE INTO
    favorites (user_id, gamecard_id)
SELECT u.id, g.id
FROM users u, gamecards g
WHERE (
        u.username = 'normaluser'
        AND (
            g.title = 'Babels tårn'
            OR g.title = 'Beer pong'
            OR g.title = 'Kast ring'
            OR g.title = 'Kjenn smaken'
        )
    )
    OR (
        u.username = 'moduser'
        AND (
            g.title = 'Beer pong'
            OR g.title = 'Babels tårn'
        )
    )
    OR (
        u.username = 'adminuser'
        AND (
            g.title = 'Beer pong'
            OR g.title = 'Kast ring'
            OR g.title = 'Spark av skoen'
        )
    );

-- Add game cards to user queues
INSERT IGNORE INTO
    queue (
        user_id, gamecard_id, order_index
    )
SELECT u.id, g.id, 0
FROM users u, gamecards g
WHERE
    u.username = 'normaluser'
    AND g.title = 'Beer pong'
UNION ALL
SELECT u.id, g.id, 0
FROM users u, gamecards g
WHERE
    u.username = 'moduser'
    AND g.title = 'Flytt vann'
UNION ALL
SELECT u.id, g.id, 1
FROM users u, gamecards g
WHERE
    u.username = 'moduser'
    AND g.title = 'Kjenn smaken';

-- Add game card reports
INSERT IGNORE INTO
    gamecard_reports (
        user_id, gamecard_id, reason, comment
    )
SELECT u.id, g.id, 'UPASSENDE', 'Dette spillet er kanskje ikke passende for barn?'
FROM users u, gamecards g
WHERE
    u.username = 'normaluser'
    AND g.title = 'Beer pong'
UNION ALL
SELECT u.id, g.id, 'UPASSENDE', 'Upassende.'
FROM users u, gamecards g
WHERE
    u.username = 'moduser'
    AND g.title = 'Beer pong'
UNION ALL
SELECT u.id, g.id, 'TERRORISME', 'Verste jeg har vært borti!!'
FROM users u, gamecards g
WHERE
    u.username = 'moduser'
    AND g.title = 'Dance-Off';

-- Add comment reports
INSERT IGNORE INTO
    comment_reports (
        reporting_user_id, gamecard_id, rating_user_id, reason, comment 
    )
SELECT u.id, r.gamecard_id, r.user_id, 'STØTENDE', 'Jeg vil ikke at barna mine skal lese dette!'
FROM users u, ratings r
WHERE
    u.username = 'normaluser'
    AND r.comment = 'Dårlig, alle mobba meg :('
UNION ALL
SELECT u.id, r.gamecard_id, r.user_id, 'UPASSENDE', 'Dette er ikke greit!'
FROM users u, ratings r
WHERE
    u.username = 'moduser'
    AND r.comment = 'Helt ok.';

-- Add notifications
INSERT IGNORE INTO
    notifications (
        sender_id, receiver_id, gamecard_id, comment, timestamp
    )
SELECT u1.id, u2.id, g.id, 'Sjekk ut den her.', '2024-03-14 18:25:06.820740'
FROM users u1, users u2, gamecards g
WHERE
    u1.username = 'normaluser'
    AND u2.username = 'moduser'
    AND g.title = 'Beer pong'
UNION ALL
SELECT u1.id, u2.id, g.id, 'Anbefaler denne!', '2024-03-14 18:25:12.820740'
FROM users u1, users u2, gamecards g
WHERE
    u1.username = 'adminuser'
    AND u2.username = 'moduser'
    AND g.title = 'Mariekjeks'
UNION ALL
SELECT u1.id, u2.id, g.id, 'Dette var gøy!', '2024-03-14 18:25:18.820740'
FROM users u1, users u2, gamecards g
WHERE
    u1.username = 'moduser'
    AND u2.username = 'normaluser'
    AND g.title = 'Kast ring'
UNION ALL
SELECT u1.id, u2.id, g.id, 'Prøv denne, ellers... >:(', '2024-03-14 18:25:26.820740'
FROM users u1, users u2, gamecards g
WHERE
    u1.username = 'adminuser'
    AND u2.username = 'normaluser'
    AND g.title = 'Kast ring'
UNION ALL
SELECT u1.id, u2.id, g.id, 'Verdt å prøve', '2024-03-14 18:25:32.820740'
FROM users u1, users u2, gamecards g
WHERE
    u1.username = 'moduser'
    AND u2.username = 'normaluser'
    AND g.title = 'Babels tårn';