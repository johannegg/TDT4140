# Notification API

Click [here](../README.md) to go back to the API documentation overview.

Requests to any endpoint must have http://localhost:8080/api as the URI prefix. 

## /notification/get/user/{username}

Fetches all received notifications about gamecards for the user that is logged, sorted by most recent. Requires cached JWT token with user permissions.

- method: GET
- role: user
- headers:
  - 'Authorization': 'Bearer \<cached-JWT-token>'
- path variables: 
  - username (type: String), [cached username value]
- parameters: none
- statuscodes: [200, 401, 404]
- response: 
    - 200: array of notification information objects
    - 401: not a user
    - 404: user not found

## /notification/send

Sends a new notification about a gamecard to the given receiver. The same as "sharing" a gamecard with the receiver, where the user that is logged in becomes the sender. Requires cached JWT token with user permissions.

- method: POST
- role: user
- headers: 
  - 'Content-Type': 'application/json'
  - 'Authorization': 'Bearer \<cached-JWT-token>'
- path variables: none
- parameters:
  - sender (type: String), [cached username value]
  - receiver (type: String), [min 3 chars, max 20 chars]
  - gameCardId (type: int), [min 1]
  - comment (type: String), [max 300 chars]
- statuscodes [200, 400, 401, 409, 500]
- response:
  - 200: success message
  - 400: invalid request body input or sender = receiver
  - 401: not a user
  - 409: entry already exists
  - 500: something went wrong on the server