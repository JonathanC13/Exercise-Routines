# Exercise-Routines backend

# Runtime environment
Node JS

# Framework
Express JS
> npm install express

# Database and cloud service
MongoDB Atlas
> https://www.mongodb.com/

# API
/api/v1/

<mark>required</mark>

## Auth
/api/v1/auth/
e.g. /api/v1/auth/{route}/{params}

<table>
    <tr>
        <th>Method</th>
        <th>Route</th>
        <th>Params</th>
        <th>Body</th>
        <th>Success code</th>
        <th>Response</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>POST</td>
        <td>login</td>
        <td>N/A</td>
        <td>{email: <mark>email</mark>, password: <mark>password</mark>}</td>
        <td>200</td>
        <td>{user: {name: <mark>name</mark>, email: <mark>email</mark>, id: <mark>id</mark>, preferredTheme: <mark>preferredTheme</mark>}, token: <mark>token</mark>}</td>
        <td>Submits user credentials to process log in request.</td>
    </tr>
    <tr>
        <td>POST/td>
        <td>register</td>
        <td>N/A</td>
        <td>{name: <mark>name</mark>, email: <mark>email</mark>, password: <mark>password</mark>}</td>
        <td>201</td>
        <td>{name: <mark>name</mark>, email: <mark>email</mark>, emailLowercase: <mark>emailLowercase</mark>, password: <mark>password</mark>}</td>
        <td>Submits registration information to process registration request.</td>
    </tr>
    <tr>
        <td>GET</td>
        <td>refreshToken</td>
        <td></td>
        <td>N/A</td>
        <td>200</td>
        <td>{user: {name: <mark>name</mark>, email: <mark>email</mark>, id: <mark>id</mark>, preferredTheme: <mark>preferredTheme</mark>}, token: <mark>token</mark>}</td>
        <td>Requests new access token using the refresh token assigned to the user.</td>
    </tr>
    <tr>
        <td>POST</td>
        <td>logout</td>
        <td>N/A</td>
        <td>N/A</td>
        <td>204</td>
        <td>{}</td>
        <td>Request log out request.</td>
    </tr>
    <tr>
        <td>PATCH</td>
        <td>updateUserInfo</td>
        <td>userId</td>
        <td><mark>each optional</mark><br>{name: <mark>name</mark>, email: <mark>email</mark>, preferredTheme: <mark>preferredTheme</mark>}</td>
        <td>200</td>
        <td>{user: {name: <mark>name</mark>, email: <mark>email</mark>, id: <mark>id</mark>, preferredTheme: <mark>preferredTheme</mark>}}</td>
        <td>Request update to certain user information associated to the specified user id.</td>
    </tr>
    <tr>
        <td>PATCH</td>
        <td>updatePassword</td>
        <td>userId</td>
        <td>{currentPassword: <mark>currentPassword</mark>, newPassword: <mark>newPassword</mark>}</td>
        <td>200</td>
        <td>{user: {name: <mark>name</mark>, email: <mark>email</mark>, id: <mark>id</mark>, preferredTheme: <mark>preferredTheme</mark>}}</td>
        <td>Request update to the specified user's password.</td>
    </tr>
</table>

## Routines
Prerequisite: **Logged in successfully with valid JWT**

/api/v1/routines/
e.g. /api/v1/routines/{route}/{params}

<table>
    <tr>
        <th>Method</th>
        <th>Route</th>
        <th>Params</th>
        <th>Body</th>
        <th>Success code</th>
        <th>Response</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>GET</td>
        <td>getAllRoutines</td>
        <td>N/A</td>
        <td>N/A</td>
        <td>200</td>
        <td>{response: <mark>response</mark>, count: <mark>count</mark>}</td>
        <td>Requests all routines that is associated with validated user.</td>
    </tr>
    <tr>
        <td>POST</td>
        <td>createRoutine</td>
        <td>N/A</td>
        <td>{name: <mark>name</mark>, order: order, description: description}</td>
        <td>201</td>
        <td>
            {
                "response": {
                    "createdByUserId": "679fce257042f9426a4c749a",
                    "order": 1,
                    "name": "routine 1",
                    "description": "My first routine",
                    "_id": "679fd2b27042f9426a4c74a9",
                    "createdAt": "2025-02-02T20:16:50.242Z",
                    "updatedAt": "2025-02-02T20:16:50.242Z",
                    "__v": 0
                }
            }
        </td>
        <td>Create a routine for the user.</td>
    </tr>
    <tr>
        <td>GET</td>
        <td>getRoutine</td>
        <td>/routineId</td>
        <td>N/A</td>
        <td>200</td>
        <td>
            {
                "response": {
                    "createdByUserId": "679fce257042f9426a4c749a",
                    "order": 1,
                    "name": "routine 1",
                    "description": "My first routine",
                    "_id": "679fd2b27042f9426a4c74a9",
                    "createdAt": "2025-02-02T20:16:50.242Z",
                    "updatedAt": "2025-02-02T20:16:50.242Z",
                    "__v": 0
                }
            }
        </td>
        <td>Get the specified routine document.</td>
    </tr>
    <tr>
        <td>PATCH</td>
        <td>updateRoutine</td>
        <td>/routineId</td>
        <td>{name: <mark>name</mark>, order: order, description: description}</td>
        <td>200</td>
        <td>
            {
                "response": {
                    "_id": "679fd2b27042f9426a4c74a9",
                    "createdByUserId": "679fce257042f9426a4c749a",
                    "order": 1,
                    "name": "routine 1 again",
                    "description": "My first routine ??",
                    "createdAt": "2025-02-02T20:16:50.242Z",
                    "updatedAt": "2025-02-02T20:36:24.374Z",
                    "__v": 0
                }
            }
        </td>
        <td>Updates the specified routine and returns the updated document.</td>
    </tr>
    <tr>
        <td>DELETE</td>
        <td>deleteRoutine</td>
        <td>/routineId</td>
        <td>N/A</td>
        <td>200</td>
        <td>{}</td>
        <td>Deletes the specified routine</td>
    </tr>
</table>

## Sessions
Prerequisite: **Logged in successfully with valid JWT and has an existing routine.**

/api/v1/routines/:routineId/sessions/
e.g. /api/v1/routines/:routineId/sessions/{route}/{params}

<table>
    <tr>
        <th>Method</th>
        <th>Route</th>
        <th>Params</th>
        <th>Body</th>
        <th>Success code</th>
        <th>Response</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>GET</td>
        <td>getAllSessions</td>
        <td>N/A</td>
        <td>N/A</td>
        <td>200</td>
        <td>
            {
                "response": 
                [
                    {
                        "_id": "67a12243de36509ff310a6d5",
                        "routineId": "679fd498dca2129f77c3f997",
                        "createdByUserId": "679fce257042f9426a4c749a",
                        "order": 1,
                        "name": "my first session",
                        "description": "description111",
                        "exercises": [],
                        "createdAt": "2025-02-03T20:08:35.737Z",
                        "updatedAt": "2025-02-03T20:08:35.737Z",
                        "__v": 0
                    }
                ],
                "count": 1
            }
        </td>
        <td>Returns all the sessions associated with the user and the routine Id.</td>
    </tr>
    <tr>
        <td>POST</td>
        <td>createSession</td>
        <td>N/A</td>
        <td>{name: <mark>name</mark>, order: order, description: description}</td>
        <td>201</td>
        <td>
            {
                "response: 
                {
                    "_id": "67a12243de36509ff310a6d5",
                    "routineId": "679fd498dca2129f77c3f997",
                    "createdByUserId": "679fce257042f9426a4c749a",
                    "order": 1,
                    "name": "my first session",
                    "description": "description111",
                    "exercises": [],
                    "createdAt": "2025-02-03T20:08:35.737Z",
                    "updatedAt": "2025-02-03T20:08:35.737Z",
                    "__v": 0
                }
            }
        </td>
        <td>Creates a session for the user linked to the routine id.</td>
    </tr>
    <tr>
        <td>GET</td>
        <td>getSession</td>
        <td>sessionId</td>
        <td></td>
        <td>200</td>
        <td>
            {
                "response: 
                {
                    "_id": "67a12243de36509ff310a6d5",
                    "routineId": "679fd498dca2129f77c3f997",
                    "createdByUserId": "679fce257042f9426a4c749a",
                    "order": 1,
                    "name": "my first session",
                    "description": "description111",
                    "exercises": [],
                    "createdAt": "2025-02-03T20:08:35.737Z",
                    "updatedAt": "2025-02-03T20:08:35.737Z",
                    "__v": 0
                }
            }
        </td>
        <td>Returns the specified session document.</td>
    </tr>
    <tr>
        <td>PATCH</td>
        <td>updateSession</td>
        <td>sessionId</td>
        <td>N/A</td>
        <td></td>
        <td></td>
        <td>Updates the specified session and returns the updated document.</td>
    </tr>
    <tr>
        <td>DELETE</td>
        <td>deleteSession</td>
        <td>sessionId</td>
        <td>N/A</td>
        <td>200</td>
        <td>{}</td>
        <td>Deletes the specified session document.</td>
    </tr>
</table>

## Exercises
Prerequisite: **Logged in successfully with valid JWT and has an existing routine with an existing associated session.**

/api/v1/routines/:routineId/sessions/:sessionId/
e.g. /api/v1/routines/:routineId/sessions/:sessionId/{route}/{params}

<table>
    <tr>
        <th>Method</th>
        <th>Route</th>
        <th>Params</th>
        <th>Body</th>
        <th>Success code</th>
        <th>Response</th>
        <th>Description</th>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
</table>

====

<table>
    <tr>
        <th>Method</th>
        <th>Route</th>
        <th>Params</th>
        <th>Body</th>
        <th>Success code</th>
        <th>Response</th>
        <th>Description</th>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
</table>

# Additional modules
1. [cookie-parser](https://www.npmjs.com/package/cookie-parser)
    > npm install cookie-parser

2. [bcryptjs](https://www.npmjs.com/package/bcryptjs)
    > npm install bcryptjs

3. [cors](https://www.npmjs.com/package/cors)
    > npm install cors

4. [dotenv](https://www.npmjs.com/package/dotenv)
    > npm install dotenv

5. [express-async-errors](https://www.npmjs.com/package/express-async-errors)
    > npm install express-async-errors

6. [express-rate-limit](https://www.npmjs.com/package/express-rate-limit)
    > npm install express-rate-limit

7. [helmet](https://www.npmjs.com/package/helmet)
    > npm install helmet

8. [http-status-codes](https://www.npmjs.com/package/http-status-codes)
    > npm install http-status-codes

9. [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
    > npm install jsonwebtoken

10. [mongoose](https://www.npmjs.com/package/mongoose)
    > npm install mongoose

11. [xss-filters](https://www.npmjs.com/package/xss-filters)
    > npm install xss-filters