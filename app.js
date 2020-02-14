const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyparser = require('body-parser');
const mongoose = require('./database/db');
const cors = require("cors");
const multer = require('multer');

const userRegister = require("./routes/userRegister");
<<<<<<< HEAD
const postRoutes= require("./routes/postRoutes.js");

=======
const bitnareEvents = require("./routes/bitnareEvents");


>>>>>>> 0d17b9c01fc0f6ba23cd652e5197a5f2f6e402c1
app.use("/uploads",express.static('uploads'))
app.use(morgan("dev"));
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use(cors());

app.use("/user", userRegister);
<<<<<<< HEAD
app.use("/post",postRoutes);


=======
app.use("/events",bitnareEvents);
//for handliing cors errors
>>>>>>> 0d17b9c01fc0f6ba23cd652e5197a5f2f6e402c1
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin,X-Requested-With,Content-Type,Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE");
      return res.status(200).json({});
    }
    next();
  });



app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });

  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message
      }
    });
  });
  const port = process.env.PORT || 8000;
  app.listen(port);
