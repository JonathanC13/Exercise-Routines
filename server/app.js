require('dotenv').config()
const express = require('express')
require('express-async-errors');
const helmet = require('helmet')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const xss = require('./middleware/xss-clean')

// db
const connectDB = require('./db/connect')

// router
const authRouter = require('./routes/auth')
const routineRouter = require('./routes/routines')
const sessionsRouter = require('./routes/sessions')
const exercisesRouter = require('./routes/exercises')

// middleware
const authorizationMiddleware = require('./middleware/authorization')

// error handler
const errorHandlerMiddleware = require('./middleware/error-handler')
const notFoundMiddleware = require('./middleware/not-found')

// app
const app = express()
const port = process.env.PORT || 5000
app.use(express.json());

// extra security packages
app.use(helmet())
app.use(cors())
app.use(xss()) // make sure this comes before any routes

app.set('trust proxy', 1 /* number of proxies between user and server */)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
})
app.use(limiter)
// /extra security packages

// routes
// /api/v1/routes/:routineId/sessions/:sessionId/exercises/:exerciseId/comments/:commentId
app.get('/', (req, res) => {
    res.send('hello, world!')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/routines', authorizationMiddleware, routineRouter)
routineRouter.use('/:routineId/sessions', sessionsRouter)
sessionsRouter.use('/:sessionId/exercises', exercisesRouter)


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