const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    first_name  :  {type:String},
    middle_name :  {type:String},
    last_name   :  {type:String},
    dob         :  {type:Date, 
                     default:Date.now()},
    gender      :  {type:String},
    hometown    :  {type:String},
    current_city:  {type:String},
    height      :  {type:String},
    weight      :  {type:String},
    drink       :  {type:String},
    smoke       :  {type:String},
    education   :  {type:String},
    skills      :  {type:String},
    user_type   :  {type:String},

})

const User = mongoose.model("register", userSchema);
module.exports = User;