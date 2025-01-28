const SessionModel = require('../models/Session')
const CommentModel = require('../models/Comment')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')
const mongoose = require('mongoose')

const getAllComments = async(req, res) => {
    const { 
        user: { userId: createdByUserId },
        params: { exerciseId }
    } = req

    if (!exerciseId) {
        throw new BadRequestError('Missing exercise id!')
    }

    const response = await CommentModel.find({createdByUserId, exerciseId})

    if (!response) {
        throw new NotFoundError('Comments not found!')
    }

    res.status(StatusCodes.OK).json({response, count: response.length})
}

const getComment = async(req, res) => {
    const {
        user: { userId: createdByUserId },
        params: { commentId }
    } = req

    const response = await CommentModel.find({_id: commentId, createdByUserId})

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
        const commentRes = await CommentModel.create({createdByUserId, exerciseId, ...req.body})
        // const crComId = commentRes._id

        // 2. create the comment in the Session -> exercises sub doc -> comments sub doc
        const session = await SessionModel.findById(sessionId)
        //const comments = session.exercises.id(exerciseId).comments.push({commentId: crComId, ...req.body})
        const comments = session.exercises.id(exerciseId).comments.push(commentRes)
        comments.sort((a, b) => {return new Date(b.updatedAt) - new Date(a.updatedAt)})
        while (comments.length > 3) {
            comments.pop()
        }
        console.log(comments)
        const response = await session.save()
        console.log(response)
        // Commit the transaction
        await session.commitTransaction();

        return res.status(StatusCodes.CREATED).json({response})
    } catch (err) {
        throw new BadRequestError('Something has gone wrong!')
    } finally {
        session.endSession()
    }
}

const updateComment = async(req, res) => {
    const {
        user: { userId: createdByUserId },
        params: { sessionId, exerciseId, commentId }
    } = req

    // Start a session
    const session = await mongoose.startSession();

    try {
        // Start a transaction
        session.startTransaction();

        // Transaction queries
        // 1. update the comment in the Comment collection
        const commentRes = await CommentModel.findAndUpdate({_id: commentId, createdByUserId, exerciseId}, req.body, {new: true, runValidators: true})

        // 2. create the comment in the Session -> exercises sub doc -> comments sub doc
        const session = await SessionModel.findById(sessionId)
        const comments = session.exercises.id(exerciseId).comments

        comments = comments.map((comment) => {
            if (comment._id === commentId) {
                for (let [key, val] of Object.entries(req.body)) {
                    comment[key] = val
                }
            }
        })
        console.log(comments)
        const response = await session.save()
        console.log(response)

        // Commit the transaction
        await session.commitTransaction();

        return res.status(StatusCodes.OK).json({response})
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