const express = require('express');
const router = express.Router();
const BitnareEvent = require('../model/BitnareEvents');

router.get('/', (res,req)=>{
   
});

router.post('/',async (res,req)=>{
    const event = await BitnareEvent.create(req.body);
    res.status(201).json({
        sucess:true,
        data:event,
    })
});

