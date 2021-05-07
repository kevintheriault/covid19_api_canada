const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

// Setup schema
const dataSchema = mongoose.Schema({
    _id: {type: Number, select: false},
    date: {type: String, require: true},
    active_cases: Number,
    active_cases_change: Number,
    cases: Number,
    total_cases: Number,
    deaths: Number,
    total_deaths: Number,
    recovered: Number,
    total_recovered: Number,
    location: String,
    vaccination_shots: Number,
    total_vaccinations_1st: Number,
    completed_vaccinations: Number,
    __v: 
        {type: Number, 
        select: false}
}, {_id: false});

dataSchema.plugin(AutoIncrement);


// Export Contact model
const Data = module.exports = mongoose.model('data', dataSchema, 'covid_data');

module.exports.get = function (callback, limit) {
    Data.find(callback).limit(limit);
}
