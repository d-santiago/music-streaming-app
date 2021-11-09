const express = require('express');

// userRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will
// take control of requests starting with path /user.
const userRoutes = express.Router();

// This will help us connect to the database
const dbo = require('../db/conn');

// Load the SDK for JavaScript
var AWS = require('aws-sdk');
// Set the Region 
AWS.config.update({region: 'us-east-2'});


// This help convert the id from string to ObjectId for the _id.
const ObjectId = require('mongodb').ObjectId;








module.exports = userRoutes;
