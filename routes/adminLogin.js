const express = require('express');
const router = express.Router();
const admin = require("../model/admin");
const bcrypt = require('bcrypt');
const saltRounds = 10;


//admin login
router.post('/adminlogin', async function(req, res){
    if (req.body.username == "") {
        res.json({
            message: "Username is empty"    
        });
    } else if (req.body.password == "" ){
        res.json({
            message: "Password is empty"
        });

    } else {
        try {
            const admins = await admin.checkCrediantialsDb(req.body.username, req.body.password);
            if (admins) {
                var id = admins._id;

                res.send({
                    id, 
                    message: "Login sucess"
                });

            }else{
                res.json({
                    message:"User not found"
                });
            }
        }catch (e){
            console.log(e);
        }
    } 
});

module.exports = router;
