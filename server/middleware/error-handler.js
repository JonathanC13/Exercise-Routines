const { StatusCodes } = require('http-status-codes')

const errorHandler = (err, req, res, next) => {
    const customError = {
        message: err.message || 'Something went wrong, try again later.',
        status: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
    }
    
    if (err.name === 'ValidationError') {
        customError.status = StatusCodes.BAD_REQUEST
        customError.message = `Validation failed for the following fields: ${Object.values(err.errors).map((itm) => itm.message).join(', ')}`
    }
    if (err.name === 'CastError') {
        customError.status = StatusCodes.NOT_FOUND
        customError.message = `Id not found: ${err.value}!`
    }
    if (err.code && err.code === 11000) {
        // Remember that 'unique' in the schema does not fail a validation, it will return an error after commiting to the DB.
        customError.status = StatusCodes.CONFLICT
        const text = Object.keys(err.keyValue)[0] === 'emailLowercase' ? 'Email' : Object.keys(err.keyValue)
        customError.message = `Duplicate value ${text} already exists! Please use a different one.`
    }
    
    return res.status(customError.status).json({'message': customError.message})
}

module.exports = errorHandler