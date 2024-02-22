# Rating API

Click [here](../rest-api.md) to go back to the API documentation overview.

Requests to any endpoint must have http://localhost:8080/api as the URI prefix. 

## /rating/get/gamecard/{gamecardID}

Fetches all rating data related to a specific game card, sorted by score.

- method: GET
- role: none
- headers: none
- path variables: 
  - gamecardID (type: int) [min 1]
- parameters: none
- statuscodes: [200, 404]
- response: 
    - 200: array of rating information objects
    - 404: no cards with the given id

## /rating/get/user/{username}

Fetches all rating data from a specific user.

- method: GET
- role: none
- headers: none
- path variables: 
  - username (type: String) [not blank]
- parameters: none
- statuscodes: [200, 404]
- response: 
    - 200: array of rating information objects
    - 404: no user with the given username

## /rating/add

Adds a new rating to a game card. Requires cached JWT token with user permissions.

- method: PUT
- role: user
- headers: 
  - 'Content-Type': 'application/json'
  - 'Authorization': 'Bearer \<cached-JWT-token>',
- path variables: none
- parameters:
  - score (type: int), [min 1, max 5]
  - comment (type: String), [max 500 chars]
  - gameCardId (type: int), [min 1]
  - username (type: String), [cached username value]
- statuscodes [200, 400, 401, 409, 500]
- response:
  - 200: success message
  - 400: invalid request body input
  - 401: not a user
  - 409: entry already exists
  - 500: something went wrong on the server

## /rating/delete/{gamecardID}/{username}

Deletes a specific rating on a game card from a given user. Requires cached JWT token with moderator permissions.

- method: DELETE
- role: moderator
- headers: none
- path variables: 
  - username (type: String) [not blank]
- parameters: none
- statuscodes: [200, 401, 404, 500]
- response: 
    - 200: success message
    - 401: not a moderator
    - 404: user not found or game card not found
    - 500: something went wrong on the server