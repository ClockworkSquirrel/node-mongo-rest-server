const mongoose = require('mongoose'),
    timestamp = () => Math.floor((new Date()).getTime() / 1000);

// Define "todo" model
const todoSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    created: {
        type: Number,
        default: timestamp()
    },
    completed: {
        type: Boolean,
        default: false
    }
}, { versionKey: false });

// Ensure model is using the "todos" database
const database = mongoose.connection.useDb('todos');

// Export model using "todos" collection
module.exports = database.model('todos', todoSchema);