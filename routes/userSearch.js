const express = require('express');
const router = express.Router();
const user = require("../model/register");
const geocoder = require('../utils/geocoder');
router.post('/searchUser', function (req, res){

    var job = req.body.job;
    var skills = req.body.skills;
    var gender = req.body.gender;
    var dob = req.body.dob;

    user.find({

        'job_title' : new RegExp (job, 'i'),
        'skills' : new RegExp (skills, 'i'),
        'gender' : new RegExp (gender, 'i'),
    
        }).then (function (listing) {
        console.log(listing);
        res.send(listing);
    }).catch (function (e){
        res.send(e)
    });

});


// pass in the current address of the user in the request which may be comming from browser or mobile
// in the url
router.get('/radius/:address/:distance',async (req,res)=>{
    const {address,distance} = req.params;
    // get longitude and latiude from geolocation
    try{
    const loc = await geocoder.geocode(address);
    const latitude= loc[0].latitude;
    const longitude = loc[0].longitude;

    // Calc radius using radians
    // Divide distance by radius of earth
    // Earth radius = 6,378 km
    const radius = distance / 6378 ;
    
    //find users by current adress and km
    const users = await user.find({
        location:{
            $geoWithin : { $centerSphere:[[longitude,latitude],radius]}
        }
    });

    res.status(200).json({
        success:true,
        count:users.length,
        data :users
    });
    }
    catch(e){
        res.status(200).json({
            success:false,
            data:e
    });
    }

})
module.exports = router;

