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
        "user_type"     : req.body.user_type,
        "username"     : req.body.username,
        "password"     : req.body.password
    }

    var addUser= new user(data);
    addUser.save().then(function(){
        res.send({
            message:"Sucessful "
        })
    });

});
//get all user
router.get('/getUser', function(req,res){
    user.find().then(function(users){
        res.send(users);
    }).catch(function(e){
        res.send(e);
    });
});
//get user by id
router.get("/fetchUser/:id", function (req,res){
    var UserId = req.params.id.toString();
    console.log(UserId);
    user.find({
        _id: UserId
    }).then(function (getuser) {
        res.send(getuser);
    }).catch(function (e) {
        res.send(e);
    });
});

//update user by id
router.put('/updateUser/:id', function(req,res){
    UserId = req.params.id.toString();
    user.findByIdAndUpdate(UserId,req.body,{
        new:true
    }).then(function(updateuser){
        res.send(updateuser);

    }).catch(function(e){
        res.send(e);
    });
});

//delete user by id
router.delete('/deleteUser/:id', function (req,res){
    user.findByIdAndDelete(req.params.id).then(function (user){
        res.json({
            message: "User deleted"
        })
    }).catch(function (e){
        res.send(e);
    });
});

module.exports = router;