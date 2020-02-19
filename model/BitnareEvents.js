const mongoose = require('mongoose');
const fs = require('fs');
const bitnareEventsSchema = new mongoose.Schema({
    title : {
        type:String,
        required:[true,'Please add a title'],
        unique:true
    },
    slug : String,
    start_date: Date,
    end_date: Date,
    details: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [500, 'Description can not be more than 500 characters']
    },
    location: {
        type: String,
        required: [true, 'Please add an location']
    },
    industry :[{
        type: String,
        required:[true,'Please specify atleast one industry']
    }],
    photo: { 
        type: [String],
        required: true 
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
}
);



module.exports = mongoose.model('bitnare_events',bitnareEventsSchema );