const express = require('express');
const router = express.Router();
const user = require("../model/register");
const geocoder = require('../utils/geocoder');
router.post('/searchUser', function (req, res){

    var job = req.body.job_title;
    var skills = req.body.skills;
    var gender = req.body.gender;
    var min_age = req.body.min_age;
    var max_age = req.body.max_age;

    // console.log(min_age, max_age);
    var current = new Date();
    // var min_age = new min_age();
    // console.log(min_age);

    var min = current.getFullYear()-min_age;
    var max = current.getFullYear()-max_age;
  
    var min_range = new Date(min+"-"+current.getUTCMonth()+"-"+current.getUTCDay());
    var max_range = new Date(max+"-"+current.getUTCMonth()+"-"+current.getUTCDay());
   

    console.log(min_range);
    console.log(max_range);
    user.find({ 
        $or:[
            {'job_title' : new RegExp (job, 'i')},
            {'skills' : new RegExp (skills, 'i')},
            {'gender' : new RegExp (gender, 'i')}
        ],

        $and:[
            {'dob': {$gt:min_range}}
        ]
        }).then (function (listing) {
        console.log(listing);
        // if(listing){
        //     var dob =listing[0].dob;
        //         var current = new Date();
        //         var dob = new Date(dob);

        //     var datediff=current.getFullYear()-dob.getFullYear();
        //     var age = datediff;
        // }
        res.send(listing);
        // console.log(age);

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

