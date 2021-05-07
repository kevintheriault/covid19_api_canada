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

// Use Api routes in the App
app.use('/api', apiRoutes)

app.get('/', (req, res) => res.send('Covid 19 Data API for Canada'));

// schedule updates to data from opencovid api instead of manually posting now.
const cron = require('node-cron');

const update_P = cron.schedule('30 18 * * *', () => {
    console.log('Starting Provincial CRON Job.')
  data.add_from_opencovid_p();
},{
    timezone: "America/Toronto"
});

const update_N = cron.schedule('15 18 * * *', () => {
    console.log('Starting National CRON Job.')
    data.add_from_opencovid_n();
},{
    timezone: "America/Toronto"
});

// When you start the express server this will listen to
// port that it is running on and give a message if it is running
app.listen(port, function () {
     console.log("Running on port " + port);
});
