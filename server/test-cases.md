# ./routes/auth
## POST : http://localhost:5000/api/v1/auth/register
- Test 1: Missing key "name".
    *Description*:
        Request POST to register with missing "name" in the body.

    *Route params*: 
        N/A

    *Body*: **JSON**
        {
            "email": "test1@.com",
            "password": "123456"
        }

    *Expected results*:
        1. status code: 400.
        2. response: **JSON**
            {
                message: Please provide the required fields!
            }
        3. No user document created in collection 'users'.

    *Status*: Pass

- Test 2: Missing key "email".
    *Description*:
        Request POST to register with missing "email" in the body.

    *Route params*: 
        N/A

    *Body*: **JSON**
        {
            "name": "test2"
            "password": "123456"
        }
        
    *Expected results*:
        1. status code: 400.
        2. response: **JSON**
            {
                message: Please provide the required fields!
            }
        3. No user document created in collection 'users'.

    *Status*: Pass

- Test 3: Missing key "password".
    *Description*:
        Request POST to register with missing "password" in the body.
    
    *Route params*: 
        N/A

    *Body*: **JSON**
        {
            "name": "test3",
            "email": "test3@.com"
        }

    *Expected results*:
        1. status code: 400.
        2. response: **JSON**
            {
                message: Please provide the required fields!
            }
        3. No user document created in collection 'users'.

    *Status*: Pass

- Test 4: Required field validation.
    *Description*:
        Request with missing values in the name, email, and password.

    *Route params*: 
        N/A

    *Body*: **JSON**
        {
            "name": "",
            "email": "",
            "password": ""
        }

    *Expected results*:
        1. status code: 400.
        2. response: **JSON**
            {
                message: Please provide the required fields!
            }
        3. No user document created in collection 'users'.

    *Status*: Pass

- Test 5: Length field validation.
    *Description*:
        Request with too long name (> 50 characters), invalid email, and too short password (< 6 characters).

    *Route params*: 
        N/A

    *Body*: **JSON**
        {
            "name": "Lorem ipsum odor amet aawe Lorem ipsum odor amet aa",
            "email": "A@B",
            "password": "12345"
        }

    *Expected results*:
        1. status code: 400.
        2. response: **JSON**
            {
                message: Validation failed for the following fields: Please provide a name 50 or less characters!, Please provide a valid email!, Please provide a password that is 6 or more characters!
            }
        3. No user document created in collection 'users'.

    *Status*: Pass

- Test 6: Successful registration.
    *Description*:
        Request with valid body.

    *Route params*: 
        N/A

    *Body*: **JSON**
        {
            "name": "Jon",
            "email": "Apple@Billy.com",
            "password": "123456"
        }

    *Expected results*:
        1. status code: 201.
        2. response: **JSON**
            {
                user: {
                    name: name
                }, 
                token: JWT
            }
        3. User document created in collection 'users'.

    *Status*: Pass

- Test 7: Duplicate email.
    *Description*:
        Request with an email that is already registered.

    *Prerequisite*:
        1. Test 6 successful.

    *Route params*: 
        N/A

    *Body*: **JSON**
        {
            "name": "Jonny",
            "email": "Apple@Billy.com",
            "password": "1234567"
        }

    *Expected results*:
        1. status code: 400.
        2. response: **JSON**
            {
                message: Duplicate value entered in email field! Please use a different one.
            }
        3. No user document created in collection 'users'.

    *Status*: Pass

## POST : http://localhost:5000/api/v1/auth/login
*Prerequisites*:
    1. At least one account successfully registered.

- Test 1: Missing key "email".
    *Description*:
        Request POST to login with missing "email" in the body.

    *Route params*: 
        N/A

    *Body*: **JSON**
        {
            "password": "123456"
        }

    *Expected results*:
        1. status code: 400.
        2. response: **JSON**
            {
                message: Please provide the required fields!
            }
    
    *Status*: Pass

- Test 2: Missing key "password".
    *Description*:
        Request POST to login with missing "password" in the body.

    *Route params*: 
        N/A

    *Body*: **JSON**
        {
            "email": "Apple@Billy.com"
        }

    *Expected results*:
        1. status code: 400.
        2. response: **JSON**
            {
                message: Please provide the required fields!
            }

    *Status*: Pass

- Test 3: Enter email that has not been registered.
    *Description*:
        Request POST to login with email that has not been registered.

    *Route params*: 
        N/A

    *Body*: **JSON**
        {
            "email": "A@B.com",
            "password": "123456"
        }

    *Expected results*:
        1. status code: 401.
        2. response: **JSON**
            {
                message: Invalid credentials!
            }

    *Status*: Pass

- Test 4: Invalid password.
    *Description*:
        Request POST to login with valid email but incorrect password.

    *Route params*: 
        N/A

    *Body*: **JSON**
        {
            "email": "Apple@Billy.com",
            "password": "111111"
        }

    *Expected results*:
        1. status code: 401.
        2. response: **JSON**
            {
                message: Invalid credentials!
            }

    *Status*: Pass

- Test 5: Successful login.
    *Description*:
        Request with valid email and password.

    *Route params*: 
        N/A

    *Body*: **JSON**
        {
            "email": "Apple@Billy.com",
            "password": "123456"
        }

    *Expected results*:
        1. status code: 200.
        2. response: **JSON**
            {
                user: {
                    name: name
                }, 
                token: JWT
            }

    *Status*: Pass

---

# ./routes/routines
## GET : http://localhost:5000/api/v1/routines/
*Prerequisites*:
    1. Successful login that returned a valid JWT.

- Text 1: Current user has 0 routines and GET requested.
    *Description*:
        Request GET to the route /routines to get all the logged in user's routines, but since there are none, the response is an empty array.

    *Prerequisites*:
        1. 0 routines created by the current user.

    *Route params*: 
        N/A

    *Body*:
        N/A

    *Expected results*:
        1. status code: 200.
        2. response: **JSON**
            {
                "response": [],
                "count": 0
            }
        3. In the cluster 'Exercise-Routines', no change in the documents in the collection 'routines'.

    *Status*: Pass   

- Text 2: Get all routines that were created by the current user.
    *Description*:
        Get all routines that were created by the current user, need to test routine creation first.

    *Prerequisites*:
        1. 1 or more routines created by the current user.

    *Route params*: 
        N/A

    *Body*:
        N/A

    *Expected results*:
        1. status code: 200.
        2. response: **JSON**
            {
                "response": [documents' objects],
                "count": 0
            }
        3. In the cluster 'Exercise-Routines', no change in the documents in the collection 'routines'.

    *Status*: Pass

        response: 200
        {
            "response": [
                {
                    "_id": "679fd2b27042f9426a4c74a9",
                    "createdByUserId": "679fce257042f9426a4c749a",
                    "order": 1,
                    "name": "routine 1",
                    "description": "My first routine",
                    "createdAt": "2025-02-02T20:16:50.242Z",
                    "updatedAt": "2025-02-02T20:16:50.242Z",
                    "__v": 0
                },
                {
                    "_id": "679fd498dca2129f77c3f997",
                    "createdByUserId": "679fce257042f9426a4c749a",
                    "order": 2,
                    "name": "routine 2",
                    "description": "My second routine",
                    "createdAt": "2025-02-02T20:24:56.013Z",
                    "updatedAt": "2025-02-02T20:24:56.013Z",
                    "__v": 0
                }
            ],
            "count": 2
        }

## POST : http://localhost:5000/api/v1/routines/
*Prerequisites*:
    1. Successful login that returned a valid JWT.

- Text 1: Missing key "name"
    *Decription*:
        Within the request body, omit the "name" key.

    *Route params*: 
        N/A

    *Body*:
        {
            "order": 1,
            "description": "My first routine"
        }

    *Expected results*:
        1. status code: 400.
        2. response: **JSON**
            {
                message: Please provide a routine name!
            }
        3. In the cluster 'Exercise-Routines', no created document in the collection 'routines'.

    *Status*: Pass

- Text 2: Empty value for key "name".
    *Decription*:
        In the request body provide the "name" key, but the value is an empty String.

    *Route params*: 
        N/A

    *Body*:
        {
            "order": 1,
            "name": "",
            "description": "My first routine"
        }

    *Expected results*:
        1. status code: 400.
        2. response: **JSON**
            {
                message: Please provide a routine name!
            }
        3. In the cluster 'Exercise-Routines', no created document in the collection 'routines'.

    *Status*: Pass

- Test 3: Value for key "name" is longer than 50 characters and description is longer than 500 characters.
    *Description*:
        In the request body provide the "name" key and the value is longer than 50 characters.
        In the request body provide the "description" key and the value is longer than 500 characters.

    *Route params*: 
        N/A

    *Body*:
        {
            "order": 1,
            "name": "Lorem ipsum odor amet aawe Lorem ipsum odor amet aa",
            "description": "Lorem ipsum odor amet, consectetuer adipiscing elit. Odio erat suscipit taciti nullam ligula elit. Massa mattis cras habitasse nostra morbi ornare ex vel. Libero sodales ultrices feugiat vivamus ex mattis nam massa. Aliquet litora sem lacinia dictum venenatis urna suscipit ullamcorper consequat. Aliquam mattis dui mattis senectus eleifend phasellus tincidunt. Magna elit viverra facilisis varius quisque arcu magnis magnis. Torquent volutpat magna mi sollicitudin; sollicitudin massa dis litora. Integer sit sociosqu donec arcu ante mollis tortor. Sollicitudin feugiat nascetur fringilla commodo aliquet praesent nullam praesent."
        }

    *Expected results*:
        1. status code: 400.
        2. response: **JSON**
            {
                message: Validation failed for the following fields: Please provide a name that is 50 or less characters!, Please provide a description that is less than 500 characters!
            }
        3. In the cluster 'Exercise-Routines', no created document in the collection 'routines'.

    *Status*: Pass

- Test 4: Successful routine creation.
    *Decription*:
        The request body has a valid "name" value. "description" is optional.

    *Route params*: 
        N/A

    *Body*: **JSON**
        {
            "order": 1,
            "name": "routine 1",
            "description": "My first routine"
        }

    *Expected results*:
        1. status code: 201.
        2. response: The object of the created document.
        3. In the cluster 'Exercise-Routines', a new document is created in the collection 'routines' with the exact values in the request.

    *Status*: Pass

        response: 201
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

## GET : http://localhost:5000/api/v1/routines/:routineId
*Prerequisites*:
    1. Successful login that returned a valid JWT.

- Test 1: Invalid routine id.
    *Description*:
        In the route param :routineId, enter an invalid routine id.

    *Route params*:
        :routineId = 67969cbe4163742abfe4d7d

    *Body*:
        N/A

    *Expected results*:
        1. status code: 404.
        2. response: **JSON**
            {
                message: Id not found: 67969cbe4163742abfe4d7d!
            }

    *Status*: Pass

- Test 2: Id that does not exist.
    *Description*:
        In the route param :routineId, enter an valid length routine id but an _id that does not exist in the collection 'routine'.

    *Route params*:
        :routineId = 67969cbe4163742abfe4d7dA

    *Body*:
        N/A

    *Expected results*:
        1. status code: 404.
        2. response: **JSON**
            {
                message: Routine not found!
            }

    *Status*: Pass

- Test 3: Successful get with Id that does exist.
    *Description*:
        In the route param :routineId, enter an valid length routine id but an _id that does exist in the collection 'routine'.

    *Prerequisites*:
        1. At least one routine document exists in the collection 'routines'.

    *Route params*:
        :routineId = 679fd2b27042f9426a4c74a9   // your valid routine _id

    *Body*:
        N/A

    *Expected results*:
        1. status code: 200.
        2. response: **JSON**
            The document of the routine.

    *Status*: Pass
    
        response: 200
        {
            "response": {
                "_id": "679fd2b27042f9426a4c74a9",
                "createdByUserId": "679fce257042f9426a4c749a",
                "order": 1,
                "name": "routine 1",
                "description": "My first routine",
                "createdAt": "2025-02-02T20:16:50.242Z",
                "updatedAt": "2025-02-02T20:16:50.242Z",
                "__v": 0
            }
        }

## PATCH : http://localhost:5000/api/v1/routines/:routineId
*Prerequisites*:
    1. Successful login that returned a valid JWT.

- Test 1: Missing :routineId
    *Description*:
        Within the request URL, omit the :routineId entirely. It should trigger page not found since the route does not exist.

    *Route params*:
        :routineid = ''

    *Body*:
        N/A

    *Expected results*:
        1. status code: 404.
        2. response: **JSON**
            {
                message: Page not found!
            }

    *Status*: Pass

- Test 2: Invalid routine id.
    *Description*:
        Within the URL, enter an invalid routine id, not the correct _id length.

    *Route params*:
        :routineId = 679fd2b27042f9426a4c74a

    *Body*:
        N/A

    *Expected results*:
        1. status code: 404.
        2. response: **JSON**
            {
                message: Id not found: 679fd2b27042f9426a4c74a!
            }

    *Status*: Pass

- Test 3: routine Id that does not exist.
    *Description*:
        Within the URL, enter a routine _id that does not exist in the collection 'routines'.

    *Route params*:
        :routineId = 679fd2b27042f9426a4c74a8

    *Body*:
        N/A

    *Expected results*:
        1. status code: 404.
        2. response: **JSON**
            {
                message: Routine not found!
            }

    *Status*: Pass

- Test 4: routine Id that does exist and test validation for the "name".
    *Description*:
        Within the URL, enter a routine _id that does exist in the collection 'routines'.
        In the body, enter the value for the "name" to be greater than 50 characters.

    *Route params*:
        :routineId = 679fd2b27042f9426a4c74a9

    *Body*:
        {
            "order": 1,
            "name": "NEW ROUTINENEW ROUTINENEW ROUTINENEW ROUTINENEW ROUTINENEW ROUTINENEW ROUTINENEW ROUTINENEW ROUTINENEW ROUTINE",
            "description": "My first routine ??"
        }

    *Expected results*:
        1. status code: 400.
        2. response: **JSON**
            {
                message: Validation failed for the following fields: Please provide a name that is 50 or less characters!
            }

    *Status*: Pass

- Test 5: Successful update with routine Id that does exist.
    *Description*:
        Within the URL, provide a routine _id that exists in the collection 'routines'.
        Enter the field values with valid input.

    *Prerequisites*:
        1. At least one routine document exists in the collection 'routines'.
        2. Record createdAt and updatedAt values.

    *Route params*:
        :routineId = 679fd2b27042f9426a4c74a9   // your valid routine _id

    *Body*:
        {
            "order": 1,
            "name": "routine 1 again",
            "description": "My first routine ??"
        }

    *Expected results*:
        1. status code: 200.
        2. response: **JSON**
            The document of the updated routine.
        3. The routine document is updated in the collection 'routines'.
        4. createdAt value remains unchanged.
        5. updatedAt changes to current time, account for timezone.

    *Status*: Pass

        original:
            {
                "_id": "679fd2b27042f9426a4c74a9",
                "createdByUserId": "679fce257042f9426a4c749a",
                "order": 1,
                "name": "routine 1",
                "description": "My first routine",
                "createdAt": "2025-02-02T20:16:50.242Z",
                "updatedAt": "2025-02-02T20:16:50.242Z",
                "__v": 0
            }

        response: 200
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


## DELETE : http://localhost:5000/api/v1/routines/:routineId
*Prerequisites*:
    1. Successful login that returned a valid JWT.

- Test 1: Missing :routineId
    *Description*:
        In the request URL, omit the routine id.

    *Route params*:
        :routineid = ''

    *Body*:
        N/A

    *Expected results*:
        1. status code: 404.
        2. response: **JSON**
            {
                message: Page not found!
            }

    *Status*: Pass

- Test 2: Invalid routine id
    *Description*:
        In the request URL, enter an invalid length routine id.

    *Route params*:
        :routineId = 679fd2b27042f9426a4c74a

    *Body*:
        N/A

    *Expected results*:
        1. status code: 404.
        2. response: **JSON**
            {
                message: Id not found: 679fd2b27042f9426a4c74a!
            }

    *Status*: Pass

- Test 3: Id that does not exist.
    *Description*:
        In the request URL, provide a routine _id that does not exist in the collection 'routines'.

    *Route params*:
        :routineId = 679fd2b27042f9426a4c74a8

    *Body*:
        N/A

    *Expected results*:
        1. status code: 404.
        2. response: **JSON**
            {
                message: Something has gone wrong! Cascade delete error: routine.
            }

    *Status*: Pass

- Test 4: Delete a routine that has no additional related documents in other collections.
    *Description*:
        Delete a routine document from the collection 'routines' that has no other documents that reference the routine _id.

    *Prerequisites*:
        1. A routine document exists for the current user.

    *Route params*:
        :routineId = 679fd2b27042f9426a4c74a9   // your valid routine _id

    *Body*:
        N/A

    *Expected results*:
        1. status code: 200.
        2. response: N/A
        3. The document is deleted from the collection 'routines'.

    *Status*: Pass

- Test 5: Delete a routine that has related session documents in the collection 'sessions'.
    *Description*:
        To test the cascading delete when routine is deleted.
        Create a routine document that has a session document in collection 'sessions' that has a reference to the routine _id through session document's field routineId.

    *Prerequisites*:
        1. Created a routine document.
        2. Created 2 session document that references the routine document id.

    *Route params*:
        :routineId = 67969cbe4163742abfe4d7d5   // your valid routine _id

    *Body*:
        N/A

    *Expected results*:
        1. status code: 200.
        2. response: N/A
        3. The routine document is deleted from the collection 'routines'.
        4. The session documents with the routineId referenced are deleted from the collection 'sessions'.

    *Status*: Pass

- Test 6: Delete a routine that has related session documents and those sessions have sub documents in the array exercises.
    *Description*:
        To test the cascading delete when routine is deleted.
        Create a routine document that has 2 session documents in collection 'sessions' that has a reference to the routine _id through session document's field routineId.
        Within each session document's exercises sub document array, there are 2 exercises.

    *Prerequisites*:
        1. Created a routine document.
        2. Created 2 session document that references the routine document id.
        3. Each session document, add 2 exercises to the exercises sub document array.

    *Route params*:
        :routineId = 67969cbe4163742abfe4d7d5   // your valid routine _id

    *Body*:
        N/A

    *Expected results*:
        1. status code: 200.
        2. response: N/A
        3. The routine document is deleted from the collection 'routines'.
        4. The session documents with the routineId referenced are deleted from the collection 'sessions'.

    *Status*: Pass

- Test 7: Delete a routine that has related session documents and those sessions have sub documents of exercises and some of the exercises have comments in a subset pattern.
    *Description*:
        To test the cascading delete when routine is deleted.
        Create a routine document that has 2 session documents in collection 'sessions' that has a reference to the routine _id through session document's field routineId.
        Within each session document's exercises sub document array, there are 2 exercises.
        For at least 2 exercises, add 2 or more comments each.

    *Prerequisites*:
        1. Created a routine document.
        2. Created 2 session document that references the routine document id.
        3. Each session document, add 2 exercises to the exercises sub document array.
        4. For at least 2 exercises, add 2 or more comments each.

    *Route params*:
        :routineId = 67969cbe4163742abfe4d7d5   // your valid routine _id

    *Body*:
        N/A

    *Expected results*:
        1. status code: 200.
        2. response: N/A
        3. The routine document is deleted from the collection 'routines'.
        4. The session documents with the routineId referenced are deleted from the collection 'sessions'.
        5. The comment documents with the exerciseId referenced are deleted from the the collection 'comments'.

    *Status*: Pass

*Internal test*
    To test transaction rollback, placed manually thrown errors inbetween mongoose calls to obsverse abortTransactions.

---

# ./routes/sessions
## GET : http://localhost:5000/api/v1/routines/:routineId/sessions/
*Prerequisites*:
    1. Successful login that returned a valid JWT.

- Text 1: Get sessions with an empty routineid.
    *Description*:
        In the request URL, provide an empty :routineId.

    *Route params*:
        :routineid = ''

    *Body*:
        N/A

    *Expected results*:
        1. status code: 400.
        2. response: **JSON**
            {
                message: Id not found: sessions!
            }

    *Status*: Pass

- Test 2: Get sessions with invalid routine id
    *Description*:
        In the request URL, provide a :routineId of invalid length.

    *Route params*:
        :routineId = 679fd498dca2129f77c3f99

    *Body*:
        N/A

    *Expected results*:
        1. status code: 404.
        2. response: **JSON**
            {
                message: Id not found: 679fd498dca2129f77c3f99!
            }

    *Status*: Pass

- Test 3: Get sessions with Id that does not exist.
    *Description*:
        In the request URL, provide a :routineId that does not exist in the collection 'routines'.

    *Route params*:
        :routineId = 679fd498dca2129f77c3f996

    *Body*:
        N/A

    *Expected results*:
        1. status code: 404.
        2. response: **JSON**
            {
                message: Routine not found!
            }

    *Status*: Pass

- Test 4: Get sessions of a routine with an existing routine id.
    *Description*:
        In the request URL, provide a :routineId that exists in the collection 'routines'.

    *Prerequisites*:
        1. A routine exitsts.
        2. A session exists with a routineId that references the routine document.

    *Route params*:
        :routineId = 679fd498dca2129f77c3f997   // your valid routine _id

    *Body*:
        N/A

    *Expected results*:
        1. status code: 200.
        2. response: **JSON**
            {
                {
                    "response": [sessions],
                    "count": 0
                }
            }

    *Status*: Pass

## POST : http://localhost:5000/api/v1/routines/:routineId/sessions/
*Prerequisites*:
    1. Successful login that returned a valid JWT.
    2. :routineId is valid.

- Test 1: Missing key "name".
    *Description*:
        In the request body, do not provide the "name" key.

    *Route params*:
        :routineId = 679fd498dca2129f77c3f997   // your valid routine _id

    *Body*:
        {
            "order": 1,
            "description": "description111"
        }

    *Expected results*:
        1. status code: 400.
        2. response: **JSON**
            {
                message: Please provide a session name!
            }
        3. No session document created in collection 'sessions'.

    *Status*: Pass

- Test 2: Empty value for key "name".
    *Description*:
        In the request body, provide the "name" key but do not provide a value.

    *Route params*:
        :routineId = 679fd498dca2129f77c3f997   // your valid routine _id

    *Body*:
        {
            "order": 1,
            "name": "",
            "description": "description111"
        }

    *Expected results*:
        1. status code: 400.
        2. response: **JSON**
            {
                message: Please provide a session name!
            }
        3. No session document created in collection 'sessions'.

    *Status*: Pass

- Test 3: Invalid lengths for name (> 50 characters) and description (> 500 characters).
    *Description*:
        In the request body, provide "name" value that is longer than 50 characters and a "description" longer than 500 characters.

    *Route params*:
        :routineId = 679fd498dca2129f77c3f997   // your valid routine _id

    *Body*:
        {
            "order": 1,
            "name": "Lorem ipsum odor amet aawe Lorem ipsum odor amet aa",
            "description": "Lorem ipsum odor amet, consectetuer adipiscing elit. Odio erat suscipit taciti nullam ligula elit. Massa mattis cras habitasse nostra morbi ornare ex vel. Libero sodales ultrices feugiat vivamus ex mattis nam massa. Aliquet litora sem lacinia dictum venenatis urna suscipit ullamcorper consequat. Aliquam mattis dui mattis senectus eleifend phasellus tincidunt. Magna elit viverra facilisis varius quisque arcu magnis magnis. Torquent volutpat magna mi sollicitudin; sollicitudin massa dis litora. Integer sit sociosqu donec arcu ante mollis tortor. Sollicitudin feugiat nascetur fringilla commodo aliquet praesent nullam praesent."
        }

    *Expected results*:
        1. status code: 400.
        2. response: **JSON**
            {
                message: Validation failed for the following fields: Please provide a name that is 50 or less characters!, Please provide a description that is less than 500 characters!
            }
        3. No session document created in collection 'sessions'.

    *Status*: Pass

- Test 4: Successfully create a session.
    *Description*:
        In the request body, provide valid information.

    *Route params*:
        :routineId = 679fd498dca2129f77c3f997   // your valid routine _id

    *Body*:
        {
            "order": 1,
            "name": "my first session",
            "description": "description111"
        }

    *Expected results*:
        1. status code: 200.
        2. response: **JSON**
            created document object
        3. Session document created in collection 'sessions'.

    *Status*: Pass

        response: 201
        {
            "response": {
                "routineId": "679fd498dca2129f77c3f997",
                "createdByUserId": "679fce257042f9426a4c749a",
                "order": 1,
                "name": "my first session",
                "description": "description111",
                "_id": "67a12243de36509ff310a6d5",
                "exercises": [],
                "createdAt": "2025-02-03T20:08:35.737Z",
                "updatedAt": "2025-02-03T20:08:35.737Z",
                "__v": 0
            }
        }

## GET : http://localhost:5000/api/v1/routines/:routineId/sessions/:sessionId
*Prerequisites*:
    1. Successful login that returned a valid JWT.

- Test 1: Invalid session id.
    *Description*:
        In the request URL, provide an invalid length :sessionId.

    *Route params*:
        :routineId = 679fd498dca2129f77c3f997   // your valid routineId
        :sessionId = 67a12243de36509ff310a6d

    *Body*:
        N/A

    *Expected results*:
        1. status code: 404.
        2. response: **JSON**
            {
                message: Id not found: 67a12243de36509ff310a6d!
            }

    *Status*: Pass

- Test 2: session id that does not exist.
    *Description*:
        In the request URL, provide a :sessionId that does not exist in the collection 'sessions'.

    *Route params*:
        :routineId = 679fd498dca2129f77c3f997   // your valid routineId
        :sessionId = 67a12243de36509ff310a6d4

    *Body*:
        N/A

    *Expected results*:
        1. status code: 404.
        2. response: **JSON**
            {
                message: Session not found!
            }

    *Status*: Pass

- Test 3: session id that does exist.
    *Description*:
        In the request URL, provide a :sessionId that does exist in the collection 'sessions'.

    *Prerequisites*:
        1. At least one session document exists in the collection 'sessions'.

    *Route params*:
        :routineId = 679fd498dca2129f77c3f997   // your valid routine _id
        :sessionId = 67a12243de36509ff310a6d5   // your valid session _id

    *Body*:
        N/A

    *Expected results*:
        1. status code: 200.
        2. response: **JSON**
            The document of the session.

    *Status*: Pass

        response: 200
        {
            "response": {
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

## PATCH : http://localhost:5000/api/v1/routines/:routineId/sessions/:sessionId
*Prerequisites*:
    1. Successful login that returned a valid JWT.

- Test 1: Invalid session id.
    *Description*:
        In the request URL, provide an invalid length :sessionId.

    *Route params*:
        :routineId = 679fd498dca2129f77c3f997   // your valid routineId
        :sessionId = 67a12243de36509ff310a6d

    *Body*:
        N/A

    *Expected results*:
        1. status code: 404.
        2. response: **JSON**
            {
                message: Id not found: 67a12243de36509ff310a6d!
            }

    *Status*: Pass

- Test 2: session id that does not exist.
    *Description*:
        In the request URL, provide a :sessionId that does not exist in the collection 'sessions'.

    *Route params*:
        :routineId = 679fd498dca2129f77c3f997   // your valid routineId
        :sessionId = 67a12243de36509ff310a6d4

    *Body*:
        N/A

    *Expected results*:
        1. status code: 404.
        2. response: **JSON**
            {
                message: Session not found!
            }

    *Status*: Pass

- Test 3: Update session info excluding the exercises sub document.
    *Description*:
        In the URL, provide valid values to update the session document, but exclude the exercises sub document array.

    *Prerequisites*:
        1. At least one session document exists in the collection 'sessions'.
        2. Record createdAt and updatedAt values.

    *Route params*:
        :routineId = 679fd498dca2129f77c3f997   // your valid routine _id
        :sessionId = 67a12243de36509ff310a6d5   // your valid session _id

    *Body*:
        {
            "order": 3,
            "name": "sesh1",
            "description": "description111222"
        }
        
    *Expected results*:
        1. status code: 200.
        2. response: **JSON**
            The document of the updated session.
        3. The session document is updated in the collection 'sessions'.
        4. createdAt value remains unchanged.
        5. updatedAt changes to current time, account for timezone.

    *Status*: Pass
        Before:
            {
                "response": {
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

        After:
            response: 200
                {
                    "response": {
                        "_id": "67a12243de36509ff310a6d5",
                        "routineId": "679fd498dca2129f77c3f997",
                        "createdByUserId": "679fce257042f9426a4c749a",
                        "order": 3,
                        "name": "sesh1",
                        "description": "description111222",
                        "exercises": [],
                        "createdAt": "2025-02-03T20:08:35.737Z",
                        "updatedAt": "2025-02-03T20:16:38.821Z",
                        "__v": 0
                    }
                }

- Test 4: Specific test for attempting to update exercises subdoc.
    *Description*:
        In the URL, provide valid values to update the session document, but include the exercises sub document array. The update controller should not update the exercises sub document array.

    *Prerequisites*:
        1. At least one session document exists in the collection 'sessions'.
        2. At least one exercise document exists in the exercises sub document.
        3. Record the information in the exercises sub document.

    *Route params*:
        :routineId = 679fd498dca2129f77c3f997   // your valid routine _id
        :sessionId = 67a12243de36509ff310a6d5   // your valid session _id

    *Body*:
        {
            "order": 3,
            "name": "sesh1",
            "description": "description111222",
            "exercises": []
        }
        
    *Expected results*:
        1. status code: 200.
        2. response: **JSON**
            The document of the updated session.
        3. The session document is updated in the collection 'sessions'.
        4. The exercises sub document array is unchanged.

    *Status*: Pass

## DELETE : http://localhost:5000/api/v1/routines/67969cbe4163742abfe4d7d5/sessions/:sessionId
*Prerequisites*:
    1. Successful login that returned a valid JWT.

- Test 1: Invalid session id.
    *Description*:
        In the request URL, provide an invalid length :sessionId.

    *Route params*:
        :routineId = 679fd498dca2129f77c3f997   // your valid routineId
        :sessionId = 67a12243de36509ff310a6d

    *Body*:
        N/A

    *Expected results*:
        1. status code: 404.
        2. response: **JSON**
            {
                message: Id not found: 67a12243de36509ff310a6d!
            }

    *Status*: Pass

- Test 2: session id that does not exist.
    *Description*:
        In the request URL, provide a :sessionId that does not exist in the collection 'sessions'.

    *Route params*:
        :routineId = 679fd498dca2129f77c3f997   // your valid routineId
        :sessionId = 67a12243de36509ff310a6d4

    *Body*:
        N/A

    *Expected results*:
        1. status code: 404.
        2. response: **JSON**
            {
                message: Something has gone wrong! Cascade delete error: session.
            }

    *Status*: Pass

- Test 3: Delete a session that has no exercises sub documents in the array.
    *Description*:
        Delete a session that has no exercises sub documents in the array so that the cascading deletion of related documents is empty.

    *Prerequisites*:
        1. At least one session document exists in the collection 'sessions'.

    *Route params*:
        :routineId = 679fd498dca2129f77c3f997   // your valid routine _id
        :sessionId = 67a12243de36509ff310a6d5   // your valid session _id

    *Body*:
        N/A
        
    *Expected results*:
        1. status code: 200.
        2. response: N/A.
        3. The session document is deleted from the collection 'sessions'.

    *Status*: Pass

- Test 4: Delete a session with exercises but the exercises have no comments.
    *Description*:
        Delete a session with exercises but the exercises have no comments. This will validate that the deletion of the exercises sub document in the targetted session document does not cause a conflict.

    *Prerequisites*:
        1. At least one session document exists in the collection 'sessions'.
        2. At least one exercise in the exercises sub document array of the session.

    *Route params*:
        :routineId = 679fd498dca2129f77c3f997   // your valid routine _id
        :sessionId = 67a12912cefe2281138f3e67   // your valid session _id

    *Body*:
        N/A
        
    *Expected results*:
        1. status code: 200.
        2. response: N/A.
        3. The session document is deleted from the collection 'sessions'.

    *Status*: Pass

- Test 5: Delete a session with exercises but the exercises have comments.
    *Description*:
        Delete a session with exercises but the exercises have comments. This will validate the cascading deletion where the exerciseIds are collected and then the comments that have reference to those exerciseIds are deleted from the collection 'comments'.

    *Prerequisites*:
        1. At least one session document exists in the collection 'sessions'.
        2. At least one exercise in the exercises sub document array of the session.
        3. At least one comment in the exercises sub document's comment sub document array. The comment also has a duplicate in the collection 'comments'.

    *Route params*:
        :routineId = 67969cbe4163742abfe4d7d5   // your valid routine _id
        :sessionId = 6796a5413cddc61acf7be05f   // your valid session _id

    *Body*:
        N/A
        
    *Expected results*:
        1. status code: 200.
        2. response: N/A.
        3. The session document is deleted from the collection 'sessions'.
        4. The comment document is deleted from the collection 'comments'.

    *Status*: Pass

*Internal test*
    To test transaction rollback, placed manually thrown errors inbetween mongoose calls to obsverse abortTransactions.

---

# ./routes/exercises
## GET : http://localhost:5000/api/v1/routines/:routineId/sessions/:sessionId/exercises/
*Prerequisites*:
    1. Successful login that returned a valid JWT.

- Test 1: Invalid session id.
    *Description*:
        In the request URL, provide a :sessionId of invalid length.

    *Route params*:
        :routineId = 679fd498dca2129f77c3f997   // your valid routine _id
        :sessionId = 67a12912cefe2281138f3e6

    *Body*:
        N/A

    *Expected results*:
        1. status code: 404.
        2. response: **JSON**
            {
                message: Id not found: 67a12912cefe2281138f3e6!
            }

    *Status*: Pass

- Test 2: session Id that does not exist.
    *Description*:
        In the request URL, provide a :sessionId that does not exist in the collection 'sessions'.

    *Route params*:
        :routineId = 679fd498dca2129f77c3f997   // your valid routine _id
        :sessionId = 67a12912cefe2281138f3e66

    *Body*:
        N/A

    *Expected results*:
        1. status code: 404.
        2. response: **JSON**
            {
                message: Err: Session not found!
            }

    *Status*: Pass

- Test 3: Valid session Id, but the exercises sub document is empty.
    *Description*:
        In the request URL, provide a valid :sessionId and the session document does not contain any exercises in the sub document array.

    *Route params*:
        :routineId = 679fd498dca2129f77c3f997   // your valid routine _id
        :sessionId = 67a12912cefe2281138f3e67   // your valid session _id

    *Body*:
        N/A

    *Expected results*:
        1. status code: 200.
        2. response: **JSON**
            {
                response: [],
                count: 0
            }

- Test 4: Valid session Id, but the exercises sub document has some items.
    *Description*:
        In the request URL, provide a valid :sessionId and the session document does contain any exercises in the sub document array.
        The response array should have the exercises sorted by order in ascending order, if the order is the same then it is updatedAt in descending order.

    *Route params*:
        :routineId = 679fd498dca2129f77c3f997   // your valid routine _id
        :sessionId = 67a12912cefe2281138f3e67   // your valid session _id

    *Body*:
        N/A

    *Expected results*:
        1. status code: 200.
        2. response: **JSON**
            {
                response: [exercises],
                count: 0
            }
        3. The response array should have the exercises sorted by order in ascending order, if the order is the same then it is updatedAt in descending order.

    *Status*: Pass

## POST : http://localhost:5000/api/v1/routines/:routineId/sessions/:sessionId/exercises/
*Prerequisites*:
    1. Successful login that returned a valid JWT.
    2. Valid route params: routineId and sessionId.

- Test 1: Attempt to create an exercise with missing "name".
    *Description*:
        In the request body, provide all the information but omit the "name" field.

    *Prerequisites*:
        1. At least one session document exists in the collection 'sessions'.

    *Route params*:
        :routineId = 679fd498dca2129f77c3f997   // your valid routine _id
        :sessionId = 67a12912cefe2281138f3e67   // your valid session _id

    *Body*:
        {
            "order": 1,
            "description": "DESCRIPTION", 
            "sets": 3,
            "repsOrDuration": "12",
            "restTimeSeconds": 90
        }
        
    *Expected results*:
        1. status code: 400.
        2. response: **JSON**
            {
                message: Please provide an exercise name!
            }
        3. No created exercise sub document in the session's exercises sub document array.

    *Status*: Pass

- Test 2: Attempt to create an exercise with no value for the key "name".
    *Description*:
        In the request body, provide all the information but the "name" value is empty.

    *Prerequisites*:
        1. At least one session document exists in the collection 'sessions'.

    *Route params*:
        :routineId = 679fd498dca2129f77c3f997   // your valid routine _id
        :sessionId = 67a12912cefe2281138f3e67   // your valid session _id

    *Body*:
        {
            "order": 1,
            "name": "",
            "description": "DESCRIPTION", 
            "sets": 3,
            "repsOrDuration": "12",
            "restTimeSeconds": 90
        }
        
    *Expected results*:
        1. status code: 400.
        2. response: **JSON**
            {
                message: Please provide an exercise name!
            }
        3. No created exercise sub document in the session's exercises sub document array.

    *Status*: Pass

- Test 3: Invalid length for "name" value. Max 50 characters.
    *Description*:
        In the request body, provide all the information and the "name" value is longer then 50 characters.

    *Prerequisites*:
        1. At least one session document exists in the collection 'sessions'.

    *Route params*:
        :routineId = 679fd498dca2129f77c3f997   // your valid routine _id
        :sessionId = 67a12912cefe2281138f3e67   // your valid session _id

    *Body*:
        {
            "order": 1,
            "name": "Lorem ipsum odor amet aawe Lorem ipsum odor amet aa",
            "description": "Lorem ipsum odor amet, consectetuer adipiscing elit. Odio erat suscipit taciti nullam ligula elit. Massa mattis cras habitasse nostra morbi ornare ex vel. Libero sodales ultrices feugiat vivamus ex mattis nam massa. Aliquet litora sem lacinia dictum venenatis urna suscipit ullamcorper consequat. Aliquam mattis dui mattis senectus eleifend phasellus tincidunt. Magna elit viverra facilisis varius quisque arcu magnis magnis. Torquent volutpat magna mi sollicitudin; sollicitudin massa dis litora. Integer sit sociosqu donec arcu ante mollis tortor. Sollicitudin feugiat nascetur fringilla commodo aliquet praesent nullam praesent.", 
            "sets": 3,
            "repsOrDuration": "12",
            "restTimeSeconds": 90
        }
        
    *Expected results*:
        1. status code: 400.
        2. response: **JSON**
            {
                message: Validation failed for the following fields: Please provide a name that is 50 or less characters!, Please provide a name that is 500 or less characters!
            }
        3. No created exercise sub document in the session's exercises sub document array.

    *Status*: Pass

- Test 4: Successfully create an exercise.
    *Description*:
        In the request body, provide all valid information.

    *Prerequisites*:
        1. At least one session document exists in the collection 'sessions'.

    *Route params*:
        :routineId = 679fd498dca2129f77c3f997   // your valid routine _id
        :sessionId = 67a12912cefe2281138f3e67   // your valid session _id

    *Body*:
        {
            "order": 1,
            "name": "exercise 1",
            "description": "DESCRIPTION", 
            "sets": 3,
            "repsOrDuration": "12",
            "restTimeSeconds": 90
        }
        
    *Expected results*:
        1. status code: 200.
        2. response: **JSON**
            The updated session document object.
        3. The session document is updated to include the new exercise in the exercises sub document array.

    *Status*: Pass

## GET : http://localhost:5000/api/v1/routines/:routineId/sessions/:sessionId/exercises/:exerciseId
*Prerequisites*:
    1. Successful login that returned a valid JWT.
    2. Valid route params: routineId and sessionId.

- Test 1: Provide invalid exerciseId.
    *Description*:
        In the request URL, provide a :exerciseId that is an invalid length.

    *Route params*:
        :routineId = 679fd498dca2129f77c3f997   // your valid routine _id
        :sessionId = 67a12912cefe2281138f3e67   // your valid session _id
        :exerciseId = 67a12f1aa86add8b2d09710

    *Body*:
        N/A

    *Expected results*:
        1. status code: 400.
        2. response: **JSON**
            {
                message: Id not found: 67a12f1aa86add8b2d09710!
            }

    *Status*: Pass

- Test 2: Provide exerciseId that does not exist.
    *Description*:
        In the request URL, provide an :exerciseId that does not exist in the session's exercises sub document array.

    *Route params*:
        :routineId = 679fd498dca2129f77c3f997   // your valid routine _id
        :sessionId = 67a12912cefe2281138f3e67   // your valid session _id
        :exerciseId = 67a12f1aa86add8b2d097104

    *Body*:
        N/A

    *Expected results*:
        1. status code: 400.
        2. response: **JSON**
            {
                message: Exercise not found!
            }

    *Status*: Pass

- Test 3: Provide valid exerciseId.
    *Description*:
        In the request URL, provide a valid :exerciseId that exists in the session's exercises sub document array.

    *Prerequisites*:
        1. An exercise was created within a session document.

    *Route params*:
        :routineId = 679fd498dca2129f77c3f997   // your valid routine _id
        :sessionId = 67a12912cefe2281138f3e67   // your valid session _id
        :exerciseId = 67a12f1aa86add8b2d097105  // your valid exercise _id

    *Body*:
        N/A

    *Expected results*:
        1. status code: 200.
        2. response: **JSON**
            exercise sub document object.

    *Status*: Pass

## PATCH : http://localhost:5000/api/v1/routines/:routineId/sessions/:sessionId/exercises/:exerciseId
*Prerequisites*:
    1. Successful login that returned a valid JWT.
    2. Valid route params: routineId and sessionId.

- Test 1: Provide invalid exerciseId.
    *Description*:
        In the request URL, provide a :exerciseId that is an invalid length.

    *Route params*:
        :routineId = 679fd498dca2129f77c3f997   // your valid routine _id
        :sessionId = 67a12912cefe2281138f3e67   // your valid session _id
        :exerciseId = 67a12f1aa86add8b2d09710

    *Body*:
        N/A

    *Expected results*:
        1. status code: 400.
        2. response: **JSON**
            {
                message: Id not found: 67a12f1aa86add8b2d09710!
            }

    *Status*: Pass

- Test 2: Provide exerciseId that does not exist.
    *Description*:
        In the request URL, provide an :exerciseId that does not exist in the session's exercises sub document array.

    *Route params*:
        :routineId = 679fd498dca2129f77c3f997   // your valid routine _id
        :sessionId = 67a12912cefe2281138f3e67   // your valid session _id
        :exerciseId = 67a12f1aa86add8b2d097104

    *Body*:
        N/A

    *Expected results*:
        1. status code: 400.
        2. response: **JSON**
            {
                message: Exercise not found!
            }

    *Status*: Pass

- Test 3: Update only the exercise info, exclude the "comments" key for the sub doc array.
    *Description*:
        In the request body, provide all valid information to update the exercise sub document. Exclude the "comments" field.

    *Prerequisites*:
        1. An exercise was created within a session document.

    *Route params*:
        :routineId = 679fd498dca2129f77c3f997   // your valid routine _id
        :sessionId = 67a12912cefe2281138f3e67   // your valid session _id
        :exerciseId = 67a12f1aa86add8b2d097105  // your valid exercise _id

    *Body*:
        {
            "order": 5,
            "name": "EXERCISE1",
            "description": "YEESH", 
            "sets": 5,
            "repsOrDuration": "6",
            "restTimeSeconds": 60
        }

    *Expected results*:
        1. status code: 200.
        2. response: **JSON**
            The updated exercise sub document object.
        3. The exercise sub document was updated in the session document.

    *Status*: Pass
        Before:
            {
                "response": {
                    "order": 1,
                    "name": "exercise 1",
                    "description": "DESCRIPTION",
                    "sets": 3,
                    "repsOrDuration": "12",
                    "restTimeSeconds": 90,
                    "_id": "67a12f1aa86add8b2d097105",
                    "comments": [],
                    "createdAt": "2025-02-03T21:03:22.305Z",
                    "updatedAt": "2025-02-03T21:03:22.305Z"
                }
            }

        After:
            response: 200
            {
                "response": {
                    "order": 5,
                    "name": "EXERCISE1",
                    "description": "YEESH",
                    "sets": 5,
                    "repsOrDuration": "6",
                    "restTimeSeconds": 60,
                    "_id": "67a12f1aa86add8b2d097105",
                    "comments": [],
                    "createdAt": "2025-02-03T21:03:22.305Z",
                    "updatedAt": "2025-02-04T00:04:58.276Z"
                }
            }

- Test 4: Update the exercise info, include the "comments" key for the sub doc array.
    *Description*:
        In the request body, provide all valid information to update the exercise sub document. Include the "comments" field.
        The comments should not be updated, no matter what value.

    *Prerequisites*:
        1. An exercise was created within a session document.

    *Route params*:
        :routineId = 67969cbe4163742abfe4d7d5   // your valid routine _id
        :sessionId = 6796a5413cddc61acf7be05f   // your valid session _id
        :exerciseId = 6796a9b30a23b77a579881e6  // your valid exercise _id

    *Body*:
        {
            "order": 2,
            "name": "EXERCISE 11",
            "description": "desc", 
            "sets": 3,
            "repsOrDuration": "8",
            "restTimeSeconds": 100,
            "comments": []
        }

    *Expected results*:
        1. status code: 200.
        2. response: **JSON**
            The updated exercise sub document object, but the comments value is not updated.
        3. The exercise sub document was updated in the session document, but the comments value is not updated.

    *Status*: Pass
        Before:
            {
                "response": {
                    "order": 5,
                    "name": "EXERCISE1",
                    "description": "YEESH",
                    "sets": 5,
                    "repsOrDuration": "6",
                    "restTimeSeconds": 60,
                    "_id": "67a12f1aa86add8b2d097105",
                    "comments": [],
                    "createdAt": "2025-02-03T21:03:22.305Z",
                    "updatedAt": "2025-02-04T00:04:58.276Z"
                }
            }
        
        After:
            response: 200
            {
                "response": {
                    "order": 2,
                    "name": "EXERCISE 11",
                    "description": "desc",
                    "sets": 3,
                    "repsOrDuration": "8",
                    "restTimeSeconds": 100,
                    "_id": "67a12f1aa86add8b2d097105",
                    "comments": [],
                    "createdAt": "2025-02-03T21:03:22.305Z",
                    "updatedAt": "2025-02-04T00:07:43.636Z"
                }
            }

## DELETE : http://localhost:5000/api/v1/routines/:routineId/sessions/:sessionId/exercises/:exerciseId
*Prerequisites*:
    1. Successful login that returned a valid JWT.
    2. Valid route params: routineId and sessionId.

- Test 1: Provide invalid exerciseId.
    *Description*:
        In the request URL, provide a :exerciseId that is an invalid length.

    *Route params*:
        :routineId = 679fd498dca2129f77c3f997   // your valid routine _id
        :sessionId = 67a12912cefe2281138f3e67   // your valid session _id
        :exerciseId = 67a12f1aa86add8b2d09710

    *Body*:
        N/A

    *Expected results*:
        1. status code: 200.
        2. response: N/A
        3. Nothing actually deleted.

    *Status*: Pass

- Test 2: Provide exerciseId that does not exist.
    *Description*:
        In the request URL, provide an :exerciseId that does not exist in the session's exercises sub document array.

    *Route params*:
        :routineId = 679fd498dca2129f77c3f997   // your valid routine _id
        :sessionId = 67a12912cefe2281138f3e67   // your valid session _id
        :exerciseId = 67a12f1aa86add8b2d097104

    *Body*:
        N/A

    *Expected results*:
        1. status code: 200.
        2. response: N/A
        3. Nothing actually deleted.

    *Status*: Pass

- Test 3: Delete exercise with no comments.
    *Description*:
        In the request URL, provide an :exerciseId that does exist in the session's exercises sub document array. That document should have an empty comments sub document array.

    *Prerequisites*:
        1. An exercise was created within a session document.

    *Route params*:
        :routineId = 679fd498dca2129f77c3f997   // your valid routine _id
        :sessionId = 67a12912cefe2281138f3e67   // your valid session _id
        :exerciseId = 67a16059416c3846e3bb145c  // your valid exercise _id

    *Body*:
        N/A

    *Expected results*:
        1. status code: 200.
        2. response: N/A
        3. The exercise sub document has been deleted in the session document.

    *Status*: Pass

- Test 4: Delete exercise with comments. Will delete comments with the exercise id in the collection 'comments'.
    *Description*:
        In the request URL, provide an :exerciseId that does exist in the session's exercises sub document array. That document should have an non-empty comments sub document array.

    *Prerequisites*:
        1. An exercise was created within a session document.
        2. 1 or more comments created for the exercise. A comment in the exercise's comments sub document array has a duplicate in the collection 'comments'.
        3. Record the exercise _id and comment _id.

    *Route params*:
        :routineId = 679fd498dca2129f77c3f997   // your valid routine _id
        :sessionId = 67a12912cefe2281138f3e67   // your valid session _id
        :exerciseId = 67a16059416c3846e3bb145c  // your valid exercise _id

    *Body*:
        N/A

    *Expected results*:
        1. status code: 200.
        2. response: N/A
        3. The exercise sub document has been deleted in the session document.
        4. The reference comments have been deleted from the collection 'comments'.

    *Status*: Pass
        Before:
            Exercise id = 67a16059416c3846e3bb145c
            Comment Ids = [67a1664ce6f51a0420d4aa45, 67a16653e6f51a0420d4aa4f, 67a16677e6f51a0420d4aa5a, 67a16696e6f51a0420d4aa65]

*Internal test*
    To test transaction rollback, placed manually thrown errors inbetween mongoose calls to obsverse abortTransactions.

---

# ./routes/comments
## GET : http://localhost:5000/api/v1/routines/:routineId/sessions/:sessionId/exercises/:exerciseId/comments/
*Prerequisites*:
    1. Successful login that returned a valid JWT.
    2. Valid route params: routineId and sessionId.

- Test 1: Invalid route param :exerciseId.
    *Description*:
        In the request URL, provide an :exercide Id that is an invalid length.

    *Route params*:
        :routineId = 679fd498dca2129f77c3f997   // your valid routine _id
        :sessionId = 67a12912cefe2281138f3e67   // your valid session _id
        :exerciseId = 67a27615efc925fa402a2b0

    *Body*:
        N/A

    *Expected results*:
        1. status code: 404.
        2. response: **JSON**
            {
                message: Err: Exercise not found!
            }

    *Status*: Pass

- Test 2: Route param :exerciseId that does not exist.
    *Description*:
        In the request URL, provide an :exercide Id that is valid length but does not exist in the session's exercises sub document array.

    *Route params*:
        :routineId = 679fd498dca2129f77c3f997   // your valid routine _id
        :sessionId = 67a12912cefe2281138f3e67   // your valid session _id
        :exerciseId = 67a27615efc925fa402a2b01  

    *Body*:
        N/A

    *Expected results*:
        1. status code: 404.
        2. response: **JSON**
            {
                message: Err: Exercise not found!
            }

    *Status*: Pass

- Test 3: Valid route param :exerciseId.
    *Description*:
        In the request URL, provide a valid :exerciseId.

    *Route params*:
        :routineId = 679fd498dca2129f77c3f997   // your valid routine _id
        :sessionId = 67a12912cefe2281138f3e67   // your valid session _id
        :exerciseId = 67a27615efc925fa402a2b02  // your valid exercise _id.

    *Body*:
        N/A

    *Expected results*:
        1. status code: 200.
        2. response: **JSON**
            {
                response: [array of comment document objects],
                count: doc count int
            }

    *Status*: Pass

## POST : http://localhost:5000/api/v1/routines/:routineId/sessions/:sessionId/exercises/:exerciseId/comments/
*Prerequisites*:
    1. Successful login that returned a valid JWT.
    2. Valid route params: routineId, sessionId, and exerciseId.

- Test 1: Invalid route param :exerciseId.
    *Description*:
        In the request URL, provide an :exercide Id that is an invalid length.

    *Route params*:
        :routineId = 679fd498dca2129f77c3f997   // your valid routine _id
        :sessionId = 67a12912cefe2281138f3e67   // your valid session _id
        :exerciseId = 67a27615efc925fa402a2b0

    *Body*:
        N/A

    *Expected results*:
        1. status code: 404.
        2. response: **JSON**
            {
                message: Err: Exercise not found!
            }

    *Status*: Pass

- Test 2: Route param :exerciseId that does not exist.
    *Description*:
        In the request URL, provide an :exercide Id that is valid length but does not exist in the session's exercises sub document array.

    *Route params*:
        :routineId = 679fd498dca2129f77c3f997   // your valid routine _id
        :sessionId = 67a12912cefe2281138f3e67   // your valid session _id
        :exerciseId = 67a27615efc925fa402a2b01  

    *Body*:
        N/A

    *Expected results*:
        1. status code: 404.
        2. response: **JSON**
            {
                message: Err: Exercise not found!
            }

    *Status*: Pass

- Test 3: Length validation for comment (<= 500 characters).
    *Description*:
        In the request body, provide a value for the "text" field that is more than 500 characters.

    *Route params*:
        :routineId = 67969cbe4163742abfe4d7d5   // your valid routine _id
        :sessionId = 6796a5413cddc61acf7be05f   // your valid session _id
        :exerciseId = 6796a9b30a23b77a579881e6  // your valid exercise _id

    *Body*:
        {
            "text": "Lorem ipsum odor amet, consectetuer adipiscing elit. Odio erat suscipit taciti nullam ligula elit. Massa mattis cras habitasse nostra morbi ornare ex vel. Libero sodales ultrices feugiat vivamus ex mattis nam massa. Aliquet litora sem lacinia dictum venenatis urna suscipit ullamcorper consequat. Aliquam mattis dui mattis senectus eleifend phasellus tincidunt. Magna elit viverra facilisis varius quisque arcu magnis magnis. Torquent volutpat magna mi sollicitudin; sollicitudin massa dis litora. Integer sit sociosqu donec arcu ante mollis tortor. Sollicitudin feugiat nascetur fringilla commodo aliquet praesent nullam praesent."
        }

    *Expected results*:
        1. status code: 400.
        2. response: **JSON**
            {
                message: Something has gone wrong! err: Comment validation failed: text: Please provide a comment that is 500 characters or less!
            }  
        3. No comment created in the collection 'comments' and comment sub document in the exercise.

    *Status*: Pass

- Test 4: Create a valid comment.
    *Description*:
        In the request body, provide a value for the "text" field that is less than 500 characters.

    *Route params*:
        :routineId = 679fd498dca2129f77c3f997   // your valid routine _id
        :sessionId = 67a12912cefe2281138f3e67   // your valid session _id
        :exerciseId = 67a27615efc925fa402a2b02  // your valid exercise _id

    *Body*:
        {
            "text": "This is a comment!"
        }

    *Expected results*:
        1. status code: 200.
        2. response: **JSON**
            {
                response: the comment's document object.
            }  
        3. The comment is created in the collection 'comments'
        4. In the session's exercises sub document array, the comment is created.

    *Status*: Pass

- Test 5: Create more than 3 comments for a single exercise.
    *Description*:
        The exercise's comment sub document array will only hold maximum 3 most recently added comments. Therefore, add more than 3 comments for a single exercise to validate that in the exercise's comments sub document array only hold the 3 most recently created ordered desc createdAt and that the collection 'comments' holds all the comments.

    *Steps*:
        1. Add 3 comments, record the comment Ids.
        2. Add the 4th comment.
        
    *Expected results*:
        1. The exercise's comment sub document array will only contain the 3 most recently created comments ordered desc createdAt.
        2. The collection 'comments' will have all 4 comments.

    *Status*: Pass

        67a27eefe2c6979e183ed5ce    4th
        67a27d87e2c6979e183ed5c2    3rd
        67a27bcfb9615d5a753cafc5    2nd
        67a27636efc925fa402a2b0c    1st

        exercise's comment sub document array
            67a27eefe2c6979e183ed5ce    4th
            67a27d87e2c6979e183ed5c2    3rd
            67a27bcfb9615d5a753cafc5    2nd

## GET : http://localhost:5000/api/v1/routines/:routineId/sessions/:sessionId/exercises/:exerciseId/comments/:commentId
*Prerequisites*:
    1. Successful login that returned a valid JWT.
    2. Valid route params: routineId, sessionId, and exerciseId.

- Test 1: Invalid comment Id.
    *Description*:
        In the request URL, provide a :commentId that is an invalid length.

    *Route params*:
        :routineId = 679fd498dca2129f77c3f997   // your valid routine _id
        :sessionId = 67a12912cefe2281138f3e67   // your valid session _id
        :exerciseId = 67a27615efc925fa402a2b02  // your valid exercise _id
        :commentId = 67a27636efc925fa402a2b0

    *Body*:
        N/A

    *Expected results*:
        1. status code: 404
        2. response: **JSON**
            {
                message: Id not found: 67a27636efc925fa402a2b0!
            }

    *Status*: Pass

- Test 2: Comment Id that does not exist.
    *Description*:
        In the request URL, provide a :commentId that is valid length but does not exist in the collection 'comments'.

    *Route params*:
        :routineId = 679fd498dca2129f77c3f997   // your valid routine _id
        :sessionId = 67a12912cefe2281138f3e67   // your valid session _id
        :exerciseId = 67a27615efc925fa402a2b02  // your valid exercise _id
        :commentId = 67a27636efc925fa402a2b0a

    *Body*:
        N/A

    *Expected results*:
        1. status code: 404
        2. response: **JSON**
            {
                message: Comment not found!
            }

    *Status*: Pass

- Test 3: Comment Id that does exist.
    *Description*:
        In the request URL, provide a :commentId that does exist in the collection 'comments'.

    *Prerequisites*:
        1. Exercise contains at least 1 comment

    *Route params*:
        :routineId = 679fd498dca2129f77c3f997   // your valid routine _id
        :sessionId = 67a12912cefe2281138f3e67   // your valid session _id
        :exerciseId = 67a27615efc925fa402a2b02  // your valid exercise _id
        :commentId = 67a27636efc925fa402a2b0c   // your valid comment _id

    *Body*:
        N/A

    *Expected results*:
        1. status code: 200
        2. response: **JSON**
            {
                response: the comment document object.
            }

    *Status*: Pass

## PATCH : http://localhost:5000/api/v1/routines/:routineId/sessions/:sessionId/exercises/:exerciseId/comments/:commentId
*Prerequisites*:
    1. Successful login that returned a valid JWT.
    2. Valid route params: routineId, sessionId, and exerciseId.

- Test 1: Update commentId that is invalid.
    *Description*:
        In the request URL, provide a :commentId that is an invalid length.

    *Route params*:
        :routineId = 679fd498dca2129f77c3f997   // your valid routine _id
        :sessionId = 67a12912cefe2281138f3e67   // your valid session _id
        :exerciseId = 67a27615efc925fa402a2b02  // your valid exercise _id
        :commentId = 67a27eefe2c6979e183ed5c

    *Body*:
        {
            "text": "hi comment change"
        }

    *Expected results*:
        1. status code: 404
        2. response: **JSON**
            {
                message: Id not found: 67a27eefe2c6979e183ed5c!
            }

    *Status*: Pass

- Test 2: Update comment that does not exist.
    *Description*:
        In the request URL, provide a :commentId that is a valid length, but does not exist in the collection 'comments'.

    *Route params*:
        :routineId = 679fd498dca2129f77c3f997   // your valid routine _id
        :sessionId = 67a12912cefe2281138f3e67   // your valid session _id
        :exerciseId = 67a27615efc925fa402a2b02  // your valid exercise _id
        :commentId = 67a27636efc925fa402a2b0a

    *Body*:
        {
            "text": "hi comment change"
        }

    *Expected results*:
        1. status code: 404
        2. response: **JSON**
            {
                message: Comment not found!
            }

    *Status*: Pass

- Test 3: Update comment that does exist, but not in an exercise's comments sub document array.
    *Description*:
        In the request URL, provide a :commentId that is a valid length and does exist in the collection 'comments', but does not exist in an exercise's comments sub document array.
        Since an exercise's comments sub document only holds the 3 most recently created comments ordered desc createdAt, at least 4 comments for an exercise must be created.

    *Prerequisites*:
        1. For an exerciseId create 4 comments and then get the commentId that is no longer included in the exercise's comments sub document array but does exist in the collection 'comments' that has the exerciseId as a reference.

    *Route params*:
        :routineId = 679fd498dca2129f77c3f997   // your valid routine _id
        :sessionId = 67a12912cefe2281138f3e67   // your valid session _id
        :exerciseId = 67a27615efc925fa402a2b02  // your valid exercise _id
        :commentId = 67a27636efc925fa402a2b0ce   // your valid comment _id

    *Body*:
        {
            "text": "hi comment change"
        }

    *Expected results*:
        1. status code: 200
        2. response: **JSON**
            {
                response: the comment document object
            }
        3. The comment is updated in the collection 'comments'.

    *Status*: Pass

- Test 4: Update comment that does exist and in an exercise's comments sub document array.
    *Description*:
        In the request URL, provide a :commentId that does exist in the collection 'comments' and exist in an exercise's comments sub document array.

    *Prerequisites*:
        1. For an exerciseId select or create a comment that exists both in the collection 'comments' and in the exercise's comments sub document array.

    *Route params*:
        :routineId = 679fd498dca2129f77c3f997   // your valid routine _id
        :sessionId = 67a12912cefe2281138f3e67   // your valid session _id
        :exerciseId = 67a27615efc925fa402a2b02  // your valid exercise _id
        :commentId = 67a27d87e2c6979e183ed5c2   // your valid comment _id

    *Body*:
        {
            "text": "hi comment change"
        }

    *Expected results*:
        1. status code: 200
        2. response: **JSON**
            {
                response: the comment document object
            }
        3. The comment is updated in the collection 'comments'.
        4. The comment is updated in the collection 'sessions' session document -> exercise sub document -> comments sub document.

    *Status*: Pass

*Internal test*
    To test transaction rollback, placed manually thrown errors inbetween mongoose calls to obsverse abortTransactions.

--

## DELETE : http://localhost:5000/api/v1/routines/:routineId/sessions/:sessionId/exercises/:exerciseId/comments/:commentId
*Prerequisites*:
    1. Successful login that returned a valid JWT.
    2. Valid route params: routineId, sessionId, and exerciseId.

- Test 1: Delete commentId that is invalid.
    *Description*:
        In the request URL, provide a :commentId that is an invalid length.

    *Route params*:
        :routineId = 679fd498dca2129f77c3f997   // your valid routine _id
        :sessionId = 67a12912cefe2281138f3e67   // your valid session _id
        :exerciseId = 67a27615efc925fa402a2b02  // your valid exercise _id
        :commentId = 67a27d87e2c6979e183ed5c

    *Body*:
        N/A

    *Expected results*:
        1. status code: 404
        2. response: **JSON**
            {
                message: Id not found: 67a27d87e2c6979e183ed5c!
            }

    *Status*: Pass

- Test 2: Delete comment that does not exist.
    *Description*:
        In the request URL, provide a :commentId that does not exist in the collection 'comments'.

    *Route params*:
        :routineId = 679fd498dca2129f77c3f997   // your valid routine _id
        :sessionId = 67a12912cefe2281138f3e67   // your valid session _id
        :exerciseId = 67a27615efc925fa402a2b02  // your valid exercise _id
        :commentId = 67a27d87e2c6979e183ed5c3

    *Body*:
        N/A

    *Expected results*:
        1. status code: 400
        2. response: **JSON**
            {
                message: Cascade delete error: comment.
            }

    *Status*: Pass

- Test 3: Delete comment that does exist in the collection 'comments', but does not in an exercise's comments sub document array.
    *Description*:
        Delete comment that does exist in the collection 'comments', but does not in an exercise's comments sub document array.

    *Prerequisites*:
        1. An exercise must have at least 1 comment that exists in the collection 'comments' that does not exist in the exercise's comments sub document array.

    *Route params*:
        :routineId = 679fd498dca2129f77c3f997   // your valid routine _id
        :sessionId = 67a12912cefe2281138f3e67   // your valid session _id
        :exerciseId = 67a27615efc925fa402a2b02  // your valid exercise _id
        :commentId = 67a27636efc925fa402a2b0c   // your valid comment _id

    *Body*:
        N/A

    *Expected results*:
        1. status code: 200
        2. response: N/A
        3. document deleted from the collection 'comments'.

    *Status*: Pass

- Test 3: Delete comment that does exist in the collection 'comments' and also in the exercise's comments sub document array.
    *Description*:
        Delete comment that does exist in the collection 'comments' and also in the exercise's comments sub document array.

    *Prerequisites*:
        1. An exercise must have at least 4 comments, so that in its comments sub document array has 3 and the duplicates in the collection 'comments'.

    *Route params*:
        :routineId = 679fd498dca2129f77c3f997   // your valid routine _id
        :sessionId = 67a12912cefe2281138f3e67   // your valid session _id
        :exerciseId = 67a27615efc925fa402a2b02  // your valid exercise _id
        :commentId = 67a52c21d442e50a5187f887   // your valid comment _id

    *Body*:
        N/A

    *Expected results*:
        1. status code: 200
        2. response: N/A
        3. document deleted from the collection 'comments'.
        4. document deleted from the exercise's comments sub document array and maintains 3 comments deleting the target and replacing with the 4th.

    *Status*: Pass

*Internal test*
    To test transaction rollback, placed manually thrown errors inbetween mongoose calls to obsverse abortTransactions.