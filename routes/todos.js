const Router = require('express').Router(),
    todoController = require('../controllers/todos/todosController');

// Route for creating new and retrieving all todos
Router.route('/')
    .get(todoController.index)
    .post(todoController.new);

// Routes for handling todo items
Router.route('/:todoId')
    .get(todoController.view)
    .put(todoController.update)
    .patch(todoController.update)
    .delete(todoController.delete);

// Export routes to application
module.exports = Router;