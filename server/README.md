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
        <th>N/A</th>
        <td>{email: <mark>email</mark>, password: <mark>password</mark>}</td>
        <td>200</td>
        <td>{user: {name: <mark>name</mark>, email: <mark>email</mark>, id: <mark>id</mark>, preferredTheme: <mark>preferredTheme</mark>}, token: <mark>token</mark>}</td>
        <td>Submits user credentials to process log in request.</td>
    </tr>
    <tr>
        <td>POST/td>
        <td>register</td>
        <th>N/A</th>
        <td>{name: <mark>name</mark>, email: <mark>email</mark>, password: <mark>password</mark>}</td>
        <td>201</td>
        <td>{name: <mark>name</mark>, email: <mark>email</mark>, emailLowercase: <mark>emailLowercase</mark>, password: <mark>password</mark>}</td>
        <td>Submits registration information to process registration request.</td>
    </tr>
    <tr>
        <td>GET</td>
        <td>refreshToken</td>
        <th></th>
        <td>N/A</td>
        <td>200</td>
        <td>{user: {name: <mark>name</mark>, email: <mark>email</mark>, id: <mark>id</mark>, preferredTheme: <mark>preferredTheme</mark>}, token: <mark>token</mark>}</td>
        <td>Requests new access token using the refresh token assigned to the user.</td>
    </tr>
    <tr>
        <td>POST</td>
        <td>logout</td>
        <th>N/A</th>
        <td>N/A</td>
        <td>204</td>
        <td>N/A</td>
        <td>Request log out request.</td>
    </tr>
    <tr>
        <td>PATCH</td>
        <td>updateUserInfo</td>
        <th>user id</th>
        <td><mark>each optional</mark><br>{name: <mark>name</mark>, email: <mark>email</mark>, preferredTheme: <mark>preferredTheme</mark>}</td>
        <td>200</td>
        <td>user: {name: <mark>name</mark>, email: <mark>email</mark>, id: <mark>id</mark>, preferredTheme: <mark>preferredTheme</mark>}</td>
        <td>Request update to certain user information associated to the specified user id.</td>
    </tr>
    <tr>
        <td>PATCH</td>
        <td>updatePassword</td>
        <th>user id</th>
        <td>{currentPassword: <mark>currentPassword</mark>, newPassword: <mark>newPassword</mark>}</td>
        <td>200</td>
        <td>user: {name: <mark>name</mark>, email: <mark>email</mark>, id: <mark>id</mark>, preferredTheme: <mark>preferredTheme</mark>}</td>
        <td>Request update to the specified user's password.</td>
    </tr>
</table>

## Routines
/api/v1/routines/
e.g. /api/v1/routines/{route}/{params}

**Logged in successfully with valid JWT**

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
        <th>N/A</th>
        <td>N/A</td>
        <td>200</td>
        <td>{response: <mark>response</mark>, count: <mark>count</mark>}</td>
        <td>Requests all routines that is associated with validated user.</td>
    </tr>
    <tr>
        <td>POST</td>
        <td>createRoutine</td>
        <th></th>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>GET</td>
        <td>getRoutine</td>
        <th>routine id</th>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>PATCH</td>
        <td>updateRoutine</td>
        <th>routine id</th>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>DELETE</td>
        <td>deleteRoutine</td>
        <th>routine id</th>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
</table>

<tr>
    <td></td>
    <td></td>
    <th></th>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
</tr>

# Additional modules
1. cookie-parser
    > npm install cookie-parser

2. bcryptjs
    > npm install bcryptjs

3. cors
    > npm install cors

4. dotenv
    > npm install dotenv

5. express-async-errors
    > npm install express-async-errors

6. express-rate-limit
    > npm install express-rate-limit

7. helmet
    > npm install helmet

8. http-status-codes
    > npm install http-status-codes

9. jsonwebtoken
    > npm install jsonwebtoken

10. mongoose
    > npm install mongoose

11. xss-filters
    > npm install xss-filters