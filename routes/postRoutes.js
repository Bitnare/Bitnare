const express= require('express');
const router= express.Router();
const postModel= require('../model/Posts.js');


router.post("/addpost",(req,res) => {

    data = {
        "postdescription": req.body.postdescription,
        "postimage":req.body.postimage,
        "posteddate":req.body.posteddate

    }

    const addPost= new postModel(data);
  addPost.save().then(result=>{
     res.status(200).json({
       "message":"Post added Sucessfully",
       posts:{
         id:result._id,
         postdescription:result.postdescription,
         postimage:result.postimage,
         posteddate:result.posteddate
       },
       type:{
         request:"GET",
         url:"http://localhost:8000/post/"+result._id
       }
     })
   }).catch(err=>{

     res.status(500).json({"message":"Error creating Post"})
   })

});


router.get('/',(req,res,next)=>{
postModel.find().select('_id postdescription postimage posteddate ').exec().
then(results=>{
  const response= {
        count: results.lenght,
        posts: results.map(result=>{
            return{
              _id: result._id,
              postdescription:result.postdescription,
              postimage:result.postimage,
              posteddate:result.posteddate,

              type:{
                 request: "GET",
                 url:"http://localhost:8000/post/"+ result._id
               }
            }


        })


  }
res.status(200).json({"Message":"All posts","Posts":response})

}).catch(error=>{
  res.status(500).json({"Error":error})
})
});


router.get('/:postid',(req,res,next)=>{
const id= req.params.postid
postModel.findById(id).select('_id postdescription postimage posteddate').exec().
then(results=>{
res.status(200).json({
"Post":results,
type:{
  request:"GET",
  url:"http://localhost:8000/post/" + results._id
}

})

}).catch(err=>{
  res.status(500).json({
    "message":"Error finding Post"
  })
})




});

module.exports=router;
