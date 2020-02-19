const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const uniqueValidator = require('mongoose-unique-validator');

const adminSchema = new Schema({

    username    :  {
        type:String, 
        required: [true, 'Enter username'], 
        unique: true},
    password    :  {
        type:String, 
        required: [true,'Enter password'],
        minlength: [8,'Enter valid password']
    }

});

//hashed password
adminSchema.statics.checkCrediantialsDb = async (username, password,callback) => {
    const admin = await Admin.findOne({
        username: username
    });
    if (admin) {
        var hashedPassword= admin.password;
        if(bcrypt.compareSync(password, hashedPassword)) {
          return admin;
        }
    
     
    };
}

adminSchema.plugin(uniqueValidator);
const Admin = mongoose.model("admin", adminSchema);
module.exports = Admin;