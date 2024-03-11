# Report API

Click [here](../README.md) to go back to the API documentation overview.

Requests to any endpoint must have http://localhost:8080/api as the URI prefix. 

## /report/get/gamecard

Fetches all report data related for reported game cards. Requires cached JWT token with moderator permissions.

- method: GET
- role: moderator
- headers:
  - 'Authorization': 'Bearer \<cached-JWT-token>'
- path variables: none
- parameters: none
- statuscodes: [200, 401]
- response: 
    - 200: array of game card report information objects
    - 401: not a moderator

## /report/get/comment

Fetches all report data related for reported ratings (comments). Requires cached JWT token with moderator permissions.

- method: GET
- role: moderator
- headers:
  - 'Authorization': 'Bearer \<cached-JWT-token>'
- path variables: none
- parameters: none
- statuscodes: [200, 401]
- response: 
    - 200: array of comment report information objects
    - 401: not a moderator

## /report/send/gamecard

Sends a new game card report with the given parameters. Requires cached JWT token with user permissions.

- method: PUT
- role: user
- headers: 
  - 'Content-Type': 'application/json'
  - 'Authorization': 'Bearer \<cached-JWT-token>',
- path variables: none
- parameters:
  - reportingUserId (type: int), [cached user id value]
  - gameCardId (type: int), [min 1]
  - reason (type: String), [cached username value]
  - comment (type: String), [allowed values:
    - "UPASSENDE"
    - "TERRORISME"
    - "STØTENDE"
    - "ANNET"
]
- statuscodes [200, 400, 401, 404, 409, 500]
- response:
  - 200: success message
  - 400: invalid request body input
  - 401: not a user
  - 404: cannot find gameCardId or userId
  - 409: entry already exists
  - 500: something went wrong on the server

## /report/send/comment

Sends a new rating (comment) report with the given parameters. Requires cached JWT token with user permissions.

- method: PUT
- role: user
- headers: 
  - 'Content-Type': 'application/json'
  - 'Authorization': 'Bearer \<cached-JWT-token>',
- path variables: none
- parameters:
  - reportingUserId (type: int), [cached user id value]
  - gameCardId (type: int), [min 1]
  - ratingUserId (type: int), [min 1]
  - reason (type: String), [cached username value]
  - comment (type: String), [allowed values:
    - "UPASSENDE"
    - "TERRORISME"
    - "STØTENDE"
    - "ANNET"
]
- statuscodes [200, 400, 401, 404, 409, 500]
- response:
  - 200: success message
  - 400: invalid request body input
  - 401: not a user
  - 404: cannot find gameCardId or userId
  - 409: entry already exists
  - 500: something went wrong on the server

## /report/delete/gamecard

Deletes a game card report with the given parameters. Requires cached JWT token with moderator permissions.

- method: DELETE
- role: moderator
- headers:
  - 'Content-Type': 'application/json'
  - 'Authorization': 'Bearer \<cached-JWT-token>',
- path variables: none
- parameters:
  - reportingUserId (type: int), [min 1]
  - gameCardId (type: int), [min 1]
- statuscodes: [200, 400, 401, 404, 500]
- response:
  - 200: success message
  - 400: invalid request body input
  - 401: not a moderator
  - 404: cannot find gameCardId or userId
  - 500: something went wrong on the server

## /report/delete/comment

Deletes a rating (comment) report with the given parameters. Requires cached JWT token with moderator permissions.

- method: DELETE
- role: moderator
- headers:
  - 'Content-Type': 'application/json'
  - 'Authorization': 'Bearer \<cached-JWT-token>',
- path variables: none
- parameters:
  - reportingUserId (type: int), [min 1]
  - gameCardId (type: int), [min 1]
  - ratingUserId (type: int), [min 1]
- statuscodes: [200, 400, 401, 404, 500]
- response:
  - 200: success message
  - 400: invalid request body input
  - 401: not a moderator
  - 404: cannot find gameCardId or userId
  - 500: something went wrong on the server