# Game card API

Click [here](../README.md) to go back to the API documentation overview.

Requests to any endpoint must have http://localhost:8080/api as the URI prefix. 

## /gamecard/get/id/{id}

Fetches game card data from a given game card id.

- method: GET
- role: none
- headers: none
- path variables: 
  - id (type: int) [min 1]
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

Fetches game card data for all game cards in the database, sorted by rating.

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

## /gamecard/get/categories

Fetches game card data filtered by given categories (union operation), sorted by rating.

- method: POST
- role: none
- headers: 
  - 'Content-Type': 'application/json'
- path variables: none
- parameters: 
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
- statuscodes: [200]
- response: 
    - 200: array of game card information objects

### Example 1: Successful fetch

Request:

```
{
    "categories": [
        "Familie",
        "Quiz"
    ]
}
```

Response (200):
```
[
    {
        "id": 7,
        "title": "Cider pong",
        "rules": "To lag steller seg på hver sin ende av et bord.\nHvert lag har 6 eller 10 glass med valgfri drikke plassert som en triangel (slik som i bowling). \nLagene skal etter tur kaste ballen og treffe i motstanderens glass.\nNår et lag treffer, skal glasset fjernes og innholdet må drikkes opp.\nDet lage som treffer alle glassene til motstanderen først vinner.",
        "description": "Treff ballen i 10 glass",
        "username": "normaluser",
        "averageRating": null,
        "categories": [
            "Fest",
            "Familie"
        ]
    },
    {
        "id": 5,
        "title": "Test game",
        "rules": "Rules",
        "description": "Desc",
        "username": "normaluser",
        "averageRating": null,
        "categories": [
            "Fest",
            "Quiz",
            "Student"
        ]
    }
]
```

## /gamecard/create

Creates and stores a new game card entry in the database. Requires cached JWT token with user permissions.

- method: PUT
- role: user
- headers: 
  - 'Content-Type': 'application/json'
  - 'Authorization': 'Bearer \<cached-JWT-token>',
- path variables: none
- parameters:
  - title (type: String), [not blank, max 30 chars]
  - description (type: String), [not blank, max 500 chars]
  - rules (type: String), [not blank, max 100 chars]
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
- statuscodes [200, 400, 401, 409, 500]
- response:
  - 200: success message
  - 400: invalid request body values
  - 401: not a user
  - 409: card already exists
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
    "message": "Game card created successfully!"
}
```

### Example 2: Empty description
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
Response (400):
```
{
    "message": "Error: Description must not be blank"
}
```

### Example 3: Not logged in
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

### Example 4: Title already in use
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
Response (409):
```
{
    "message": "Error: Game card already exists"
}
```

## /gamecard/update

Updates an existing game card entry in the database, selected by id. Requires cached JWT token with moderator permissions.

- method: PUT
- role: moderator
- headers: 
  - 'Content-Type': 'application/json'
  - 'Authorization': 'Bearer \<cached-JWT-token>',
- path variables: none
- parameters:
  - id (type: int) [min 1]
  - title (type: String), [not blank, max 30 chars]
  - description (type: String), [not blank, max 500 chars]
  - rules (type: String), [not blank, max 100 chars]
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
- statuscodes [200, 400, 401, 404, 409, 500]
- response:
  - 200: success message
  - 400: invalid request body values
  - 401: not a moderator
  - 404: game card with given id not found
  - 409: new title already taken
  - 500: something went wrong on the server
- statuscodes [200, 400, 404, 401, 500]

### Example 1: Successful update
Request:
```
{
    "id": "3",
    "title": "Test Game",
    "description": "Updated description",
    "rules": "Updated rules",
    "categories": [
        "Familie"
    ]
}
```
Response (200):
```
{
    "message": "Game card updated successfully!"
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
Response (409):
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
    "id": "3",
    "title": "Test Game",
    "description": "",
    "rules": "Test rules",
    "categories": [
        "Familie"
    ]
}
```
Response (400):
```
{
    "message": "Error: Description must not be blank"
}
```

### Example 5: User but not moderator
Request:
```
{
    "id": "4",
    "title": "Test Game",
    "description": "Updated description",
    "rules": "Updated rules",
    "categories": [
        "Familie"
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

Deletes an existing entry in the database, selected by id. Requires cached JWT token with moderator permissions.

- method: DELETE
- role: moderator
- headers: 
  - 'Content-Type': 'application/json'
  - 'Authorization': 'Bearer \<cached-JWT-token>',
- path variables: 
  - id (type: int) [min 1]
- parameters: none
- statuscodes [200, 401, 404, 500]
- response:
  - 200: success message
  - 401: not a moderator
  - 404: game card entry not be found
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

Deletes an existing entry in the database, selected by title. Requires cached JWT token with moderator permissions.

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