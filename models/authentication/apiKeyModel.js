const mongoose = require('mongoose'),
    timestamp = () => Math.floor((new Date()).getTime() / 1000),
    uuid = require('uuid/v4');

// Define "apiKey" model
const keySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    key: {
        type: String,
        default: uuid()
    },
    created: {
        type: Number,
        default: timestamp()
    }
}, { versionKey: false });

// Ensure model is using the "api-access" database
const database = mongoose.connection.useDb('api-access');

// Export model using "keys" collection
module.exports = database.model('keys', keySchema);