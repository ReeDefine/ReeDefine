var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    User = require('../models/user.js');

router.get("/auth",(request,respond)=>{
    respond.render("user/auth.ejs")
});

router.get("/logout",(request,respond)=>{
    request.logout()
    respond.redirect("/user/auth")
});


router.post("/login",passport.authenticate("local",
    {
        successRedirect:"/user/userDashboard",
        failureRedirect:"/user/auth"}),
    (request,respond)=>{
    });



router.get('/userDashboard',(request,respond)=>{
    console.log("sdsadfasedsgf");
    respond.render("user/userDashboard",{user:request.user})
});

router.post("/register",(request,respond)=> {
    console.log(request.body);
    const newUser1 = new User({username: request.body.username, DOB: request.body.DOB});
    User.register(newUser1, request.body.password, (err, createdUser) => {
        if (err) {
            console.log(err.message);
            respond.send("Some error");
            return respond.render("user/auth")
        }
        passport.authenticate(`local`)(request, respond, () => {
            console.log(createdUser);
            respond.render("user/userDashboard",{user:createdUser})
        });
    });
});

module.exports=router;