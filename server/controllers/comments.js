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

    const response = await CommentModel.find({createdByUserId, exerciseId})

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

    const response = await CommentModel.find({_id: commentId, createdByUserId})

    if (!response || response.length === 0) {
        throw new NotFoundError('Comment not found!')
    }

    res.status(StatusCodes.OK).json({response})
}

const createComment = async(req, res) => {
    const {
        user: { userId: createdByUserId },
        params: { sessionId, exerciseId },
        sessDoc: sessDoc,
        exerciseDoc: exerciseDoc
    } = req

    // Start a session
    const session = await mongoose.startSession();
    try {
        // Start a transaction
        session.startTransaction();
        // Transaction queries
        // 1. create comment in the Comment collection
        
        const commentRes = await CommentModel.create({createdByUserId, exerciseId, ...req.body})
        // const crComId = commentRes._id

        // 2. create the comment in the Session -> exercises sub doc -> comments sub doc
        //const session = await SessionModel.findById(sessionId)
        //--const comments = session.exercises.id(exerciseId).comments.push({commentId: crComId, ...req.body})
        exerciseDoc.comments.push(commentRes)
        exerciseDoc.comments.sort((a, b) => {return new Date(b.createdAt) - new Date(a.createdAt)})
        exerciseDoc.comments = exerciseDoc.comments.slice(0, 3)

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
        const commentRes = await CommentModel.findAndUpdate({_id: commentId, createdByUserId, exerciseId}, req.body, {new: true, runValidators: true})

        if (!commentRes) {
            throw new NotFoundError('Comment not found!')
        }

        // 2. update the comment in the Session -> exercises sub doc -> comments sub doc
        //const session = await SessionModel.findById(sessionId)
        const comment = exerciseDoc.comments.id(commentId) //session.exercises.id(exerciseId).comments.id(commentId)

        if (!comment) {
            throw new NotFoundError('Comment not found!')
        }

        // update the comment
        for (let [key, val] of Object.entries(req.body)) {
            comment[key] = val
        }

        console.log(comment)
        const response = await session.save()
        console.log(response)

        // Commit the transaction
        await session.commitTransaction();

        return res.status(StatusCodes.OK).json({response: commentRes})
    } catch (err) {
        throw new BadRequestError('Something has gone wrong!')
    } finally {
        session.endSession()
    }
}

const deleteComment = async(req, res) => {
    res.status(StatusCodes.OK).send()
}

module.exports = { getAllComments, getComment, createComment, updateComment, deleteComment }