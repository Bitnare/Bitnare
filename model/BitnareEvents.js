const mongoose = require('mongoose');
const fs = require('fs');
const moment = require('moment');
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
    formattedstartdate:String,
    start_hour:String,
    formattedenddate:String,
    end_hour:String,
    createdAt:{
        type:Date,
        default:Date.now
    }
}
);

//  handles all time formatting
bitnareEventsSchema.post('init',async function(){
    // send formatted date using moment js
    let formatstartdate = moment(this.start_date).format("YYYY-MM-DD");
    this.formattedstartdate = formatstartdate.toString();
    this.start_hour = moment(this.start_date).hour();

    let formatenddate = moment(this.end_date).format("YYYY-MM-DD");
    this.formattedenddate = formatenddate.toString();
    this.end_hour = moment(this.end_date).hour();
});


module.exports = mongoose.model('bitnare_events',bitnareEventsSchema );