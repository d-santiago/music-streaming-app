const express = require('express');

// userRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will
// take control of requests starting with path /user.
const userRoutes = express.Router();

// This will help us connect to the database
const dbo = require('../db/conn');

// This help convert the id from string to ObjectId for the _id.
// const ObjectId = require('mongodb').ObjectId;

// This section will help you create a new user.
userRoutes.route('/user/register').post(function(req, response) {
  const dbConnect = dbo.getDb();
  const object = {
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    dob: req.body.dob,
    followers: [],
    following: [],
    bio: '',
    genres: [],
    isArtist: false,
    artistName: '',
    songs: [],
    albums: [],
    playlist: [{
      'name': '',
      'coverURL': '',
      'songs': [],
    }],
  };
  dbConnect.collection('users').insertOne(object, function(err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section allows a user to login
userRoutes.route('/user/login').post(function(req, res) {
  const dbConnect = dbo.getDb();
  const query = {
    username: req.body.username,
    password: req.body.password,
  };
  dbConnect.collection('users').findOne(query, function(err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// // This section will help you get a list of all the users.
// userRoutes.route("/user").get(function (req, res) {
//   let dbConnect = dbo.getDb();
//   dbConnect
//     .collection("users")
//     .find({})
//     .toArray(function (err, result) {
//       if (err) throw err;
//       res.json(result);
//     });
// });

// // This section will help you get a single user by id
// userRoutes.route("/user/:id").get(function (req, res) {
//   let dbConnect = dbo.getDb();
//   let myquery = { _id: ObjectId( req.params.id )};
//   dbConnect
//       .collection("users")
//       .findOne(myquery, function (err, result) {
//         if (err) throw err;
//         res.json(result);
//       });
// });

// // This section will help you update a user by id.
// userRoutes.route("/user/:id").post(function (req, response) {
//   let dbConnect = dbo.getDb();
//   let myquery = { _id: ObjectId( req.params.id )};
//   let newvalues = {
//     $set: {
//       username: req.body.username,
//       password: req.body.password,
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//       email: req.body.email,
//       dob: req.body.dob,
//     },
//   };
//   dbConnect
//     .collection("users")
//     .updateOne(myquery, newvalues, function (err, res) {
//       if (err) throw err;
//       console.log("User updated");
//       response.json(res);
//     });
// });

// // This section will help you delete a user
// userRoutes.route("/:id").delete((req, response) => {
//   let dbConnect = dbo.getDb();
//   let myquery = { _id: ObjectId( req.params.id )};
//   dbConnect.collection("users").deleteOne(myquery, function (err, obj) {
//     if (err) throw err;
//     console.log("User deleted");
//     response.status(obj);
//   });
// });

module.exports = userRoutes;
