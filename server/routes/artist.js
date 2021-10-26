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

// Incomplete Routes:
// /artist/uploadSong
// /artist/uploadAlbum
// /artist/editSong
// /artist/editAlbum
// /artist/deleteSong
// /artist/deleteAlbum
// /artist/viewSongStreams
// /artist/viewAlbumStreams
// /artist/viewAllStreams

// This route allows an artist to upload a song
userRoutes.route('/artist/uploadSong').post(function(req, response) {});

// This route allows an artist to upload an album
userRoutes.route('/artist/uploadAlbum').post(function(req, response) {});

// This route allows an artist to edit a song's information
userRoutes.route('/artist/editSong').put(function(req, response) {});

// This route allows an artist to edit an album's information
userRoutes.route('/artist/editAlbum').put(function(req, response) {});

// This route allows an artist to delete a song
userRoutes.route('/artist/deleteSong').delete((req, response) => {});

// This route allows an artist to delete an album
userRoutes.route('/artist/deleteAlbum').delete((req, response) => {});

// This route allows an artist view a song's streams
userRoutes.route('/artist/viewSongStreams').get(function(req, response) {});

// This route allows an artist view an album's streams
userRoutes.route('/artist/viewAlbumStreams').get(function(req, response) {});

// This route allows an artist view all of their streams
userRoutes.route('/artist/viewAllStreams').get(function(req, response) {});

module.exports = userRoutes;
