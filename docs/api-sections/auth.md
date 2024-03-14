# Authentication API

Click [here](../README.md) to go back to the API documentation overview.

Requests to any endpoint must have http://localhost:8080/api as the URI prefix.

## /auth/get/id/{username}

Gets the user ID from a given username.

- method: GET
- role: none
- headers:
- path variables:
  - username (type: String) [not blank]
- parameters: none
- statuscodes [200, 404]
- response:
  - 200: success message
  - 404: user not found

## /auth/signup

Signs up a new user with the given user credentials.

- method: POST
- role: none
- headers:
  - 'Content-Type': 'application/json'
- path variables: none
- parameters:
  - username (type: String), [min 3 chars, max 20 chars]
  - email (type: String), [email formatting, max 50 chars]
  - password (type: String), [min 6 chars, max 40 chars, must contain at least one uppercase letter and at least one digit]
- statuscodes [200, 400, 409, 500]
- response:
  - 200: success message
  - 400: invalid request body values
  - 409: entry already exists
  - 500: something went wrong on the server

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
- statuscodes: [200, 400, 401]
- response:
  - 200: user information and generated JWT access token
  - 400: invalid request body values
  - 401: invalid credentials
