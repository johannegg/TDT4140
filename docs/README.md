# Icebreaker API

This document explains the correct usage of all endpoints offered by the Icebreaker REST API. We will list the HTTP method required, any headers required, the input parameters and format, and corresponding the return values. Examples of possible request and response bodies types are also listed for each endpoint (under the assumption that the requests actually reach and are processed by server).

Endpoints that require any form of authentication must use a valid JWT token (generated in the /auth/signin endpoint). Any frontend that wants to access these endpoints should cache the JWT token locally upon signin. It might be a good idea to cache the roles assigned to the user, to selectively render content based on roles. The username of the signin is also required for some endpoints, so cache this as well.

Relevant status codes are as follows: 
- 200 for OK
- 400 for bad request input values, breaking any attribute constraints
- 401 for insufficient permissions (user/moderator/admin levels) 
- 404 when something could not be found in the database
- 409 for conflicts with already existing entries in the database
- 500 for internal server errors (data access errors) 

To avoid 400 errors, ensuring a valid request body input is vital; read the documentation in detail when making new fetch request methods towards the endpoints. Try to design the frontend so that 200 OK is only the response status code possible.

The documentation has been split up into different files, grouped by the feature they are related to. Links to relevant sections are listed as follows:

- Authentication related endpoints: [auth.md](./api-sections/auth.md)
- Game card related endpoints: [gamecard.md](./api-sections/gamecard.md)
- Rating related endpoints: [rating.md](./api-sections/rating.md)
- Queue related endpoints: [queue.md](./api-sections/queue.md)
- Favorites related endpoints: [favorites.md](./api-sections/favorites.md)