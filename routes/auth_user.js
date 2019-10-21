var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    Detail = require('../models/detail')
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
    respond.render("user/userDashboard",{user:request.user});
    user_id = request.user.id;
    User.findById(user_id).populate("updates").exec((err,foundUser)=>{
        if (err){
            console.log(err);
        }else{
            console.log("Showing:=>");
            console.log(foundUser);
            respond.render("user/userDashboard",{user:foundUser});
        }
    });
});

router.post("/register",(request,respond)=> {
    console.log(request.body);
    const newUser1 = new User({username: request.body.username, DOB: request.body.DOB});
    User.register(newUser1, request.body.password, (err, createdUser) => {
        if (err) {
            console.log(err.message);
            return respond.render("user/auth")
        }
        passport.authenticate(`local`)(request, respond, () => {
            console.log(createdUser);
            respond.render("user/userDashboard",{user:createdUser})
        });
    });
});

router.post('/addDetail',(request,respond)=>{
    user = request.user.id;
    User.findById(user,(err,fouundUser)=>{
        if(err){
            console.log(err.message,err.code);
            respond.redirect('/user/dashboard');
        }else{
            Detail.create(request.body.detail,(err,createdComment)=>{
                if(err){
                    console.log(err.code,err.message)
                }else{
                    console.log(fouundUser);
                    console.log(createdComment);
                    fouundUser.updates.push(createdComment);
                    fouundUser.save();
                    respond.redirect('/user/userDashboard')
                }
            })


        }
    });
});

module.exports=router;