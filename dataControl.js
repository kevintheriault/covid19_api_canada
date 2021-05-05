
const Data = require('./dataModel');
const _ = require('lodash');

// View all data
exports.index = function (req, res) { 
    Data.get(function (err, data) {
        const formatData = _.sortBy(data, 'date');
        if (err) {
            res.json({
                status: "Error",
                message: err
            });
        }else{
            res.json({
                message: "Data successfully retrieved",
                data: formatData
            })
        }  
    });  
};

// Adding data to the database.
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
    Data.find({location: req.params.location }, function (err, data) {
        const formatData = _.sortBy(data, 'date');
        if (err){
            res.send(err);
        }
        res.json({
            message: 'Retrieved specific dataset: ',
            data: formatData
        });
    });
};

// Updated specific date data
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
                        message: 'Date dataset updated',
                        data: data
                    });
                }
            });
        });
    };

    // Delete data
exports.delete = function (req, res) {
    Data.remove({date: req.params.date
    }, function (err, data) {
        if (err) {
            res.send(err)
        }else{            
            res.json({
                status: "Success",
                message: "Data deleted"
            });
        }
    });
};


// admin
exports.admin = function (req, res) { 
    Data.get(function (err, data) {
        const formatData = _.sortBy(data, 'date');
        if (err) {
            res.json({
                status: "Error",
                message: err
            });
        }else{
            res.json({
                message: "Data successfully retrieved",
                data: formatData
            })
        }  
    });  
};

