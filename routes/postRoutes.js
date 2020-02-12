const express= require('express');
const router= Router.express();
const postModel= require('../model/Posts');


router.post('/addproduct',(req,res,next)=>{
const createPosts= new postModel({
  postdescription:req.body.postdescription,
  postimage:req.body.postimage,
  posteddate:req.body.posteddate
});

createPosts.save().
then(result=>{
res.status(200).json({
  "message":"Post is created Sucessfully",
  "Posts":result


})

}).

catch(err=>{
  next({"message":"Sorry! some error while creating posts"})
})
});





module.exports=router;
