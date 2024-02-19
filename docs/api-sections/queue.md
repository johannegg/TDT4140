# Queue API

Click [here](../rest-api.md) to go back to the API documentation overview.

Requests to any endpoint must have http://localhost:8080/api as the URI prefix. 

## /queue/get/{username}

Fetches all game cards in queue, sorted in order of when they were added to the queue.

- method: GET
- role: none
- headers: none
- path variables: 
  - username (type: String) [cached username value]
- parameters: none
- statuscodes: [200, 404]
- response: 
    - 200: array of game card objects in the queue
    - 404: no cards with the given id

## /queue/add

Adds a new game card to the user's queue. Requires cached JWT token with user permissions.

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
  - 409: entry already exists
  - 500: something went wrong on the server


## /queue/remove

Removes a game card from the user's queue. Requires cached JWT token with user permissions.

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
  - 404: the game card does not exist in the queue
  - 500: something went wrong on the server


