const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({

    first_name  :  {type:String, required: true},
    middle_name :  {type:String},
    last_name   :  {type:String, required: true},
    dob         :  {type:Date, 
                     default:Date.now(), required: true},
    gender      :  {type:String, required: true},   
    hometown    :  {type:String, required: true},
    current_city:  {type:String, required: true},
    height      :  {type:String, required: true},
    weight      :  {type:String, required: true},
    drink       :  {type:String, required: true},
    smoke       :  {type:String, required: true},
    education   :  {type:String, required: true},
    skills      :  {type:String, required: true},
    job_title   :  {type:String},
    company_name:  {type:String},
    user_type   :  {type:String},
    username    :  {type:String, requi3red: true, unique: true},
    password    :  {type:String, required: true}

});
userSchema.statics.checkCrediantialsDb = async (username, password,callback) => {
    const user = await User.findOne({
        username: username
    });
    if (user) {
        var hashedPassword= user.password;
        if(bcrypt.compareSync(password, hashedPassword)) {
          return user;
        }
    
     
    };
}
const User = mongoose.model("register", userSchema);
module.exports = User;