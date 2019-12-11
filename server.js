const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const coffee = require('./routes/api/coffee.js');

const app = express();

//Bodyparser Middleware
app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

// Connect to MongoDB

mongoose
    .connect(db)
    .then( () => {console.log('MongoDB Connected...')})
    .catch( err => console.log(err + ' :('));

//Use routes:
app.use('/api/coffee', coffee);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));