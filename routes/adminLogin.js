const express = require('express');
const router = express.Router();
const admin = require("../model/admin");
const bcrypt = require('bcrypt');
const saltRounds = 10;

// admin register
// router.post("/addadmin",(req,res) => {
    
//         var password = req.body.password;
    
//         bcrypt.genSalt(saltRounds, function (err, salt) {
//             if (err) {
//                 throw err
//             } else {
//                 bcrypt.hash(password, salt, function(err, hashedPassword){
//                     if (err) {
//                         throw err
//                     } else {
    
//                         data = {
//                             "username"      : req.body.username,
//                             "password"      : hashedPassword
//                         }
    
//                             var addadmin= new admin(data);
//                             addadmin.save().then(function(){
//                             res.send({
//                                 message:"Sucessful "
//                             });
    
                            
//                         }).catch(err => {
//                             res.status(500).send(
//                                 err.errors
//                             );
//                         });
    
//                     }
    
//                 })
//             }
//         })
//     });



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
                const username = admins.username;

                res.send({
                    id, 
                    username,
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
