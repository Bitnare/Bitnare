const express = require('express');
const router = express.Router();
const BitnareEvent = require('../model/BitnareEvents');
const multer= require('multer');
const fs = require('fs');
// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/bitnare_events')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() +'-' + file.originalname);
    }
  }) ;
   
var upload = multer({ storage: storage });

// Get all Events
router.get('/',async (req,res)=>{
    try{
        const bitnareEvents =await BitnareEvent.find();
       
        res.status(200).json({
            sucess:true,
            data:bitnareEvents,
        })
    }
    catch(e){
        res.status(400).json({
            sucess:false,
            data:e
        })
    }
});

// Get Single Event
router.get('/:id',async (req,res,next)=>{
    try{
        const bitnareEvent =await BitnareEvent.findById(req.params.id);
        if(!bitnareEvent){
            return  res.status(400);
        }
        res.status(200).json({
            sucess:true,
            data:bitnareEvent
        })
    }
    catch(e){
        res.status(400).json({
            sucess:false,
            data:e
        })
    }    
});

// Post event
router.post('/',upload.array('myFile',10),async (req,res,next)=>{
   try{
    req.body.photo = req.files.map(file => {
        const imagePath = file.path;
        return imagePath
    });   
    formatteddate = new Date(`${req.body.start_date} ${req.body.startevent_time}`);
    req.body.start_date = formatteddate;

    console.log(req.body.start_date.getHours() );
    const event = await BitnareEvent.create(req.body);
    res.status(201).json({
        sucess:true,
        data:event,
    });
    }
    catch(e){
        // deletes images if there is problem when creating model
        req.body.photo.forEach(photo_url => {
            fs.unlinkSync(photo_url);
        });
        
        res.status(404).json({
            sucess:false,
            data:e,
        })
    }
});

//Update Single Event
router.put('/:id',upload.array('myFile',10),async(req,res,next)=>{
    try{
    
    const bitnareEvent = await BitnareEvent.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    });

    if(! bitnareEvent){
        return res.status(400).json({
            sucess:false,
            data:'The event could not be found',
        });
    }
    
        return res.status(200).json({
            sucess:true,
            data:bitnareEvent,
        });
    
}
catch(e){
    res.status(400).json({
        sucess:false,
        data:e
    })
}
});

// Delete a single event
router.delete('/:id',async(req,res,next)=>{
    try{
    const bitnareEvent = await BitnareEvent.findById(req.params.id);
    const photos = bitnareEvent.photo;
    const deleteEvent =await BitnareEvent.deleteOne(bitnareEvent);   
    if(!deleteEvent){
        return res.status(300).json({
            sucess:false,
            data:'The event could not be found',
        });
    }
    else{
        photos.forEach(photo_url => {
            fs.unlinkSync(photo_url);
        });
        return res.status(200).json({
            sucess:true,
        })
    }
    }
    catch(e){
        res.status(400).json({
            sucess:false,
            data:e
        })
    }
});

module.exports = router;