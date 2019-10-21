var mongoose = require('mongoose');

var details_Schema = new mongoose.Schema({
    height:Number,
    weight:Number,
    activity:Number
});

module.exports = mongoose.model("Detail", details_Schema);