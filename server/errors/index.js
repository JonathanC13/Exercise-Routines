const CustomAPIError = require('./custom-api')
const BadRequestError = require('./bad-request')
const NotFoundError = require('./not-found')
const UnauthenticatedError = require('./unauthenticated')
const ForbiddinError = require('./forbidden')

module.exports = { CustomAPIError, BadRequestError, NotFoundError, UnauthenticatedError, ForbiddinError }