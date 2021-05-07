const express = require('express');
const mongoose = require('mongoose');

//server security stuff
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const data = require('./dataControl');


require('dotenv').config();

// Initialize Server
app = express();
const port = process.env.PORT || 80;

app.use(helmet());
app.use(cors());
app.use(morgan('combined'));

// These are the end routes for the API
let apiRoutes = require("./api-routes");

// use Express data parsing form and json data
app.use(express.urlencoded({
    extended : true,
}));
app.use(express.json());

// Connect to server with mongoose
const pw = process.env.EXP_PW;
mongoose.connect('mongodb://root:' + pw + '@mongo_api:27017', { useNewUrlParser: true}, { useUnifiedTopology: true });
const db = mongoose.connection;

// used for development
// data.new2();

// Use Api routes in the App
app.use('/api', apiRoutes)

app.get('/', (req, res) => res.send('Covid 19 Data API for Canada'));


// When you start the express server this will listen to
// port that it is running on and give a message if it is running
app.listen(port, function () {
     console.log("Running on port " + port);
});
