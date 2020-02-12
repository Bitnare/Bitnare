const express = require('express');
const router = express.Router();
const user = require("../model/register");

router.post("/addUser",(req,res) => {

    data = {
        "first_name"    : req.body.first_name,
        "middle_name"   : req.body.middle_name,
        "last_name"     : req.body.last_name,
        "gender"        : req.body.gender,
        "hometown"      : req.body.hometown,
        "current_city"  : req.body.current_city,
        "height"        : req.body.height,
        "weight"        : req.body.weight,
        "drink"         : req.body.drink,
        "smoke"         : req.body.smoke,
        "education"     : req.body.education,
        "skills"        : req.body.skills,
        "user_type"     : req.body.user_type
    }

    var addUser= new user(data);
    addUser.save().then(function(){
        res.send({
            messare:"Sucessful "
        })
    });

});

module.exports = router;