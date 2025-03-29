require('dotenv').config()
const express = require('express')
require('express-async-errors');
const helmet = require('helmet')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const xss = require('./middleware/xss-clean')
const cookieParser = require('cookie-parser')

// db
const connectDB = require('./db/connect')

// router
const authRouter = require('./routes/auth')
const routineRouter = require('./routes/routines')
const sessionsRouter = require('./routes/sessions')
const exercisesRouter = require('./routes/exercises')
const commentsRouter = require('./routes/comments')
const accountExercisesRouter = require('./routes/accountExercises')

// middleware
const authorizationMiddleware = require('./middleware/authorization')
const validateRoutineIdMiddleware = require('./middleware/validate-route-params/validate-routineId')
const validateSessionIdMiddleware = require('./middleware/validate-route-params/validate-sessionId')
const validateExerciseIdMiddleware = require('./middleware/validate-route-params/validate-exerciseId')

// error handler
const errorHandlerMiddleware = require('./middleware/error-handler')
const notFoundMiddleware = require('./middleware/not-found')

// app
const app = express()
const port = process.env.PORT || 5000
app.use(express.json());

// middleware for cookies
app.use(cookieParser())

// extra security packages
app.use(helmet())
app.use(cors(
    {
        origin: 'http://localhost:5173', // Adjust this to your frontend's URL
        credentials: true, // This allows cookies to be included in requests
    }
))
app.use(xss()) // make sure this comes before any routes

app.set('trust proxy', 1 /* number of proxies between user and server */)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 1000, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
})
// app.use(limiter) // disabled for now *******
// /extra security packages

// routes
// /api/v1/routes/:routineId/sessions/:sessionId/exercises/:exerciseId/comments/:commentId
app.get('/', (req, res) => {
    res.send('hello, world!')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/accountExercises', authorizationMiddleware, accountExercisesRouter)
app.use('/api/v1/routines', authorizationMiddleware, routineRouter)
routineRouter.use('/:routineId/sessions', validateRoutineIdMiddleware, sessionsRouter)
sessionsRouter.use('/:sessionId/exercises', validateSessionIdMiddleware, exercisesRouter)
exercisesRouter.use('/:exerciseId/comments', validateExerciseIdMiddleware, commentsRouter)

// error routes
app.use(errorHandlerMiddleware)
app.use(notFoundMiddleware)


const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)

        app.listen(port, async() => {
            console.log(`Listening on port ${port}...`)
        })

    } catch (err) {
        console.log(`Listen error: ${err}`)
    }
}

start()