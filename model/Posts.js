const mongoose= require('mongoose');
require=('../database/db.js');



const postSchema= new mongoose.Schema({
postdescription:{
type:String,
required:true
} ,
postimage:{
type:String,
required:true
},
posteddate:{
type:Date,
default:Date.now()

}

})

const postModel= mongoose.model('posts',postSchema);
module.exports=postModel;
