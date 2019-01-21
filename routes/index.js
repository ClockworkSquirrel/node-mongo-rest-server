const Router = require('express').Router(),
    apiAuth = require('../middleware/apiAuth');

// Report server online
Router.all('/', (req, res) => {
    res.json({
        ok: true
    });
});

// API routes
    // Includes API Key authentication middleware on `/api` route.
Router.use('/todos', /* apiAuth.apiKey, */ require('./todos'));

// Export routes to application
module.exports = Router;