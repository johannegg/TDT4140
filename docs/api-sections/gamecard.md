# Game card API

Click [here](../rest-api.md) to go back to the API documentation overview.

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