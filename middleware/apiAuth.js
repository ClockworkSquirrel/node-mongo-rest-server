/*
    This middleware provides a basic API key authorisation
    model. This could be expanded to allow API keys to
    only allow keys to access specific routes, etc.
*/

const ApiKey = require('../models/authentication/apiKeyModel');

// Exports API Key authentication middleware
exports.apiKey = (req, res, next) => {
    // Find API key in database
    ApiKey.findOne({ key: req.query.key }, (err, key) => {
        if (err) {
            // On error, return status code 500
            res.status(500).json({
                ok: false,
                result: err
            });
        } else {
            if (key !== null && key !== undefined) {
                // If valid key found, continue
                next();
            } else {
                /*
                    If key invalid, return 401 unauthorised
                    status code, and display request denied
                    message
                */
                res.status(401).json({
                    ok: false,
                    result: 'Invalid API key. Request denied'
                });
            }
        }
    });
}