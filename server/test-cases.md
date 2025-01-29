# ./routes/auth
## POST : http://localhost:5000/api/v1/auth/register
- Test 1: Missing key "name"
    *Description*:
        Request POST to register with missing "name" in the body.

    *Body*: **JSON**
        {
            {
                "email": "test1@.com",
                "password": "123456"
            }
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

    *Body*: **JSON**
        {
            {
                "name": "test2"
                "password": "123456"
            }
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

    *Body*: **JSON**
        {
            {
                "name": "test3",
                "email": "test3@.com"
            }
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

    *Body*: **JSON**
        {
            {
                "name": "",
                "email": "",
                "password": ""
            }
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
        Request with too long name, invalid email, and too short password.

    *Body*: **JSON**
        {
            {
                "name": "Lorem ipsum odor amet aawe Lorem ipsum odor amet aa",
                "email": "A@B",
                "password": "12345"
            }
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

    *Body*: **JSON**
        {
            {
                "name": "Jon",
                "email": "Apple@Billy.com",
                "password": "123456"
            }
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
    *Prerequisite*:
        1. Test 6 successful.

    *Description*:
        Request with an email that is already registered.

    *Body*: **JSON**
        {
            {
                "name": "Jonny",
                "email": "Apple@Billy.com",
                "password": "1234567"
            }
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

    *Body*: **JSON**
        {
            {
                "password": "123456"
            }
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

    *Body*: **JSON**
        {
            {
                "email": "Apple@Billy.com"
            }
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

    *Body*: **JSON**
        {
            {
                "email": "A@B.com",
                "password": "123456"
            }
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

    *Body*: **JSON**
        {
            {
                "email": "Apple@Billy.com",
                "password": "111111"
            }
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

    *Body*: **JSON**
        {
            {
                "email": "Apple@Billy.com",
                "password": "123456"
            }
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
    1. Sucessful login that returned a valid JWT.

- Text X: Current user has 0 routines and GET requested.
    *Prerequisites*:
        1. 0 routines created by the current user.

    *Body*:
        N/A

    *Expected results*:
        1. status code: 200.
        2. response: emtpy array.
        3. In the cluster 'Exercise-Routines', no change in the documents in the collection 'routines'.    

- Text X: Get all routines that were created by the current user.
    *Prerequisites*:
        1. 1 or more routines created by the current user.

    *Body*:
        N/A

    *Expected results*:
        1. status code: 200.
        2. response: Array of the documents' objects.
        3. In the cluster 'Exercise-Routines', no change in the documents in the collection 'routines'.

## POST : http://localhost:5000/api/v1/routines/
*Prerequisites*:
    1. Sucessful login that returned a valid JWT.

- Text X: Missing key "name"
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
    1. Sucessful login that returned a valid JWT.

- Test X: Invalid routine id.
    *Route params*:
        :routineId = 67969cbe4163742abfe4d7d

    *Expected results*:
        1. status code: 404.
        2. response: **JSON**
            {
                message: Id not found: 67969cbe4163742abfe4d7d!
            }

- Test X: Id that does not exist.
    *Route params*:
        :routineId = 67969cbe4163742abfe4d7dA

    *Expected results*:
        1. status code: 404.
        2. response: **JSON**
            {
                message: That routine does not exist!
            }

- Test X: Successful get with Id that does exist.
    *Prerequisites*:
        1. At least one routine document exists in the collection 'routines'.

    *Route params*:
        :routineId = 67969cbe4163742abfe4d7d5   // your valid route _id

    *Expected results*:
        1. status code: 200.
        2. response: **JSON**
            The document of the created routine.
        3. The routine document created in the collection 'routines'.

## PATCH : http://localhost:5000/api/v1/routines/:routineId
*Prerequisites*:
    1. Sucessful login that returned a valid JWT.

- Test X: Missing :routineId
    *Route params*:
        :routineid = ''

    *Expected results*:
        1. status code: 400.
        2. response: **JSON**
            {
                message: Missing routine id!
            }

- Test X: Invalid routine id
    *Route params*:
        :routineId = 67969cbe4163742abfe4d7d

    *Expected results*:
        1. status code: 404.
        2. response: **JSON**
            {
                message: Id not found: 67969cbe4163742abfe4d7d!
            }

- Test X: Id that does not exist.
    *Route params*:
        :routineId = 67969cbe4163742abfe4d7dA

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
        :routineId = 67969cbe4163742abfe4d7d5   // your valid route _id

    *Expected results*:
        1. status code: 200.
        2. response: **JSON**
            The document of the updated routine.
        3. The routine document is updated in the collection 'routines'.
        4. createdAt value remains unchanged.
        5. updatedAt changes to current time, account for timezone.

## DELETE : http://localhost:5000/api/v1/routines/:routineId
*Prerequisites*:
    1. Sucessful login that returned a valid JWT.

- Test X: Missing :routineId
    *Route params*:
        :routineid = ''

    *Expected results*:
        1. status code: 400.
        2. response: **JSON**
            {
                message: Missing routine id!
            }

- Test X: Invalid routine id
    *Route params*:
        :routineId = 67969cbe4163742abfe4d7d

    *Expected results*:
        1. status code: 404.
        2. response: **JSON**
            {
                message: Id not found: 67969cbe4163742abfe4d7d!
            }

- Test X: Id that does not exist.
    *Route params*:
        :routineId = 67969cbe4163742abfe4d7dA

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

    *Expected results*:
        1. status code: 200.
        2. response: N/A
        3. The routine document is deleted from the collection 'routines'.
        4. The session documents with the routineId referenced are deleted from the collection 'sessions'.
        5. The comment documents with the exerciseId referenced are deleted from the the collection 'comments'.

--- HERE

# ./routes/sessions

## GET : http://localhost:5000/api/v1/routines/:routineId/sessions/

## POST : http://localhost:5000/api/v1/routines/:routineId/sessions/

## GET : http://localhost:5000/api/v1/routines/:routineId/sessions/:sessionId

## PATCH : http://localhost:5000/api/v1/routines/:routineId/sessions/:sessionId
- prereq, created exercises through the POST exercises route

- X: patch only the Session info, exclude the exercises sub doc

- X: Specific test for updating exercises subdoc from routine route: update one exercise with all valid values.
- X: Specific test for updating exercises subdoc from routine route: update one exercise with non valid values.
- X: Specific test for updating exercises subdoc from routine route: update sub doc array by sending the request with modified array. 
- X: Specific test for updating exercises subdoc from routine route: update sub doc array by sending the request with empty array. 

## DELETE : http://localhost:5000/api/v1/routines/67969cbe4163742abfe4d7d5/sessions/:sessionId

- X: delete a session that has no exercises sub doc
- X: delete a session with exercises but the exercises have no comments
- X: delete a session with exercises but the exercises have comments

---

# ./routes/exercises
## GET : http://localhost:5000/api/v1/routines/:routineId/sessions/:sessionId/exercises/

## POST : http://localhost:5000/api/v1/routines/:routineId/sessions/:sessionId/exercises/

## GET : http://localhost:5000/api/v1/routines/:routineId/sessions/:sessionId/exercises/:exerciseId

## PATCH : http://localhost:5000/api/v1/routines/:routineId/sessions/:sessionId/exercises/:exerciseId
- X: Update only the exercise info, exclude the "comments" key for the sub doc array
- X: Update only the exercise info, include the "comments" key for the sub doc array. It will be ignored!

- ** Front end will not be able to update the comments for the exercise route!

## DELETE : http://localhost:5000/api/v1/routines/:routineId/sessions/:sessionId/exercises/:exerciseId
- X: delete exercise with no comments
- X: delete exercise with comments. Will delete comments with the exercise id in the collection 'comments'

---

# ./routes/comments
## 


**TODO**
Back end:

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