const express = require('express');
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const { uploadFile } = require('./s3')

// userRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will
// take control of requests starting with path /user.
const s3routes = express.Router();

// This will help us connect to the database
const dbo = require('../db/conn');

// Load the SDK for JavaScript
var AWS = require('aws-sdk');
// Set the Region 
AWS.config.update({region: 'us-east-2'});

const bucketName = "myashamusic"
 
function uploadFile()
{
  const fileStream = fs.createReadStream(file.path)

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
  }

  return s3.upload(uploadParams).promise()
}
const ObjectId = require('mongodb').ObjectId;

s3Routes.post('/uploadTrack', upload.single('music'), async (req, res) => {
    const file = req.file
    console.log(file)  
    const result = await uploadFile(file)
    await unlinkFile(file.path)
    console.log(result)
    const description = req.body.description
})






module.exports = userRoutes;
