

module.exports = (err, req, res, next) => {
    console.error(err.stack);  // Log the error stack to the console (for debugging)
    const statusCode = err.status || 500;  // Default to 500 if no status code is set
    const message = err.message || 'Internal Server Error';  // Default message if none provided
    res.status(statusCode).json({ error: message });
}