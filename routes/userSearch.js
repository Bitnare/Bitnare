const express = require('express');
const router = express.Router();
const user = require("../model/register");

router.post('/searchUser', function (req, res){

    var job = req.body.job;
    var skills = req.body.skills;
    var gender = req.body.gender;
    var dob = req.body.dob;

    user.find({

        'job_title' : new RegExp (job, 'i'),
        'skills' : new RegExp (skills, 'i'),
        'gender' : new RegExp (gender, 'i'),
        'dob' : new RegExp (dob, 'i')
    
        }).then (function (listing) {
        console.log(listing);
        res.send(listing);
    }).catch (function (e){
        res.send(e)
    });

});
module.exports = router;

