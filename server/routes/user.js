const express = require('express');

// userRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will
// take control of requests starting with path /user.
const userRoutes = express.Router();

// This will help us connect to the database
const dbo = require('../db/conn');

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require('mongodb').ObjectId;

// This route registers a new user
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
    recordLabel: '',
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

// This route verifies a user's login
userRoutes.route('/user/login').get(function(req, res) {
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

// This route retrieves a user's information
userRoutes.route('/user/info/:id').get(function(req, res) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body._id)};
  dbConnect.collection('users').findOne(query, function(err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// This route retrieves a list of a user's followers
userRoutes.route('/user/followers/:id').get(function(req, res) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body._id)};
  dbConnect.collection('users').findOne(query, function(err, result) {
    if (err) throw err;
    res.json(result.followers);
  });
});

// This route retrieves a list of people a user is following
userRoutes.route('/user/following/:id').get(function(req, res) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body._id)};
  dbConnect.collection('users').findOne(query, function(err, result) {
    if (err) throw err;
    res.json(result.following);
  });
});

// This route allows a user to edit their profile
userRoutes.route('/user/editProfile/:id').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body._id)};
  const updatedFields = {
    $set: {
      username: req.body.username,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      dob: req.body.dob,
      genres: req.body.genres,
    },
  };
  dbConnect.collection('users')
      .updateOne(query, updatedFields, function(err, res) {
        if (err) throw err;
        response.json(res);
      });
});

// This route allows a user to change their status to 'Artist'
userRoutes.route('/user/switchToArtist/:id').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body._id)};
  const updatedFields = {
    $set: {
      isArtist: true,
      artistName: req.body.artistName,
      recordLabel: req.body.recordLabel,
    },
  };
  dbConnect.collection('users')
      .updateOne(query, updatedFields, function(err, res) {
        if (err) throw err;
        response.json(res);
      });
});

// This route allows a user to change their status to 'Artist'
userRoutes.route('/user/switchToUser/:id').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body._id)};
  const updatedFields = {
    $set: {
      isArtist: false,
      artistName: '',
      recordLabel: '',
    },
  };
  dbConnect.collection('users')
      .updateOne(query, updatedFields, function(err, res) {
        if (err) throw err;
        response.json(res);
      });
});

// This section will help you delete a user
userRoutes.route('/:id').delete((req, response) => {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId( req.body._id )};
  dbConnect.collection('users').deleteOne(query, function(err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// For Debugging
// console.log('query: ', query);
// console.log('req.params: ', req.params);
// const query = {_id: ObjectId(req.params.id)};
// console.log('req.body: ', req.body);
// console.log('req.body._id: ', req.body._id);

// // This section will help you get a list of all the users.
// userRoutes.route('/user').get(function (req, res) {
//   let dbConnect = dbo.getDb();
//   dbConnect
//     .collection('users')
//     .find({})
//     .toArray(function (err, result) {
//       if (err) throw err;
//       res.json(result);
//     });
// });

module.exports = userRoutes;
