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

### Example 1: Successful fetch
Path variable: gamecardID = 1

Response (200):
```
[
    {
        "score": 5,
        "comment": "Awesome!",
        "gameCardId": 1,
        "username": "moduser"
    },
    {
        "score": 4,
        "comment": "Great game!",
        "gameCardId": 1,
        "username": "adminuser"
    }
]
```
### Example 2: Card does not exist
Path variable: gamecardID = 3

Response (404):
```
{
    "message": "Error: Game card not found"
}
```
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

### Example 1: Successful fetch
Path variable: username = "adminuser"

Response (200):
```
[
    {
        "score": 2,
        "comment": null,
        "gameCardId": 2,
        "username": "adminuser"
    },
    {
        "score": 4,
        "comment": "Great game!",
        "gameCardId": 1,
        "username": "adminuser"
    }
]
```
### Example 2: User does not exist
Path variable: username = "nonexistentuser"

Response (404):
```
{
    "message": "Error: User not found"
}
```

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

### Example 1: Successful addition
Request:
```
{
    "score": "5",
    "comment": "Good game",
    "gameCardId": "2",
    "username": "moduser"
}
```
Response (200):
```
{
    "message": "Rating added successfully!"
}
```

### Example 2: Invalid score value
Request:
```
{
    "score": "10",
    "comment": "Good game",
    "gameCardId": "1",
    "username": "moduser"
}
```
Response (400):
```
{
    "message": "Error: Score must be at most 5"
}
```

### Example 3: Rating already exists
Request:
```
{
    "score": "5",
    "comment": "Good game",
    "gameCardId": "1",
    "username": "moduser"
}
```
Response (409):
```
{
    "message": "Error: User already rated this game card"
}
```

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

### Example 1: Successful deletion
Path variables: gamecardID = 2, username = "moduser"

Response (200):
```
{
    "message": "Rating deleted successfully!"
}
```
### Example 2: User but not moderator
Path variables: gamecardID = 2, username = "moduser"

Response (401):
```
{
    "path": "/error",
    "error": "Unauthorized",
    "message": "Error: Full authentication is required to access this resource",
    "status": 401
}
```
### Example 3: Rating not found
Request:
```
Path variables: gamecardID = 2, username = "otheruser"
```
Response (404):
```
{
    "message": "Error: Rating not found"
}
```