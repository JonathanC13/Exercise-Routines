const SessionModel = require('../models/Session')
const {CommentModel} = require('../models/Comment')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')
const mongoose = require('mongoose')

const getAllComments = async(req, res) => {
    const { 
        user: { userId: createdByUserId },
        params: { exerciseId },
        exerciseDoc: exerciseDoc
    } = req

    const response = await CommentModel.find({createdByUserId, exerciseId}).sort({createdAt: 'desc'})

    if (!response) {
        throw new NotFoundError('Comments not found!')
    }
    // ok if empty array
    res.status(StatusCodes.OK).json({response, count: response.length})
}

const getComment = async(req, res) => {
    const {
        user: { userId: createdByUserId },
        params: { commentId },
        exerciseDoc: exerciseDoc
    } = req

    const response = await CommentModel.findOne({_id: commentId, createdByUserId})

    if (!response || response.length === 0) {
        throw new NotFoundError('Comment not found!')
    }

    res.status(StatusCodes.OK).json({response})
}

const createComment = async(req, res) => {
    const {
        user: { userId: createdByUserId },
        params: { sessionId, exerciseId }
    } = req

    // Start a session
    const session = await mongoose.startSession();
    try {
        // Start a transaction
        session.startTransaction();
        // Transaction queries
        // 1. create comment in the Comment collection
        
        const commentRes = await CommentModel.create([{createdByUserId: createdByUserId, exerciseId: exerciseId, ...req.body}], {session: session})
        // const crComId = commentRes._id

        // 2. create the comment in the Session -> exercises sub doc -> comments sub doc
        //const session = await SessionModel.findById(sessionId)
        //--const comments = session.exercises.id(exerciseId).comments.push({commentId: crComId, ...req.body})
        const sessDoc = await SessionModel.findOne({_id: sessionId, createdByUserId}).session(session)
        sessDoc.exercises.id(exerciseId).comments.push(commentRes[0])
        sessDoc.exercises.id(exerciseId).comments.sort((a, b) => {return new Date(b.createdAt) - new Date(a.createdAt)}).slice(0, 3)
        const response = await sessDoc.save()
        // Commit the transaction
        await session.commitTransaction();

        return res.status(StatusCodes.CREATED).json({response: commentRes})
    } catch (err) {
        throw new BadRequestError('Something has gone wrong! err: ' + err.message)
    } finally {
        session.endSession()
    }
}

const updateComment = async(req, res) => {
    const {
        user: { userId: createdByUserId },
        params: { sessionId, exerciseId, commentId },
        exerciseDoc: exerciseDoc
    } = req

    // Start a session
    const session = await mongoose.startSession();

    try {
        // Start a transaction
        session.startTransaction();

        // Transaction queries
        // 1. update the comment in the Comment collection
        const commentRes = await CommentModel.findOneAndUpdate({_id: commentId, createdByUserId, exerciseId}, req.body, {new: true, runValidators: true, session: session})
        
        if (!commentRes) {
            throw new NotFoundError('Comment not found!')
        }

        // 2. if exists, update the comment in the Session -> exercises sub doc -> comments sub doc
        //const session = await SessionModel.findById(sessionId)
        const ses = await SessionModel.findOne({_id: sessionId, createdByUserId}).session(session) 
        const comment = ses.exercises.id(exerciseId).comments.id(commentId)

        if (comment) {
            // update the comment
            for (let [key, val] of Object.entries(req.body)) {
                comment[key] = val
            }

            const response = await ses.save()
        }

        // Commit the transaction
        await session.commitTransaction();

        return res.status(StatusCodes.OK).json({response: commentRes})
    } catch (err) {
        console.log('hi')
        await session.abortTransaction();
        throw err
    } finally {
        session.endSession()
    }
}

const deleteComment = async(req, res) => {
    res.status(StatusCodes.OK).send()
}

module.exports = { getAllComments, getComment, createComment, updateComment, deleteComment }