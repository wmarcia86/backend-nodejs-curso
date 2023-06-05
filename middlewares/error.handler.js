const { StatusCodes } = require('http-status-codes');

function logErrors(error, request, response, next) {
    console.log('logErrors');
    console.error(error);
    
    next(error);
}

function boomErrorHandler(error, request, response, next) {
    console.log('boomErrorHandler');
   
    if (error.isBoom) {
        const { output } = error;

        response.status(output.statusCode).json(output.payload);
    } else {
        next(error);
    }
}

function errorHandler(error, request, response, next) {
    console.log('errorHandler');

    response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
        stack: error.stack
    });
}

module.exports = { logErrors, errorHandler, boomErrorHandler }