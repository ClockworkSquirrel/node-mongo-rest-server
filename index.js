const express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    app = express();

require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

app.use(require('./routes'));
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}.`);
});