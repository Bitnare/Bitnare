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
router.get('/',async (req,res,next)=>{
    try{
        const bitnareEvents =await BitnareEvent.find();
        res.status(200).json({
            sucess:true,
            data:bitnareEvents
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
router.post('/',upload.single('myFile'),async (req,res,next)=>{
   try{
    req.body.photo = req.file.path;   
    const event = await BitnareEvent.create(req.body);
    res.status(201).json({
        sucess:true,
        data:event,
    });
    }
    catch(e){
        fs.unlinkSync(req.file.path);
        res.status(404).json({
            sucess:false,
            data:e,
        })
    }
});

//Update Single Event
router.put('/:id',async(req,res,next)=>{
    try{
    const bitnareEvent = await BitnareEvent.findByIdAndUpdate(req.params.id);

    if(! bitnareEvent){
        return res.status(300).json({
            sucess:false,
            data:'The event could not be found',
        });
    }
    else{
        return res.status(400).json({
            sucess:true,
            data:bitnareEvent,
        });
    }
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
    const bitnareEvent = await BitnareEvent.findByIdAndDelete(req.params.id);

    if(! bitnareEvent){
        return res.status(300).json({
            sucess:false,
            data:'The event could not be found',
        });
    }
    else{
        return res.status(400).json({
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