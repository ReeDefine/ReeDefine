const express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    User = require('./models/user.js'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    apk = express();

//DB Connection
const dbURL = process.env.DB || 'mongodb://localhost:27017/test';
mongoose.connect(dbURL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(r => console.log("Database Connected"));

apk.use(bodyParser.urlencoded({extended: true}));
apk.use(bodyParser.json());
apk.set('view engine','ejs');
apk.use(express.static(__dirname + "/public"));

//Session
apk.use(require("express-session")({
    secret:"I have to complete this by today",
    saveUninitialized:false,
    resave:false,
}));

// Passport Config
apk.use(passport.initialize());
apk.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const userRoutes = require("./routes/auth_user");

apk.get("/",(request,respond)=>{
    console.log("+++++++++++++")
    respond.render("index")
});

apk.use("/user",userRoutes);



apk.listen(2090,()=>{
    console.log("Server Started");
});
