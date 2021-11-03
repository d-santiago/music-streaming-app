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

// This route allows an artist to upload a song
userRoutes.route('/artist/createSong').post(function(req, response) {
  const dbConnect = dbo.getDb();
  const song = {
    publisher_id: ObjectId(req.body.uid),
    songURL: '',
    songName: req.body.songName,
    coverURL: '',
    isSignle: req.body.isSignle,
    album_id: '',
    genre: req.body.genre,
    releaseDate: req.body.releaseDate,
    recordLabel: req.body.recordLabel,
    streams: 0
  };
  dbConnect.collection('songs').insertOne(song, function(err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This route inserts the AWS URL for an songs' audio and cover
userRoutes.route('/artist/uploadSongURLs').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.sid)};
  const updatedSong = {
    $set: {
      songURL: req.body.songURL,
      coverURL: req.body.coverURL,
    },
  };
  const options = {returnDocument: 'after'}
  dbConnect.collection('songs')
      .findOneAndUpdate(query, updatedSong, options, function(err, res) {
        if (err) throw err;
        response.json(res);
      });
});

// This route adds a song an artist's 'songs' array
// Should be called directly after /artist/createSong
userRoutes.route('/artist/addSongtoArtistSongs').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.uid)};
  const updatedSongs = {
    $push: {
      songs: ObjectId(req.body.sid),
    },
  };
  dbConnect.collection('users').findOneAndUpdate(query, updatedSongs, function(err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This route removes a song from an artist's 'songs' array
// Should be called directly before /artist/deleteSingle
userRoutes.route('/artist/removeSongfromArtistSongs').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.uid)};
  const updatedSongs = {
    $pull: {
      songs: ObjectId(req.body.sid),
    },
  };
  dbConnect.collection('users').findOneAndUpdate(query, updatedSongs, function(err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This route allows an artist to delete a song that is a single
// Should be called directly before /artist/removeSongfromArtistSongs
userRoutes.route('/artist/deleteSingle').delete((req, response) => {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId( req.body.sid ), isSignle: true};
  dbConnect.collection('songs').deleteOne(query, function(err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This route allows an artist to upload an album's information
userRoutes.route('/artist/createAlbum').post(function(req, response) {
  const dbConnect = dbo.getDb();
  const album = {
    publisher_id: ObjectId(req.body.uid),
    albumName: req.body.albumName,
    coverURL: '',
    genre: req.body.genre,
    releaseDate: req.body.releaseDate,
    recordLabel: req.body.recordLabel,
    songs: []
  };
  dbConnect.collection('albums').insertOne(album, function(err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This route inserts the AWS URL for an album's cover
userRoutes.route('/artist/uploadAlbumURLs').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.aid)};
  const updatedAlbum = {
    $set: {
      coverURL: req.body.coverURL,
    },
  };
  const options = {returnDocument: 'after'}
  dbConnect.collection('albums')
      .findOneAndUpdate(query, updatedAlbum, options, function(err, res) {
        if (err) throw err;
        response.json(res);
      });
});

// This route adds an album an artist's 'albums' array
// Should be called directly after /artist/createAlbum
userRoutes.route('/artist/addAlbumtoArtistAlbums').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.uid)};
  const updatedAlbums = {
    $push: {
      albums: ObjectId(req.body.aid),
    },
  };
  dbConnect.collection('users').findOneAndUpdate(query, updatedAlbums, function(err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This route allows an artist to delete an album
// Need to delete each song within album
userRoutes.route('/artist/deleteAlbum').delete((req, response) => {
  // const dbConnect = dbo.getDb();
  // const query = {_id: ObjectId( req.body.aid )};
  // dbConnect.collection('albums').deleteOne(query, function(err, res) {
  //   if (err) throw err;
  //   response.json(res);
  // });
});

// This route removes an album an artist's 'albums' array
// Should be called directly after /artist/deleteAlbum
userRoutes.route('/artist/removeAlbumfromArtistAlbums').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.uid)};
  const updatedAlbums = {
    $pull: {
      albums: ObjectId(req.body.aid),
    },
  };
  dbConnect.collection('users').findOneAndUpdate(query, updatedAlbums, function(err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This route allows an artist to add a song to their album
userRoutes.route('/artist/addSongtoAlbum').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.aid)};
  const updatedAlbum = {
    $push: {
      songs: ObjectId(req.body.sid)
    },
  };
  const options = {returnDocument: 'after'}
  dbConnect.collection('albums')
      .findOneAndUpdate(query, updatedAlbum, options, function(err, res) {
        if (err) throw err;
        response.json(res);
      });
});

// Sets song's album_id to album it was added to
// Should be called directly after /artist/addSongtoAlbum
userRoutes.route('/artist/addAlbumIdtoSong').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.sid)};
  const updatedSong = {
    $set: {
      album_id: ObjectId(req.body.aid)
    }
  };
  const options = {returnDocument: 'after'}
  dbConnect.collection('songs')
      .findOneAndUpdate(query, updatedSong, options, function(err, res) {
        if (err) throw err;
        response.json(res);
      });
});


// This route allows an artist to edit a song's information
userRoutes.route('/artist/editSongInfo').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.sid)};
  const updatedSong = {
    $set: {
      songName: req.body.songName,
      isSignle: req.body.isSignle,
      genre: req.body.genre,
      releaseDate: req.body.releaseDate,
      recordLabel: req.body.recordLabel,
    },
  };
  const options = {returnDocument: 'after'}
  dbConnect.collection('songs')
      .findOneAndUpdate(query, updatedSong, options, function(err, res) {
        if (err) throw err;
        response.json(res);
      });
});

// This route allows an artist to edit an album's information
userRoutes.route('/artist/editAlbumInfo').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.aid)};
  const updatedAlbum = {
    $set: {
      albumName: req.body.albumName,
      genre: req.body.genre,
      releaseDate: req.body.releaseDate,
      recordLabel: req.body.recordLabel,
    },
  };
  const options = {returnDocument: 'after'}
  dbConnect.collection('albums')
      .findOneAndUpdate(query, updatedAlbum, options, function(err, res) {
        if (err) throw err;
        response.json(res);
      });
});

// This route allows an artist view a song's streams
userRoutes.route('/artist/viewSongStreams').get(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.sid)};
  const projection = {projection: {"streams" : 1}};
  dbConnect.collection('songs').findOne(query, projection, function(err, result) {
    if (err) throw err;
    response.json(result);
  });
});

// This route allows an artist view an album's streams
// Need to find each album song's streams and add them all together
userRoutes.route('/artist/viewAlbumStreams').get(function(req, response) {});

// This route allows an artist view all of their streams
// Find all of a user's published songs' streams and add them all together
userRoutes.route('/artist/viewAllStreams').get(function(req, response) {});

module.exports = userRoutes;
