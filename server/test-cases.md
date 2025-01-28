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
                "name": "qwertyuiopasdfghjklzxcvbnm",
                "email": "A@B",
                "password": "12345"
            }
        }

    *Expected results*:
        1. status code: 400.
        2. response: **JSON**
            {
                message: Validation failed for the following fields: Please provide a name 25 or less characters!, Please provide a valid email!, Please provide a password that is 6 or more characters!
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
    1. Atleast one account successfully registered.

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

--- HERE

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

validation ruless

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
        3. In the cluster 'Exercise-Routines', it created a new document in the collection 'routines' with the exact values in the request.

## GET : http://localhost:5000/api/v1/routines/:routineId
*Prerequisites*:
    1. Sucessful login that returned a valid JWT.


- Test X: get not exist

- Test X: get exist
    2. 1 or more routines already created for the current user.


## PATCH : http://localhost:5000/api/v1/routines/:routineId
*Prerequisites*:
    1. Sucessful login that returned a valid JWT.

- X: update not exist

- X: update exist
    2. 1 or more routines already created for the current user.
    3. note created and updated time

    expected: routine values updated, created time stays the same, updated time changes to time of request

## DELETE : http://localhost:5000/api/v1/routines/:routineId
prereq

- X: with standalone routine with no documents in collection 'sessions' that have the routineId, therefore no exercise sub docs and no comments in collection 'comments' for the exercises

- X: with sessions but no exercises

- X: with sessions with exercises but no comments

- X: with sessions with exercises and the exercises have comments

---

# ./routes/sessions

## GET : http://localhost:5000/api/v1/routines/:routineId/sessions

## POST : http://localhost:5000/api/v1/routines/:routineId/sessions

## GET : http://localhost:5000/api/v1/routines/:routineId/sessions/:sessionId

## PATCH : http://localhost:5000/api/v1/routines/:routineId/sessions/:sessionId
- prereq, created exercises through the POST exercises route

- X: patch only the Session info, exclude the exercises sub doc

- X: Specific test for updating exercises subdoc from routine route: update one exercise with all valid values. Expected result, no change! exercises sub doc array not allowed to be changed in this route!
- X: Specific test for updating exercises subdoc from routine route: update sub doc array by sending the request with empty array. Expected result, no change! exercises sub doc array not allowed to be changed in this route!

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
    1. PATCH : http://localhost:5000/api/v1/routines/:routineId/sessions/:sessionId
        Filter out "exercises" key in the update body. Do not allow sub doc to be modified through this route

    2. controllers comments
        redo with CommentSchema
        get:
            1. get from collection 'comments'

        create:
            1. create comment document for collection 'comments'
            2. find session
            3. with session find the exercise sub doc
            4. with the exercise sub doc, push created comment doc into the comments subdoc, sort by desc created time, while > 3 pop

            * ensure when reordered, the ids, created, and updated time stay the same as before request

        update comment
            1. with the commentID, update in collection comments
            2. find the session -> exercise -> comment id and update then save()
        
        delete comment
            1. with the commentID, delete in collection comments
            2. find the session -> exercise -> comment id and delete then save()

        * or revert to use CommentSubSchema. where you get the createdId from comments and then put into CommentSubSchema

    3. PATCH : exercises/:exerciseId
        Filter out if body has "comments"  Do not allow sub doc to be modified through this route