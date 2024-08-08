// function errorHandler(err, req, res, next){
//     if(err){
//         res.status(500).json({message: err.inner.message})
//     }
// }

// module.exports = errorHandler



// helpers/error-handler.js
function errorHandler(err, req, res, next) {
    console.error(err); // Log the error for debugging purposes

    if (err.name === 'UnauthorizedError') {
        // JWT authentication error
        return res.status(401).json({ message: 'Invalid Token' });
    }

    if (err.name === 'ValidationError') {
        // Mongoose validation error
        return res.status(400).json({ message: err.message });
    }

    // General or unknown error
    const message = err.message ? err.message : 'Internal Server Error';
    return res.status(500).json({ message: message });
}

module.exports = errorHandler;
