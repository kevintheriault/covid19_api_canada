
const Data = require('./dataModel');
const _ = require('lodash');

// View all data on the index.
exports.index = function (req, res) { 
    Data.get(function (err, data) {

        // format data before presenting it to be sorted by 'date' using LODASH
        const formatData = _.sortBy(data, 'date');
        if (err) {
            res.json({
                status: "Error",
                message: err
            });
        }else{
            res.json({
                message: "Data successfully retrieved",
                data: formatData  //show formatted (sorted) data
            })
        }  
    });  
};

// Adding a single data item to the database using forms (req.body).
exports.new = function (req, res) {
    let data = new Data();

    data.date = req.body.date;
    data.active_cases = req.body.active_cases;
    data.active_cases_change = req.body.active_cases_change;
    data.cases = req.body.cases;
    data.total_cases = req.body.total_cases;
    data.deaths = req.body.deaths;
    data.total_deaths = req.body.total_deaths;
    data.recovered = req.body.recovered;
    data.total_recovered = req.body.total_recovered;
    data.location = req.body.location;
    data.vaccination_shots = req.body.vaccinations_shots;
    data.total_vaccinations_1st = req.body.total_vaccinations_1st;  
    data.completed_vaccinations = req.body.completed_vaccinations;
    
    data.save(function (err) {
        if (err) {
            res.send(err)
        }else{
            res.json({
                message: 'Data added successfully',
                data: data
                });
            }
    });
};

// View specific LOCATION data.
exports.view = function (req, res) {

    // find 'location' where it equals the 'param' request. ie /api/Canada Canada is the param
    Data.find({location: req.params.location }, function (err, data) {

        // sort data using LODASH
        const formatData = _.sortBy(data, 'date');
        if (err){
            res.send(err);
        }
        res.json({
            message: 'Retrieved specific data for: ' + req.params.location,
            data: formatData //display sorted data
        });
    });
};

// Update specific data by date param.  ie. api/admin/2020-01-01 param to update is '2020-01-01'
exports.update = function (req, res) {
    Data.find({date: req.params.date}, function (err, data) {
            if (err) {
                res.send(err);
            }
                data.date = req.body.date;
                data.active_cases = req.body.active_cases;
                data.active_cases_change = req.body.active_cases_change;
                data.cases = req.body.cases;
                data.total_cases = req.body.total_cases;
                data.deaths = req.body.deaths;
                data.total_deaths = req.body.total_deaths;
                data.recovered = req.body.recovered;
                data.total_recovered = req.body.total_recovered;
                data.location = req.body.location;
                data.vaccination_shots = req.body.vaccinations_shots;
                data.total_vaccinations_1st = req.body.total_vaccinations_1st;  
                data.completed_vaccinations = req.body.completed_vaccinations;

    // save the contact and check for errors
            data.save(function (err) {
                if (err) {
                    res.json(err);
                }else{
                    res.json({
                        message: 'Data for ' + req.params.date + ' updated',
                        data: data
                    });
                }
            });
        });
    };

    // Delete data by date param ie. api/admin/2020-01-01 2020-01-01 = param
exports.delete = function (req, res) {
    Data.remove({date: req.params.date
    }, function (err, data) {
        if (err) {
            res.send(err)
        }else{            
            res.json({
                status: "Success",
                message: "Data for: " + req.params.date + " deleted"
            });
        }
    });
};


// admin index.
// TODO: Add form for posting data
// TODO: Add delete functionality
// TODO: Add update functionality.

exports.admin = function (req, res) { 
    res.send(`
        <h1>Add data to the API<h1>
        <form action="admin/api/post" enctype="multipart/form-data" method="post">
            <div>Date: <input type="text" name="date" /></div>
            <input type="submit" value="POST" />
        </form>
    `);
};

