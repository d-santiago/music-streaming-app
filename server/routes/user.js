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

// Complete Routes:
// /user/register
// /user/login
// /user/info/:id
// /user/editProfile/:id
// /user/switchToArtist/:id
// /:id (delete)

// Incomplete Routes:
// /user/viewSong/:id
// /user/viewAlbum/:id
// /user/playSong/:id
// /user/likeSong/:id
// /user/unlikeSong/:id
// /user/addLibrarySong/:id
// /user/removeLibrarySong/:id
// /createPlaylist/:id
// /user/deltePlaylist/:id
// /user/addPlaylistSong/:id
// /user/removePlaylistSong/:id

// For Debugging:
// console.log('query: ', query);
// console.log('req.params: ', req.params);
// const query = {_id: ObjectId(req.params.id)};
// console.log('req.body: ', req.body);
// console.log('req.body._id: ', req.body._id);

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

// This route allows a user to delete their account
userRoutes.route('/:id').delete((req, response) => {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId( req.body._id )};
  dbConnect.collection('users').deleteOne(query, function(err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This route allows a user to view a song's information
userRoutes.route('/user/viewSong/:id').get(function(req, res) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body._id)};
  dbConnect.collection('songs').findOne(query, function(err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// This route allows a user to view an album's information
userRoutes.route('/user/viewAlbum/:id').get(function(req, res) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body._id)};
  dbConnect.collection('albums').findOne(query, function(err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// This route allows a user to retrieve a song
userRoutes.route('/user/playSong/:id').get(function(req, res) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body._id)};
  dbConnect.collection('songs').findOne(query, function(err, result) {
    if (err) throw err;
    res.json(result.songURL);
  });
});

// This route allows a user to like a song
userRoutes.route('/user/likeSong/:id').put(function(req, response) {});

// This route allows a user to unlike a song
userRoutes.route('/user/unlikeSong/:id').put(function(req, response) {});

// This route allows a user add a song to their library
userRoutes.route('/user/addLibrarySong/:id').get(function(req, response) {});

// This route allows a user remove a song from their library
userRoutes.route('/user/removeLibrarySong/:id').get(function(req, response) {});

// This route allows a user create a playlist
userRoutes.route('/createPlaylist/:id').put(function(req, response) {});

// This route allows a user delete a playlist
userRoutes.route('/user/deltePlaylist/:id').delete((req, response) => {});

// This route allows a user add a song to their playlist
userRoutes.route('/user/addPlaylistSong/:id').post(function(req, response) {});

// This route allows a user remove a song from their playlist
userRoutes.route('/user/removePlaylistSong/:id').post(function(req, response) {});

module.exports = userRoutes;
