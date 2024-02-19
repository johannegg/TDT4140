# Favorites API

Click [here](../rest-api.md) to go back to the API documentation overview.

Requests to any endpoint must have http://localhost:8080/api as the URI prefix. 

## /favorites/get/{username}

Fetches all favorite game cards for a given user.

- method: GET
- role: none
- headers: none
- path variables: 
  - username (type: String) [cached username value]
- parameters: none
- statuscodes: [200, 404]
- response: 
    - 200: array of favorite game card objects
    - 404: no cards with the given id

## /favorites/add

Adds a new game card to the user's favorites. Requires cached JWT token with user permissions.

- method: POST
- role: user
- headers: 
  - 'Content-Type': 'application/json'
  - 'Authorization': 'Bearer \<cached-JWT-token>',
- path variables: none
- parameters:
  - gameCardId (type: int), [min 1]
  - username (type: String), [cached username value]
- statuscodes [200, 400, 401, 409, 500]
- response:
  - 200: success message
  - 400: invalid request body input
  - 401: not a user
  - 409: game card already favorited
  - 500: something went wrong on the server


## /favorites/remove

Removes a game card from the user's favorites. Requires cached JWT token with user permissions.

- method: POST
- role: user
- headers: 
  - 'Content-Type': 'application/json'
  - 'Authorization': 'Bearer \<cached-JWT-token>',
- path variables: none
- parameters:
  - gameCardId (type: int), [min 1]
  - username (type: String), [cached username value]
- statuscodes [200, 400, 401, 404, 500]
- response:
  - 200: success message
  - 400: invalid request body input
  - 401: not a user
  - 404: the game card was not found as favorited
  - 500: something went wrong on the server
