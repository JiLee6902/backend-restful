require("dotenv").config();

const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const configViewEngine = require("./config/viewEngine");
const webRoutes = require("./routers/web");
const apiRoutes = require("./routers/api");
const fileUpload = require('express-fileupload')
const { MongoClient } = require('mongodb');
const connection = require("./config/database");
const User = require('./models/user');

const app = express();
const port = process.env.PORT || 6969;
const hostname = process.env.HOST_NAME;

//config file upload
app.use(fileUpload());

//config req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//config template engine
configViewEngine(app);

//khai báo route
app.use("/", webRoutes);
app.use("/v1/api", apiRoutes);


// simple query

(async () => {
  try {
    // using mongoose
    await connection();


    //using mongodb driver
    // const url = process.env.DB_HOST_WITH_DRIVER;
    // const client = new MongoClient(url);

    // const dbName = process.env. DB_NAME;

    // await client.connect();
    // console.log('Connected successfully to server');
    // const db = client.db(dbName);
    // const collection = db.collection('customers');

    // let a = await collection.find({ name: "chi1" }).toArray();
    // console.log("find()= ", a);

    app.listen(port, hostname, () => {
      console.log(`Backend zero app listening on port ${port}`);
    })
  } catch (error) {
    console.log("Error to connect");
  }
})()


