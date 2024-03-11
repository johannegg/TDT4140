# Authentication API

Click [here](../README.md) to go back to the API documentation overview.

Requests to any endpoint must have http://localhost:8080/api as the URI prefix. 

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

### Example 2: Invalid request parameter
Request:
```
{
    "username": "newuser2",
    "email": "",
    "password": "Passw0rd"
}
```
Response (400):
```
{
    "message": "Error: Email must not be blank"
}
```

### Example 3: Username not available
Request:
```
{
    "username": "newuser",
    "email": "newuser2@gmail.com",
    "password": "Passw0rd"
}
```
Response (409):
```
{
    "message": "Error: Username is already taken!"
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
- statuscodes: [200, 400, 401]
- response: 
    - 200: user information and generated JWT access token
    - 400: invalid request body values
    - 401: invalid credentials

### Example 1: Successful signin
Request:
```
{
    "username": "moduser",
    "password": "Moduser1"
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

### Example 2: Invalid input
Request:
```
{
    "username": "moduser",
    "password": "pass"
}
```
Response (400):
```
{
    "message": "Error: Password must contain at least one lowercase character, one uppercase character, and one digit"
}
```

### Example 3: Invalid credentials
Request:
```
{
    "username": "moduser",
    "password": "Moduser11"
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