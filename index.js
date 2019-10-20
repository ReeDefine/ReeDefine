const express = require('express'),
    bodyParser = require('body-parser'),
    apk = express();

bodyParser.urlencoded({extended: true});
apk.use(bodyParser.json());
apk.set('view engine','ejs');
apk.use(express.static(__dirname + "/public"));


apk.get("/",(request,respond)=>{
    console.log("+++++++++++++")
    respond.render("index")
});

apk.listen(2090,()=>{
    console.log("Server Started");
});
