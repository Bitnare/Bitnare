const express= require('express');
const router= express.Router();
const postModel= require('../model/Posts.js');


router.post("/addpost",(req,res) => {

    data = {
        "postdescription"    : req.body.postdescription,
        "postimage"   : req.body.postimage,
        "posteddate":req.body.posteddate

    }

    const addPost= new postModel(data);
  addPost.save().then(result=>{
     res.status(200).json({
       "message":"Post added Sucessfully",
       "result":result
     })
   }).catch(err=>{

     res.status(500).json({"message":"Error creating Post"})
   })

});




module.exports=router;
