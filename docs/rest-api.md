# Icebreaker API

This document explains the correct usage of all endpoints offered by the Icebreaker REST API. We will list the HTTP method required, any headers required, the input parameters and format, and corresponding the return values. Examples of possible request and response bodies types are also listed for each endpoint (under the assumption that the requests actually reach and are processed by the Spring Boot based REST server).

Endpoints that require any form of authentication must use a valid JWT token (generated in the /auth/signin endpoint). Any frontend that wants to access these endpoints should cache the JWT token locally upon signin. It might be a good idea to cache the roles assigned to the user, to selectively render content based on roles. The username of the signin is also required for some endpoints, so cache this as well.

It is worth noting that some reponses with statuscode 401 might have another root cause on the server, such as request body validation (400), which is then bubbled up to the authentication handler when the request fails (401). To avoid these errors, ensuring valid request body input is vital; read the documentation in detail when making new fetch request methods towards the endpoints.

Requests to any endpoint must have http://localhost:8080/api as the URI prefix. 

## /auth/signup

Signs up a new user with the given user credentials.

- method: POST
- role: none
- headers: 
  - 'Content-Type': 'application/json'
- path variables: none
- parameters:
  - username (type: String), [minimum 3 characters, maximum 20 characters]
  - email (type: String), [email formatting, maximum 50 characters]
  - password (type: String), [minimum 6 characters, maximum 40 characters, must contain at least one uppercase letter and at least one digit]
- statuscodes [200, 400, 401]
- response:
  - 200: success message
  - 400: entry already exists
  - 401: invalid request body

### Example 1: Successful signup
Request:
```
{
    "username": "newuser",
    "email": "newuser@gmail.com",
    "password": "Passw0rd"
}
```
Response (200):
```
{
    "message": "User registered successfully!"
}
```

### Example 2: Username not available
Request:
```
{
    "username": "newuser",
    "email": "newuser2@gmail.com",
    "password": "Passw0rd"
}
```
Response (400):
```
{
    "message": "Error: Username is already taken!"
}
```

### Example 3: Invalid request parameter
Request:
```
{
    "username": "newuser2",
    "email": "",
    "password": "Passw0rd"
}
```
Response (401):
```
{
    "path": "/error",
    "error": "Unauthorized",
    "message": "Full authentication is required to access this resource",
    "status": 401
}
```

## /auth/signin

Signs in a user with the given user credentials

- method: POST
- role: none
- headers: 
  - 'Content-Type': 'application/json'
- path variables: none
- parameters:
  - username (type: String), [not blank]
  - password (type: String), [not blank]
- statuscodes: [200, 401]
- response: 
    - 200: user information and generated JWT access token
    - 401: invalid request body or credentials

### Example 1: Successful signin
Request:
```
{
    "username": "moduser",
    "password": "mod"
}
```
Response (200):
```
{
    "id": 2,
    "username": "moduser",
    "email": "moduser@gmail.com",
    "roles": [
        "ROLE_MODERATOR",
        "ROLE_USER"
    ],
    "accessToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtb2R1c2VyIiwiaWF0IjoxNzA3OTA3MzgzLCJleHAiOjE3MDc5OTM3ODN9.WvgwCgrcwIVQ_B7SOA2DeMEabs6-2dSpo9qSjJ094Bw",
    "tokenType": "Bearer"
}
```
### Example 2: Invalid credentials
Request:
```
{
    "username": "moduserr",
    "password": "mod"
}
```
Response (401):
```
{
    "path": "/api/auth/signin",
    "error": "Unauthorized",
    "message": "Bad credentials",
    "status": 401
}
```

## /gamecard/get/id/{id}

Fetches game card data from a given game card id.

- method: GET
- role: none
- headers: none
- path variables: 
  - id (type: int) [minimum value of 1]
- parameters: none
- statuscodes: [200, 404]
- response: 
    - 200: game card information object
    - 404: no cards with the given id

### Example 1: Successful fetch
Path variable: id = 6

Response (200):
```
{
    "id": 6,
    "title": "Test Game",
    "rules": "Example ruleset.\nRule 1.\nRule 2.",
    "description": "Example description.",
    "username": "normaluser",
    "averageRating": null,
    "categories": [
        "Quiz",
        "Fest"
    ]
}
```

### Example 2: Card does not exist
Path variable: id = 7

Response (404):
```
{
    "message": "Error: Game card not found"
}
```

## /gamecard/get/title/{title}

Fetches game card data from a given game card title.

- method: GET
- role: none
- headers: none
- path variables: 
  - title (type: String) [not blank]
- parameters: none
- statuscodes: [200, 404]
- response: 
    - 200: game card information object
    - 404: no cards with the given title

### Example 1: Successful fetch
Path variable: title = "Test Game"

Response (200):
```
{
    "id": 6,
    "title": "Test Game",
    "rules": "Example ruleset.\nRule 1.\nRule 2.",
    "description": "Example description.",
    "username": "normaluser",
    "averageRating": null,
    "categories": [
        "Quiz",
        "Fest"
    ]
}
```

### Example 2: Card does not exist
Path variable: title = "Test Game 2"

Response (404):
```
{
    "message": "Error: Game card not found"
}
```

## /gamecard/get/all

Fetches game card data for all game cards in the database.

- method: GET
- role: none
- headers: none
- path variables: none
- parameters: none
- statuscodes: [200]
- response: 
    - 200: array of game card information objects

### Example 1: Successful fetch
Response (200):
```
[
    {
        "id": 1,
        "title": "Beer pong",
        "rules": "To lag steller seg på hver sin ende av et bord. \nHvert lag har 6 eller 10 glass med valgfri drikke plassert som en triangel (slik som i bowling). \nLagene skal etter tur kaste ballen og treffe i motstanderens glass. \nNår et lag treffer, skal glasset fjernes og innholdet må drikkes opp. \nDet lage som treffer alle glassene til motstanderen først vinner.",
        "description": "Treff ballen i 10 glass",
        "username": "adminuser",
        "averageRating": null,
        "categories": [
            "Fest"
        ]
    },
    {
        "id": 2,
        "title": "Cider pong",
        "rules": "To lag steller seg på hver sin ende av et bord.\nHvert lag har 6 eller 10 glass med valgfri drikke plassert som en triangel (slik som i bowling). \nLagene skal etter tur kaste ballen og treffe i motstanderens glass.\nNår et lag treffer, skal glasset fjernes og innholdet må drikkes opp.\nDet lage som treffer alle glassene til motstanderen først vinner.",
        "description": "Treff ballen i 10 glass",
        "username": "normaluser",
        "averageRating": null,
        "categories": [
            "Fest",
            "Familie"
        ]
    }
]
```

## /gamecard/create

Creates and stores a new game card entry in the database. Requires cached JWT token and username.

- method: PUT
- role: user
- headers: 
  - 'Content-Type': 'application/json'
  - 'Authorization': 'Bearer \<cached-JWT-token>',
- path variables: none
- parameters:
  - title (type: String), [maximum 30 characters]
  - description (type: String), [maximum 500 characters]
  - rules (type: String), [maximum 100 characters]
  - username (type: String), [cached username value]
  - categories (type: Set\<String>), [allowed string entries:
    - "Familie"
    - "Fest"
    - "Barn"
    - "Innendørs"
    - "Utendørs"
    - "Quiz"
    - "Musikkquiz"
    - "Student"
    - "Individuell"
    - "Teambuilding"
]
- statuscodes [200, 400, 401, 500]
- response:
  - 200: success message
  - 400: entry already exists
  - 401: invalid request body or not a user
  - 500: something went wrong on the server

### Example 1: Successful creation
Request:
```
{
    "title": "Test GameCard",
    "description": "Example description.",
    "rules": "Example ruleset.\nRule 1.\nRule 2.",
    "username": "normaluser",
    "categories": [
        "Fest",
        "Quiz",
        "Barn",
        "Individuell"
    ]
}
```
Response (200):
```
{
    "message": "Game card created successfully"
}
```

### Example 2: Title already in use
Request:
```
{
    "title": "Test GameCard",
    "description": "Example description.",
    "rules": "Example ruleset.\nRule 1.\nRule 2.",
    "username": "adminuser",
    "categories": [
        "Fest",
        "Quiz",
        "Barn",
        "Individuell"
    ]
}
```
Response (400):
```
{
    "message": "Error: Game card already exists"
}
```

### Example 3: Empty description
Request:
```
{
    "title": "Test GameCard",
    "description": "",
    "rules": "Example ruleset.\nRule 1.\nRule 2.",
    "username": "adminuser",
    "categories": [
        "Fest",
        "Quiz",
        "Barn",
        "Individuell"
    ]
}
```
Response (401):
```
{
    "path": "/error",
    "error": "Unauthorized",
    "message": "Full authentication is required to access this resource",
    "status": 401
}
```

### Example 4: Not logged in
Request:
```
{
    "title": "Test GameCard",
    "description": "Example description.",
    "rules": "Example ruleset.\nRule 1.\nRule 2.",
    "username": null,
    "categories": [
        "Fest",
        "Quiz",
        "Barn",
        "Individuell"
    ]
}
```
Response (401):
```
{
    "path": "/api/gamecard/create",
    "error": "Unauthorized",
    "message": "Full authentication is required to access this resource",
    "status": 401
}
```

## /gamecard/update

Updates an existing game card entry in the database, selected by id. Requires cached JWT token.

- method: PUT
- role: moderator
- headers: 
  - 'Content-Type': 'application/json'
  - 'Authorization': 'Bearer \<cached-JWT-token>',
- path variables: none
- parameters:
  - id (type: int) [minimum value of 1]
  - title (type: String), [maximum 30 characters]
  - description (type: String), [maximum 500 characters]
  - rules (type: String), [maximum 100 characters]
  - categories (type: Set\<String>), [allowed string entries:
    - "Familie"
    - "Fest"
    - "Barn"
    - "Innendørs"
    - "Utendørs"
    - "Quiz"
    - "Musikkquiz"
    - "Student"
    - "Individuell"
    - "Teambuilding"
]
- statuscodes [200, 400, 404, 401, 500]
- response:
  - 200: success message
  - 400: new title already taken
  - 404: game card with given id not found
  - 401: invalid request body or not a moderator
  - 500: something went wrong on the server

### Example 1: Successful update
Request:
```
{
    "id": "4",
    "title": "Test GameCard",
    "description": "",
    "rules": "Updated rules",
    "categories": [
        "Familie",
        "Fest"
    ]
}
```
Response (200):
```
{
    "path": "/error",
    "error": "Unauthorized",
    "message": "Full authentication is required to access this resource",
    "status": 401
}
```

### Example 2: Title already in use
Request:
```
{
    "id": "4",
    "title": "Beer pong",
    "description": "Updated description",
    "rules": "Updated rules",
    "categories": [
        "Familie",
        "Fest"
    ]
}
```
Response (400):
```
{
    "message": "Error: Game card already exists"
}
```

### Example 3: Card not found
Request:
```
{
    "id": "3",
    "title": "Test GameCard",
    "description": "Updated description",
    "rules": "Updated rules",
    "categories": [
        "Familie",
        "Fest"
    ]
}
```
Response (404):
```
{
    "message": "Error: Game card not found"
}
```

### Example 4: Empty description
Request:
```
{
    "id": "4",
    "title": "Test GameCard",
    "description": "",
    "rules": "Updated rules",
    "categories": [
        "Familie",
        "Fest"
    ]
}
```
Response (401):
```
{
    "path": "/error",
    "error": "Unauthorized",
    "message": "Full authentication is required to access this resource",
    "status": 401
}
```

### Example 5: User but not moderator
Request:
```
{
    "id": "4",
    "title": "Test GameCard",
    "description": "Updated description",
    "rules": "Updated rules",
    "categories": [
        "Familie",
        "Fest"
    ]
}
```
Response (401):
```
{
    "path": "/error",
    "error": "Unauthorized",
    "message": "Full authentication is required to access this resource",
    "status": 401
}
```

## /gamecard/delete/id/{id}

Deletes an existing entry in the database, selected by id. Requires cached JWT token.

- method: DELETE
- role: moderator
- headers: 
  - 'Content-Type': 'application/json'
  - 'Authorization': 'Bearer \<cached-JWT-token>',
- path variables: 
  - id (type: int) [minimum value of 1]
- parameters: none
- statuscodes [200, 404, 401, 500]
- response:
  - 200: success message
  - 404: game card entry not be found
  - 401: not a moderator
  - 500: something went wrong on the server

### Example 1: Successful deletion
Path variable: id = 4

Response (200):
```
{
    "message": "Game card deleted successfully"
}
```

### Example 2: Card not found
Path variable: id = 5

Response (404):
```
{
    "message": "Error: Game card not found"
}
```

### Example 3: User but not moderator
Path variable: id = 4

Response (401):
```
{
    "path": "/error",
    "error": "Unauthorized",
    "message": "Full authentication is required to access this resource",
    "status": 401
}
```

## /gamecard/delete/title/{title}

Deletes an existing entry in the database, selected by title. Requires cached JWT token.

- method: DELETE
- role: moderator
- headers: 
  - 'Content-Type': 'application/json'
  - 'Authorization': 'Bearer \<cached-JWT-token>',
- path variables: 
  - title (type: String) [not blank]
- parameters: none
- statuscodes [200, 404, 401, 500]
- response:
  - 200: success message
  - 404: game card entry not be found
  - 401: not a moderator
  - 500: something went wrong on the server

### Example 1: Successful deletion
Path variable: title = "Test GameCard"

Response (200):
```
{
    "message": "Game card deleted successfully"
}
```

### Example 2: Card not found
Path variable: title = "Test GameCard 2"

Response (404):
```
{
    "message": "Error: Game card not found"
}
```

### Example 3: User but not moderator
Path variable: title = "Test GameCard"

Response (401):
```
{
    "path": "/error",
    "error": "Unauthorized",
    "message": "Full authentication is required to access this resource",
    "status": 401
}
```