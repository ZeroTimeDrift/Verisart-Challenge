const express = require("express");
const multer = require('multer')
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./images")
      
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname)
    }
  })
  
const upload = multer({ storage: storage });

const recordRoutes = express.Router();
 
// DB connection establishment
const dbo = require("../db/conn");
 
 
// Endpoint to get all records from db
recordRoutes.route("/record").get(function (req, res) {
 let db_connect = dbo.getDb("certificates");
 db_connect
   .collection("records")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
 
// Creating new records in the DB
recordRoutes.route("/record/add").post(upload.single('photo'), function (req, response) {   
const file = req.file
console.log(req.file.filename);
 let db_connect = dbo.getDb();
 let myobj = {
   title: req.body.title,
   artist: req.body.artist,
   year: req.body.year,
   photo: req.file.filename,
 };
 db_connect.collection("records").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
 
// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 let newvalues = {
   $set: {
     name: req.body.name,
     position: req.body.position,
     level: req.body.level,
   },
 };
 db_connect
   .collection("records")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log("1 document updated");
     response.json(res);
   });
});
 
// Deleting records (if needs be)
recordRoutes.route("/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect.collection("records").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});
 
module.exports = recordRoutes;