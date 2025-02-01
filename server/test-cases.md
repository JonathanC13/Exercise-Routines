# ./routes/auth
## POST : http://localhost:5000/api/v1/auth/register
- Test 1: Missing key "name"
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

- Test 2: Missing key "email"
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

- Test 3: Missing key "password"
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
                message: Validation failed for the following fields: Please provide a name!, Please provide an email!, Please provide a password!
            }
        3. No user document created in collection 'users'.

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

## POST : http://localhost:5000/api/v1/auth/login
*Prerequisites*:
    1. At least one account successfully registered.

- Test 1: Missing key "email"
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

- Test 2: Missing key "password"
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

---

# ./routes/routines
## GET : http://localhost:5000/api/v1/routines/
*Prerequisites*:
    1. Successful login that returned a valid JWT.

- Text X: Current user has 0 routines and GET requested.
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

- Text X: Get all routines that were created by the current user.
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

## POST : http://localhost:5000/api/v1/routines/
*Prerequisites*:
    1. Successful login that returned a valid JWT.

- Text X: Missing key "name"
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

- Text X: Empty value for key "name".
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
                message: Validation failed for the following fields: Please provide a name!
            }
        3. In the cluster 'Exercise-Routines', no created document in the collection 'routines'.

- Test X: Value for key "name" is longer than 50 characters and description is longer than 8000 characters.
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

- Test X: Successful creation
    *Route params*: 
        N/A

    *Body*: **JSON**
        {
            "order": 1,
            "name": "new routine",
            "description": "My first routine"
        }

    *Expected results*:
        1. status code: 201.
        2. response: The object of the created document.
        3. In the cluster 'Exercise-Routines', a new document is created in the collection 'routines' with the exact values in the request.

## GET : http://localhost:5000/api/v1/routines/:routineId
*Prerequisites*:
    1. Successful login that returned a valid JWT.

- Test X: Invalid routine id.
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

- Test X: Id that does not exist.
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

- Test X: Successful get with Id that does exist.
    *Prerequisites*:
        1. At least one routine document exists in the collection 'routines'.

    *Route params*:
        :routineId = 67969cbe4163742abfe4d7d5   // your valid routine _id

    *Body*:
        N/A

    *Expected results*:
        1. status code: 200.
        2. response: **JSON**
            The document of the routine.

## PATCH : http://localhost:5000/api/v1/routines/:routineId
*Prerequisites*:
    1. Successful login that returned a valid JWT.

- Test X: Missing :routineId
    *Route params*:
        :routineid = ''

    *Body*:
        N/A

    *Expected results*:
        1. status code: 400.
        2. response: **JSON**
            {
                message: Missing routine id!
            }

- Test X: Invalid routine id
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

- Test X: Id that does not exist.
    *Route params*:
        :routineId = 67969cbe4163742abfe4d7dA

    *Body*:
        N/A

    *Expected results*:
        1. status code: 404.
        2. response: **JSON**
            {
                message: That routine does not exist!
            }

- Test X: Successful update with Id that does exist.
    *Prerequisites*:
        1. At least one routine document exists in the collection 'routines'.
        2. Record createdAt and updatedAt values.

    *Route params*:
        :routineId = 67969cbe4163742abfe4d7d5   // your valid routine _id

    *Body*:
        {
            "order": 1,
            "name": "NEW ROUTINE",
            "description": "My first routine ??"
        }

    *Expected results*:
        1. status code: 200.
        2. response: **JSON**
            The document of the updated routine.
        3. The routine document is updated in the collection 'routines'.
        4. createdAt value remains unchanged.
        5. updatedAt changes to current time, account for timezone.

## DELETE : http://localhost:5000/api/v1/routines/:routineId
*Prerequisites*:
    1. Successful login that returned a valid JWT.

- Test X: Missing :routineId
    *Route params*:
        :routineid = ''

    *Body*:
        N/A

    *Expected results*:
        1. status code: 400.
        2. response: **JSON**
            {
                message: Missing routine id!
            }

- Test X: Invalid routine id
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

- Test X: Id that does not exist.
    *Route params*:
        :routineId = 67969cbe4163742abfe4d7dA

    *Body*:
        N/A

    *Expected results*:
        1. status code: 404.
        2. response: **JSON**
            {
                message: That routine does not exist!
            }

- Test X: Delete a routine that has no additional related documents in other collections.
    *Prerequisites*:
        1. Create a routine document.

    *Route params*:
        :routineId = 67969cbe4163742abfe4d7d5   // your valid routine _id

    *Body*:
        N/A

    *Expected results*:
        1. status code: 200.
        2. response: N/A
        3. The document is deleted from the collection 'routines'.

- Test X: Delete a routine that has related session documents in the collection 'sessions'.
    *Prerequisites*:
        1. Create a routine document.
        2. Create 2 session document that references the routine document id.

    *Route params*:
        :routineId = 67969cbe4163742abfe4d7d5   // your valid routine _id

    *Body*:
        N/A

    *Expected results*:
        1. status code: 200.
        2. response: N/A
        3. The routine document is deleted from the collection 'routines'.
        4. The session documents with the routineId referenced are deleted from the collection 'sessions'.

- Test X: Delete a routine that has related session documents and those sessions have sub documents of exercises.
    *Prerequisites*:
        1. Create a routine document.
        2. Create 2 session document that references the routine document id.
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

- Test X: Delete a routine that has related session documents and those sessions have sub documents of exercises and some of the exercises have comments in a subset pattern.
    *Prerequisites*:
        1. Create a routine document.
        2. Create 2 session document that references the routine document id.
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

---

# ./routes/sessions
## GET : http://localhost:5000/api/v1/routines/:routineId/sessions/
*Prerequisites*:
    1. Successful login that returned a valid JWT.

- Text X: Get sessions with an empty routineid.
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

- Test X: Get sessions with invalid routine id
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

- Test X: Get sessions with Id that does not exist.
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

- Test X: Get sessions of a routine with an existing routine id.
    *Prerequisites*:
        1. A routine exitsts.
        2. A session exists with a routineId that references the routine document.

    *Route params*:
        :routineId = 67969cbe4163742abfe4d7d5   // your valid routine _id

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

## POST : http://localhost:5000/api/v1/routines/:routineId/sessions/
*Prerequisites*:
    1. Successful login that returned a valid JWT.

- Test X: Missing key "name".
    *Route params*:
        :routineId = 67969cbe4163742abfe4d7d5   // your valid routine _id

    *Body*:
        {
            "order": 2,
            "description": "description111"
        }

    *Expected results*:
        1. status code: 400.
        2. response: **JSON**
            {
                message: Please provide a session name!
            }
        3. No session document created in collection 'sessions'.

- Test X: Empty value for key "name".
    *Route params*:
        :routineId = 67969cbe4163742abfe4d7d5   // your valid routine _id

    *Body*:
        {
            "order": 2,
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

- Test X: Invalid lengths for name (> 50 characters) and descriptions (> 500 characters).
    *Route params*:
        :routineId = 67969cbe4163742abfe4d7d5   // your valid routine _id

    *Body*:
        {
            "order": 2,
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

- Test X: Successfully create a session.
    *Route params*:
        :routineId = 67969cbe4163742abfe4d7d5   // your valid routine _id

    *Body*:
        {
            "order": 2,
            "name": "my first session",
            "description": "description111"
        }

    *Expected results*:
        1. status code: 200.
        2. response: **JSON**
            created document object
        3. Session document created in collection 'sessions'.

## GET : http://localhost:5000/api/v1/routines/:routineId/sessions/:sessionId
*Prerequisites*:
    1. Successful login that returned a valid JWT.

- Test X: Invalid session id.
    *Route params*:
        :routineId = 67969cbe4163742abfe4d7d5   // your valid routineId
        :sessionId = 6796a5413cddc61acf7be05

    *Body*:
        N/A

    *Expected results*:
        1. status code: 404.
        2. response: **JSON**
            {
                message: Id not found: 6796a5413cddc61acf7be05!
            }

- Test X: session id that does not exist.
    *Route params*:
        :routineId = 67969cbe4163742abfe4d7d5   // your valid routineId
        :sessionId = 6796a5413cddc61acf7be05A

    *Body*:
        N/A

    *Expected results*:
        1. status code: 404.
        2. response: **JSON**
            {
                message: Session not found!
            }

- Test X: session id that does exist.
    *Prerequisites*:
        1. At least one session document exists in the collection 'sessions'.

    *Route params*:
        :routineId = 67969cbe4163742abfe4d7d5   // your valid routine _id
        :sessionId = 6796a5413cddc61acf7be05f   // your valid session _id

    *Body*:
        N/A

    *Expected results*:
        1. status code: 200.
        2. response: **JSON**
            The document of the session.

## PATCH : http://localhost:5000/api/v1/routines/:routineId/sessions/:sessionId
*Prerequisites*:
    1. Successful login that returned a valid JWT.

- Test X: Update session info excluding the exercises sub document.
    *Prerequisites*:
        1. At least one session document exists in the collection 'sessions'.
        2. Record createdAt and updatedAt values.

    *Route params*:
        :routineId = 67969cbe4163742abfe4d7d5   // your valid routine _id
        :sessionId = 6796a5413cddc61acf7be05f   // your valid session _id

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

- Test X: Specific test for attempting to update exercises subdoc.
    *Prerequisites*:
        1. At least one session document exists in the collection 'sessions'.
        2. At least one exercise document exists in the exercises sub document.
        3. Record the information in the exercises sub document.

    *Route params*:
        :routineId = 67969cbe4163742abfe4d7d5   // your valid routine _id
        :sessionId = 6796a5413cddc61acf7be05f   // your valid session _id

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

## DELETE : http://localhost:5000/api/v1/routines/67969cbe4163742abfe4d7d5/sessions/:sessionId
*Prerequisites*:
    1. Successful login that returned a valid JWT.

- Test X: Delete a session that has no exercises sub documents in the array.
    *Prerequisites*:
        1. At least one session document exists in the collection 'sessions'.

    *Route params*:
        :routineId = 67969cbe4163742abfe4d7d5   // your valid routine _id
        :sessionId = 6796a5413cddc61acf7be05f   // your valid session _id

    *Body*:
        N/A
        
    *Expected results*:
        1. status code: 200.
        2. response: N/A.
        3. The session document is deleted from the collection 'sessions'.

- Test X: Delete a session with exercises but the exercises have no comments.
    *Prerequisites*:
        1. At least one session document exists in the collection 'sessions'.
        2. At least one exercise in the exercises sub document array of the session.

    *Route params*:
        :routineId = 67969cbe4163742abfe4d7d5   // your valid routine _id
        :sessionId = 6796a5413cddc61acf7be05f   // your valid session _id

    *Body*:
        N/A
        
    *Expected results*:
        1. status code: 200.
        2. response: N/A.
        3. The session document is deleted from the collection 'sessions'.

- Test X: Delete a session with exercises but the exercises have comments.
    *Prerequisites*:
        1. At least one session document exists in the collection 'sessions'.
        2. At least one exercise in the exercises sub document array of the session.
        3. At least one comment in the exercises sub document's comment sub document array. The comment also has a duplicate in the collection 'comments'

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

---

# ./routes/exercises
## GET : http://localhost:5000/api/v1/routines/:routineId/sessions/:sessionId/exercises/
*Prerequisites*:
    1. Successful login that returned a valid JWT.

- Test X: Invalid session id
    *Route params*:
        :routineId = 67969cbe4163742abfe4d7d5   // your valid routine _id
        :sessionId = 6796a5413cddc61acf7be05

    *Body*:
        N/A

    *Expected results*:
        1. status code: 404.
        2. response: **JSON**
            {
                message: Id not found: 6796a5413cddc61acf7be05!
            }

- Test X: session Id that does not exist.
    *Route params*:
        :routineId = 67969cbe4163742abfe4d7d5   // your valid routine _id
        :sessionId = 6796a5413cddc61acf7be05A

    *Body*:
        N/A

    *Expected results*:
        1. status code: 200.
        2. response: **JSON**
            {
                response: [],
                count: 0
            }

- Test X: Valid session Id.
    *Route params*:
        :routineId = 67969cbe4163742abfe4d7d5   // your valid routine _id
        :sessionId = 6796a5413cddc61acf7be05f   // your valid session _id

    *Body*:
        N/A

    *Expected results*:
        1. status code: 200.
        2. response: **JSON**
            {
                response: [exercises],
                count: 0
            }

## POST : http://localhost:5000/api/v1/routines/:routineId/sessions/:sessionId/exercises/
*Prerequisites*:
    1. Successful login that returned a valid JWT.
    2. Valid route params: routineId and sessionId.

- Test X: Attempt to create an exercise with missing "name".
    *Prerequisites*:
        1. At least one session document exists in the collection 'sessions'.

    *Route params*:
        :routineId = 67969cbe4163742abfe4d7d5   // your valid routine _id
        :sessionId = 6796a5413cddc61acf7be05f   // your valid session _id

    *Body*:
        {
            "order": 3,
            "description": "DESSS1111", 
            "sets": 10,
            "repsOrDuration": "6",
            "restTimeSeconds": 90
        }
        
    *Expected results*:
        1. status code: 400.
        2. response: **JSON**
            {
                message: Please provide an exercise name!
            }
        3. No created exercise sub document in the session's exercises sub document array.

- Test X: Attempt to create an exercise with no value for the key "name".
    *Prerequisites*:
        1. At least one session document exists in the collection 'sessions'.

    *Route params*:
        :routineId = 67969cbe4163742abfe4d7d5   // your valid routine _id
        :sessionId = 6796a5413cddc61acf7be05f   // your valid session _id

    *Body*:
        {
            "order": 3,
            "name": "",
            "description": "DESSS1111",
            "sets": 10,
            "repsOrDuration": "6",
            "restTimeSeconds": 90
        }
        
    *Expected results*:
        1. status code: 400.
        2. response: **JSON**
            {
                message: Please provide an exercise name!
            }
        3. No created exercise sub document in the session's exercises sub document array.

- Test X: Invalid length for "name" value. Max 50 characters.
    *Prerequisites*:
        1. At least one session document exists in the collection 'sessions'.

    *Route params*:
        :routineId = 67969cbe4163742abfe4d7d5   // your valid routine _id
        :sessionId = 6796a5413cddc61acf7be05f   // your valid session _id

    *Body*:
        {
            "order": 3,
            "name": "Lorem ipsum odor amet aawe Lorem ipsum odor amet aa",
            "description": "Lorem ipsum odor amet, consectetuer adipiscing elit. Odio erat suscipit taciti nullam ligula elit. Massa mattis cras habitasse nostra morbi ornare ex vel. Libero sodales ultrices feugiat vivamus ex mattis nam massa. Aliquet litora sem lacinia dictum venenatis urna suscipit ullamcorper consequat. Aliquam mattis dui mattis senectus eleifend phasellus tincidunt. Magna elit viverra facilisis varius quisque arcu magnis magnis. Torquent volutpat magna mi sollicitudin; sollicitudin massa dis litora. Integer sit sociosqu donec arcu ante mollis tortor. Sollicitudin feugiat nascetur fringilla commodo aliquet praesent nullam praesent.",
            "sets": 10,
            "repsOrDuration": "6",
            "restTimeSeconds": 90
        }
        
    *Expected results*:
        1. status code: 400.
        2. response: **JSON**
            {
                message: Please provide a name that is 50 or less characters!, Please provide a description that is 500 or less characters!
            }
        3. No created exercise sub document in the session's exercises sub document array.

- Test X: Successfully create an exercise.
    *Prerequisites*:
        1. At least one session document exists in the collection 'sessions'.

    *Route params*:
        :routineId = 67969cbe4163742abfe4d7d5   // your valid routine _id
        :sessionId = 6796a5413cddc61acf7be05f   // your valid session _id

    *Body*:
        {
            "order": 3,
            "name": "Lorem ipsum odor",
            "description": "Lorem ipsum odor amet",
            "sets": 10,
            "repsOrDuration": "6",
            "restTimeSeconds": 90
        }
        
    *Expected results*:
        1. status code: 200.
        2. response: **JSON**
            The updated session document object.
        3. The session document is updated to include the new exercise in the exercises sub document array.

## GET : http://localhost:5000/api/v1/routines/:routineId/sessions/:sessionId/exercises/:exerciseId
*Prerequisites*:
    1. Successful login that returned a valid JWT.
    2. Valid route params: routineId and sessionId.

- Test X: Provide invalid exerciseId
    *Route params*:
        :routineId = 67969cbe4163742abfe4d7d5   // your valid routine _id
        :sessionId = 6796a5413cddc61acf7be05f   // your valid session _id
        :exerciseId = 6796a9b30a23b77a579881e

    *Body*:
        N/A

    *Expected results*:
        1. status code: 400.
        2. response: **JSON**
            {
                message: Id not found: 6796a9b30a23b77a579881e!
            }

- Test X: Provide exerciseId that does not exist.
    *Route params*:
        :routineId = 67969cbe4163742abfe4d7d5   // your valid routine _id
        :sessionId = 6796a5413cddc61acf7be05f   // your valid session _id
        :exerciseId = 6796a9b30a23b77a579881eA

    *Body*:
        N/A

    *Expected results*:
        1. status code: 400.
        2. response: **JSON**
            {
                message: Exercise not found!
            }

- Test X: Provide valid exerciseId
    *Prerequisites*:
        1. An exercise was created within a session document.

    *Route params*:
        :routineId = 67969cbe4163742abfe4d7d5   // your valid routine _id
        :sessionId = 6796a5413cddc61acf7be05f   // your valid session _id
        :exerciseId = 6796a9b30a23b77a579881e6  // your valid exercise _id

    *Body*:
        N/A

    *Expected results*:
        1. status code: 200.
        2. response: **JSON**
            exercise sub document object.

## PATCH : http://localhost:5000/api/v1/routines/:routineId/sessions/:sessionId/exercises/:exerciseId
*Prerequisites*:
    1. Successful login that returned a valid JWT.
    2. Valid route params: routineId and sessionId.

- Test X: Update only the exercise info, exclude the "comments" key for the sub doc array.
    *Prerequisites*:
        1. An exercise was created within a session document.

    *Route params*:
        :routineId = 67969cbe4163742abfe4d7d5   // your valid routine _id
        :sessionId = 6796a5413cddc61acf7be05f   // your valid session _id
        :exerciseId = 6796a9b30a23b77a579881e6  // your valid exercise _id

    *Body*:
        {
            "order": 5,
            "name": "EXERCISE1",
            "description": "YEESH", 
            "sets": 5,
            "repsOrDuration": "6",
            "restTimeSeconds": 90
        }

    *Expected results*:
        1. status code: 200.
        2. response: **JSON**
            The updated exercise sub document object.
        3. The exercise sub document was updated in the session document.

- X: Update only the exercise info, include the "comments" key for the sub doc array.
    *Prerequisites*:
        1. An exercise was created within a session document.

    *Route params*:
        :routineId = 67969cbe4163742abfe4d7d5   // your valid routine _id
        :sessionId = 6796a5413cddc61acf7be05f   // your valid session _id
        :exerciseId = 6796a9b30a23b77a579881e6  // your valid exercise _id

    *Body*:
        {
            "order": 5,
            "name": "EXERCISE1",
            "description": "YEESH", 
            "sets": 5,
            "repsOrDuration": "6",
            "restTimeSeconds": 90,
            "comments": []
        }

    *Expected results*:
        1. status code: 200.
        2. response: **JSON**
            The updated exercise sub document object, but the comments value is not updated.
        3. The exercise sub document was updated in the session document, but the comments value is not updated.

## DELETE : http://localhost:5000/api/v1/routines/:routineId/sessions/:sessionId/exercises/:exerciseId
*Prerequisites*:
    1. Successful login that returned a valid JWT.
    2. Valid route params: routineId and sessionId.

- X: Delete exercise with no comments.
    *Prerequisites*:
        1. An exercise was created within a session document.

    *Route params*:
        :routineId = 67969cbe4163742abfe4d7d5   // your valid routine _id
        :sessionId = 6796a5413cddc61acf7be05f   // your valid session _id
        :exerciseId = 6796a9b30a23b77a579881e6  // your valid exercise _id

    *Body*:
        N/A

    *Expected results*:
        1. status code: 200.
        2. response: N/A
        3. The exercise sub document has been deleted in the session document.

- X: Delete exercise with comments. Will delete comments with the exercise id in the collection 'comments'
    *Prerequisites*:
        1. An exercise was created within a session document.
        2. 1 or more comments created for the exercise. A comment in the exercise's comments sub document array has a duplicate in the collection 'comments'.
        3. Record the exercise _id and comment _id.

    *Route params*:
        :routineId = 67969cbe4163742abfe4d7d5   // your valid routine _id
        :sessionId = 6796a5413cddc61acf7be05f   // your valid session _id
        :exerciseId = 6796a9b30a23b77a579881e6  // your valid exercise _id

    *Body*:
        N/A

    *Expected results*:
        1. status code: 200.
        2. response: N/A
        3. The exercise sub document has been deleted in the session document.
        4. The reference comments have been deleted from the collection 'comments'.

---

# ./routes/comments
## GET : http://localhost:5000/api/v1/routines/:routineId/sessions/:sessionId/exercises/:exerciseId/comments/
*Prerequisites*:
    1. Successful login that returned a valid JWT.
    2. Valid route params: routineId and sessionId.

- Test X: Invalid route param :exerciseId.
    *Route params*:
        :routineId = 67969cbe4163742abfe4d7d5   // your valid routine _id
        :sessionId = 6796a5413cddc61acf7be05f   // your valid session _id
        :exerciseId = 6796a9b30a23b77a579881e

    *Body*:
        N/A

    *Expected results*:
        1. status code: 400.
        2. response: **JSON**
            {
                message: Id not found: 6796a9b30a23b77a579881e!
            }
        3. The exercise sub document has been deleted in the session document.

- Test X: Valid route param :exerciseId.
    *Route params*:
        :routineId = 67969cbe4163742abfe4d7d5   // your valid routine _id
        :sessionId = 6796a5413cddc61acf7be05f   // your valid session _id
        :exerciseId = 6796a9b30a23b77a579881e6  // your valid exercise _id.

    *Body*:
        N/A

    *Expected results*:
        1. status code: 200.
        2. response: **JSON**
            {
                response: [array of comment document objects],
                count: doc count int
            }

## POST : http://localhost:5000/api/v1/routines/:routineId/sessions/:sessionId/exercises/:exerciseId/comments/
*Prerequisites*:
    1. Successful login that returned a valid JWT.
    2. Valid route params: routineId, sessionId, and exerciseId.

- Test X: Create a valid comment.
    *Route params*:
        :routineId = 67969cbe4163742abfe4d7d5   // your valid routine _id
        :sessionId = 6796a5413cddc61acf7be05f   // your valid session _id
        :exerciseId = 6796a9b30a23b77a579881e6  // your valid exercise _id

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

- Test X: Length validation for comment (<= 500 characters).
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
                response: Please provide a comment that is 500 characters or less!
            }  
        3. No comment created in the collection 'comments' and comment sub document in the exercise.

- Test X: Create more than 3 comments for a single exercise.
    *Description*:
        The exercise's comment sub document array will only hold maximum 3 most recently added comments.

    *Steps*:
        Add 3 comments, record the oldest comment.
        Add the 4th comment, the exercise's comment sub document array will remove the oldest comment and have the most 3 recent comments.
        The collection 'comments' will have all 4 comments.

## GET : 

## PATCH : 

## DELETE : 

**TODO**
middleware/validate-route-params/validate-exerciseId.js     to validate the exercise Id before moving onto the comments.js controller

Back end:
    * TO TEST
    2. controllers comments
        redo with CommentSchema
        get:
            1. get from collection 'comments' *should be ok

        create:
            1. createdComment = create comment document for collection 'comments' with the exerciseId. After get the _id that was assigned
            2. find session
            3. with session find the exercise sub doc
            4. with the exercise sub doc, push created comment doc into the comments subdoc, sort by desc created time, while > 3 pop
                session.exercises.id(_id).comments.push(createdComment)
                sort and pop
                session.save()

            * ensure when reordered, the ids, created, and updated time stay the same as before request

        update comment
            1. with the commentID, update in collection comments
            2. find the session -> exercise -> comment id and update then save()
        
        delete comment
            1. with the commentID, delete in collection comments
            2. find the session -> exercise -> comment id and delete then save()

        * or revert to use CommentSubSchema. where you get the createdId from comments and then put into CommentSubSchema