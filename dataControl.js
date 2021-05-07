
const Data = require('./dataModel');
const _ = require('lodash');
const axios = require('axios');
const moment = require('moment');

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

exports.add_from_opencovid_p = async function (req, res) {
    
    try { 
        let response = await axios.get('https://api.opencovid.ca/summary?ymd=true');

        console.log('Received todays provincial data.')

        for(let i = 0; i < response.data.summary.length; i++){
            var data = new Data();
            if(response.data.summary[i].date == "NULL"){
                data.date = null;
            }else{
                data.date = moment(response.data.summary[i].date).format('YYYY-MM-DD');
            }
            if(response.data.summary[i].active_cases == "NULL"){
                data.active_cases = null;
            }else{
            data.active_cases = response.data.summary[i].active_cases;
            }
            if(response.data.summary[i].active_cases_change == "NULL"){
                data.active_cases_change = null;
            }else{
            data.active_cases_change = response.data.summary[i].active_cases_change;
            }
            if(response.data.summary[i].cases == "NULL"){
                data.cases = null;
            }else{
            data.cases = response.data.summary[i].cases;
            }
            if(response.data.summary[i].cumulative_cases == "NULL"){
                data.total_cases = null;
            }else{
            data.total_cases = response.data.summary[i].cumulative_cases;
            }
            if(response.data.summary[i].deaths == "NULL"){
                data.deaths = null;
            }else{
            data.deaths = response.data.summary[i].deaths;
            }
            if(response.data.summary[i].cumulative_deaths == "NULL"){
                data.total_deaths = null;
            }else{
            data.total_deaths = response.data.summary[i].cumulative_deaths;
            }
            if(response.data.summary[i].recovered == "NULL"){
                data.recovered = null;
            }else{
            data.recovered = response.data.summary[i].recovered;
            }
            if(response.data.summary[i].cumulative_recovered == "NULL"){
                data.total_recovered = null;
            }else{
            data.total_recovered = response.data.summary[i].cumulative_recovered;
            }
            if(response.data.summary[i].province == "NULL"){
                data.location = null;
            }else{
            data.location = response.data.summary[i].province;
            }
            if(response.data.summary[i].avaccine == "NULL"){
                data.vaccination_shots = null;
            }else{
            data.vaccination_shots = response.data.summary[i].avaccine;
            }
            if(response.data.summary[i].cumulative_avaccine == "NULL"){
                data.total_vaccinations_1st = null;
            }else{
            data.total_vaccinations_1st = response.data.summary[i].cumulative_avaccine;
            }
            if(response.data.summary[i].cumulative_cvaccine == "NULL"){
                data.completed_vaccinations = null;
            }else{  
            data.completed_vaccinations = response.data.summary[i].cumulative_cvaccine;
            }

            data.save();
            }
        console.log('Todays provincial data updated.') 
    } catch (err) {
        console.error(err);
    }}, error => {
            console.log(error);
}

exports.add_from_opencovid_n = async function (req, res) {
    
    try { 
        let response = await axios.get('https://api.opencovid.ca/summary?loc=canada&ymd=true');

        console.log('Received national data.')
            var data = new Data();
            if(response.data.summary[0].date == "NULL"){
                data.date = null;
            }else{
                data.date = moment(response.data.summary[0].date).format('YYYY-MM-DD');
            }
            if(response.data.summary[0].active_cases == "NULL"){
                data.active_cases = null;
            }else{
            data.active_cases = response.data.summary[0].active_cases;
            }
            if(response.data.summary[0].active_cases_change == "NULL"){
                data.active_cases_change = null;
            }else{
            data.active_cases_change = response.data.summary[0].active_cases_change;
            }
            if(response.data.summary[0].cases == "NULL"){
                data.cases = null;
            }else{
            data.cases = response.data.summary[0].cases;
            }
            if(response.data.summary[0].cumulative_cases == "NULL"){
                data.total_cases = null;
            }else{
            data.total_cases = response.data.summary[0].cumulative_cases;
            }
            if(response.data.summary[0].deaths == "NULL"){
                data.deaths = null;
            }else{
            data.deaths = response.data.summary[0].deaths;
            }
            if(response.data.summary[0].cumulative_deaths == "NULL"){
                data.total_deaths = null;
            }else{
            data.total_deaths = response.data.summary[0].cumulative_deaths;
            }
            if(response.data.summary[0].recovered == "NULL"){
                data.recovered = null;
            }else{
            data.recovered = response.data.summary[0].recovered;
            }
            if(response.data.summary[0].cumulative_recovered == "NULL"){
                data.total_recovered = null;
            }else{
            data.total_recovered = response.data.summary[0].cumulative_recovered;
            }
            if(response.data.summary[0].province == "NULL"){
                data.location = null;
            }else{
            data.location = response.data.summary[0].province;
            }
            if(response.data.summary[0].avaccine == "NULL"){
                data.vaccination_shots = null;
            }else{
            data.vaccination_shots = response.data.summary[0].avaccine;
            }
            if(response.data.summary[0].cumulative_avaccine == "NULL"){
                data.total_vaccinations_1st = null;
            }else{
            data.total_vaccinations_1st = response.data.summary[0].cumulative_avaccine;
            }
            if(response.data.summary[0].cumulative_cvaccine == "NULL"){
                data.completed_vaccinations = null;
            }else{  
            data.completed_vaccinations = response.data.summary[0].cumulative_cvaccine;
            }

            data.save();

        console.log('Todays national data updated.') 
    } catch (err) {
        console.error(err);
    }}, error => {
            console.log(error);
}

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
//NOT USED.
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
        <h1>Add data to the API</h1>
        <form action="admin/post" enctype="multipart/form-data" method="post">
            <div>Date: <input type="text" name="date" /></div>
            <div>Active Cases: <input type="text" name="active_cases" /></div>
            <div>Change in Active: <input type="text" name="active_cases_change" /></div>
            <div>Cases: <input type="text" name="cases" /></div>
            <div>Total Cases: <input type="text" name="total_cases" /></div>
            <div>Deaths: <input type="text" name="deaths" /></div>
            <div>Total Deaths: <input type="text" name="total_deaths" /></div>
            <div>Recovered: <input type="text" name="recovered" /></div>
            <div>Total Recovered: <input type="text" name="total_recovered" /></div>
            <div>Location: <input type="text" name="location" /></div>
            <div>Vaccination Shots: <input type="text" name="vaccinations_shots" /></div>
            <div>Total 1st Shot Vaccination: <input type="text" name="total_vaccinations_1st" /></div>
            <div>Completed Vaccinations: <input type="text" name="completed_vaccinations" /></div>

            <div>Access Token: <textarea name="token" rows="5" cols="50"></textarea></div>

            <input type="submit" value="POST" />
        </form>
    `);
};
