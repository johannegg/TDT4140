# Queue API

Click [here](../rest-api.md) to go back to the API documentation overview.

Requests to any endpoint must have http://localhost:8080/api as the URI prefix. 

## /queue/get/all/{username}

Fetches all game cards in queue, sorted in order of when they were added to the queue. Requires cached JWT token with user permissions.

- method: GET
- role: user
- headers: 
  - 'Authorization': 'Bearer \<cached-JWT-token>'
- path variables: 
  - username (type: String) [cached username value]
- parameters: none
- statuscodes: [200, 401, 404]
- response: 
    - 200: array of game card objects in the queue
    - 401: not a user
    - 404: no cards with the given id

## /queue/check

Checks whether or not a given card is in the queue of a given user, returns a boolean. Requires cached JWT token with user permissions.

- method: POST
- role: user
- headers: 
  - 'Content-Type': 'application/json'
  - 'Authorization': 'Bearer \<cached-JWT-token>'
- path variables: none
- parameters:
  - gameCardId (type: int), [min 1]
  - username (type: String), [cached username value]
- statuscodes [200, 400, 401, 404, 500]
- response:
  - 200: boolean for if the card is in the user's queue or not
  - 400: invalid request body input
  - 401: not a user
  - 404: user or card not found
  - 500: something went wrong on the server

## /queue/toggle

Add or remove a given card from the user's queue. Requires cached JWT token with user permissions.

- method: POST
- role: user
- headers: 
  - 'Content-Type': 'application/json'
  - 'Authorization': 'Bearer \<cached-JWT-token>'
- path variables: none
- parameters:
  - gameCardId (type: int), [min 1]
  - username (type: String), [cached username value]
- statuscodes [200, 400, 401, 404, 500]
- response:
  - 200: success message
  - 400: invalid request body input
  - 401: not a user
  - 404: user or card not found
  - 500: something went wrong on the server