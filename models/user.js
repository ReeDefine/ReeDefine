var mongoose  = require('mongoose'),
    Detail = require('../models/detail')
    passportLocalMongoose = require('passport-local-mongoose');

var User_Schema = new mongoose.Schema({
   username:String,
   password:String,
   DOB:Date,
   updates: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: Detail
      }
   ]
});

User_Schema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User",User_Schema);