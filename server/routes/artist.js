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
// /artist/switchToUser/:id

// Incomplete Routes:
// /artist/uploadSong/:id
// /artist/uploadAlbum/:id
// /artist/editSong/:id
// /artist/editAlbum/:id
// /artist/deleteSong/:id
// /artist/deleteAlbum/:id
// /artist/viewSongStats/:id
// /artist/viewAlbumStats/:id
// /artist/viewAllStats/:id

// For Debugging:
// console.log('query: ', query);
// console.log('req.params: ', req.params);
// const query = {_id: ObjectId(req.params.id)};
// console.log('req.body: ', req.body);
// console.log('req.body._id: ', req.body._id);

// This route allows a user to change their status to 'Artist'
userRoutes.route('/artist/switchToUser/:id').put(function(req, response) {
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

// This route allows an artist to upload a song
userRoutes.route('/artist/uploadSong/:id').post(function(req, response) {});

// This route allows an artist to upload an album
userRoutes.route('/artist/uploadAlbum/:id').post(function(req, response) {});

// This route allows an artist to edit a song's information
userRoutes.route('/artist/editSong/:id').put(function(req, response) {});

// This route allows an artist to edit an album's information
userRoutes.route('/artist/editAlbum/:id').put(function(req, response) {});

// This route allows an artist to delete a song
userRoutes.route('/artist/deleteSong/:id').delete((req, response) => {});

// This route allows an artist to delete an album
userRoutes.route('/artist/deleteAlbum/:id').delete((req, response) => {});

// This route allows an artist view a song's streams and likes
userRoutes.route('/artist/viewSongStats/:id').get(function(req, response) {});

// This route allows an artist view an album's streams and likes
userRoutes.route('/artist/viewAlbumStats/:id').get(function(req, response) {});

// This route allows an artist view all of their streams and likes
userRoutes.route('/artist/viewAllStats/:id').get(function(req, response) {});

module.exports = userRoutes;
