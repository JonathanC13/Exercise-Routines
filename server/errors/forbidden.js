const CustomAPIError = require('./custom-api')
const { StatusCodes } = require('http-status-codes')

class ForbiddinError extends CustomAPIError {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.FORBIDDEN
    }
}

module.exports = ForbiddinError