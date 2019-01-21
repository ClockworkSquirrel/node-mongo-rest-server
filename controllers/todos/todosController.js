const Todo = require('../../models/todos/todosModel');

// GET /todos
exports.index = (req, res) => {
    const limit = parseInt(req.query.limit) <= 250 ? parseInt(req.query.limit) : 100,
        sort = req.query.sort || '-created';

    Todo.find().sort(sort).limit(limit).exec().then(todos => {
        res.json({
            ok: true,
            result: todos
        });
    }).catch(err => {
        res.json({
            ok: false,
            result: err
        });
    });
}

// POST /todos
exports.new = (req, res) => {
    let todo = new Todo();
    todo.name = req.body.name;

    todo.save().then(() => {
        res.json({
            ok: true,
            result: todo
        });
    }).catch(err => {
        res.json({
            ok: false,
            result: err.message || err
        });
    });
}

// GET /todos/:todoId
exports.view = (req, res) => {
    const todoIds = req.params.todoId.split(','),
        sort = req.query.sort || undefined;
    
    Todo.find({ _id: { $in: todoIds }}).limit(todoIds.length).sort(sort).exec().then(todos => {
        res.json({
            ok: (todos.length > 0),
            result: todos.length > 0 ? todos : 'No entries found.'
        });
    }).catch(err => {
        res.json({
            ok: false,
            result: err
        });
    });
}

// PUT/PATCH /todos/:todoId
exports.update = (req, res) => {
    // Disable updating of 'created' field
    if (req.body.created) delete req.body.created;

    Todo.findByIdAndUpdate(
        req.params.todoId,
        { $set: req.body },
        { new: true, runValidators: true }
    ).exec().then(todo => {
        res.json({
            ok: !!todo,
            result: todo || 'No entries found.'
        });
    }).catch(err => {
        res.json({
            ok: false,
            result: err
        });
    });
}

// DELETE /todos/:todoId
exports.delete = (req, res) => {
    Todo.findByIdAndDelete(req.params.todoId).exec().then(() => {
        res.json({
            ok: true
        });
    }).catch(err => {
        res.json({
            ok: false,
            result: err
        });
    });
}