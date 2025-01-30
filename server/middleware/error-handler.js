const { StatusCodes } = require('http-status-codes')

const errorHandler = (err, req, res, next) => {
    const customError = {
        message: err.message || 'Something went wrong, try again later.',
        status: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
    }

    if (err.name === 'ValidationError') {
        customError.statusCode = StatusCodes.BAD_REQUEST
        customError.message = `Validation failed for the following fields: ${Object.values(err.errors).map((itm) => itm.message).join(', ')}`
    }
    if (err.name === 'CastError') {
        customError.statusCode = StatusCodes.NOT_FOUND
        customError.message = `Id not found: ${err.value}!`
    }
    if (err.code && err.code === 11000) {
        // Remember that 'unique' in the schema does not fail a validation, it will return an error after commiting to the DB.
        customError.statusCode = StatusCodes.BAD_REQUEST
        customError.message = `Duplicate value entered in ${Object.keys(err.keyValue)} field! Please use a different one.`
    }
    
    return res.status(customError.status).json({'message': customError.message})
}

module.exports = errorHandler