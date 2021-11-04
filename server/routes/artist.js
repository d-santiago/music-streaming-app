const express = require('express');

// artistRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will
// take control of requests starting with path /user.
const artistRoutes = express.Router();

// This will help us connect to the database
const dbo = require('../db/conn');

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require('mongodb').ObjectId;

// This route lists all artist routes
artistRoutes.route('/user/listArtistRoutes').get(function(req, response) {
  const listRoutes = require('express-list-routes');
  console.log('\n ---------------- ARTIST ROUTES ---------------- \n');
  response.json(listRoutes(artistRoutes));
  console.log('\n ---------------- ARTIST ROUTES ---------------- \n');
});

// This route allows an artist to upload a song
artistRoutes.route('/artist/createSong').post(function(req, response) {
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
    streams: 0,
  };
  dbConnect.collection('songs').insertOne(song, function(err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This route inserts the AWS URL for an songs' audio and cover
artistRoutes.route('/artist/uploadSongURLs').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.sid)};
  const updatedSong = {
    $set: {
      songURL: req.body.songURL,
      coverURL: req.body.coverURL,
    },
  };
  const options = {returnDocument: 'after'};
  dbConnect.collection('songs')
      .findOneAndUpdate(query, updatedSong, options, function(err, res) {
        if (err) throw err;
        response.json(res);
      });
});

// This route adds a song an artist's 'songs' array
// Should be called directly after /artist/createSong
artistRoutes.route('/artist/addSongtoArtistSongs').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.uid)};
  const updatedSongs = {
    $push: {
      songs: ObjectId(req.body.sid),
    },
  };
  dbConnect.collection('users')
      .findOneAndUpdate(query, updatedSongs, function(err, res) {
        if (err) throw err;
        response.json(res);
      });
});

// This route removes a song from an artist's 'songs' array
// Should be called directly before /artist/deleteSingle
artistRoutes.route('/artist/removeSongfromArtistSongs')
    .put(function(req, response) {
      const dbConnect = dbo.getDb();
      const query = {_id: ObjectId(req.body.uid)};
      const updatedSongs = {
        $pull: {
          songs: ObjectId(req.body.sid),
        },
      };
      dbConnect.collection('users')
          .findOneAndUpdate(query, updatedSongs, function(err, res) {
            if (err) throw err;
            response.json(res);
          });
    });

// This route allows an artist to delete a song that is a single
// Should be called directly before /artist/removeSongfromArtistSongs
artistRoutes.route('/artist/deleteSingle').delete((req, response) => {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId( req.body.sid ), isSignle: true};
  dbConnect.collection('songs').deleteOne(query, function(err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This route allows an artist to upload an album's information
artistRoutes.route('/artist/createAlbum').post(function(req, response) {
  const dbConnect = dbo.getDb();
  const album = {
    publisher_id: ObjectId(req.body.uid),
    albumName: req.body.albumName,
    coverURL: '',
    genre: req.body.genre,
    releaseDate: req.body.releaseDate,
    recordLabel: req.body.recordLabel,
    songs: [],
  };
  dbConnect.collection('albums').insertOne(album, function(err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This route inserts the AWS URL for an album's cover
artistRoutes.route('/artist/uploadAlbumURLs').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.aid)};
  const updatedAlbum = {
    $set: {
      coverURL: req.body.coverURL,
    },
  };
  const options = {returnDocument: 'after'};
  dbConnect.collection('albums')
      .findOneAndUpdate(query, updatedAlbum, options, function(err, res) {
        if (err) throw err;
        response.json(res);
      });
});

// This route adds an album an artist's 'albums' array
// Should be called directly after /artist/createAlbum
artistRoutes.route('/artist/addAlbumtoArtistAlbums').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.uid)};
  const updatedAlbums = {
    $push: {
      albums: ObjectId(req.body.aid),
    },
  };
  dbConnect.collection('users')
      .findOneAndUpdate(query, updatedAlbums, function(err, res) {
        if (err) throw err;
        response.json(res);
      });
});


// This route deletes each song within album
// Should be called directly before /deleteAlbum
artistRoutes.route('/artist/deleteAlbumSongs').delete((req, response) => {
  // const dbConnect = dbo.getDb();
  // const query = {_id: ObjectId( req.body.aid )};
  // dbConnect.collection('albums').deleteOne(query, function(err, res) {
  //   if (err) throw err;
  //   response.json(res);
  // });
});

// This route allows an artist to delete an album
// Should be called directly before /deleteAlbumSongs
artistRoutes.route('/artist/deleteAlbum').delete((req, response) => {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId( req.body.aid )};
  dbConnect.collection('albums').deleteOne(query, function(err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This route removes an album an artist's 'albums' array
// Should be called directly after /artist/deleteAlbum
artistRoutes.route('/artist/removeAlbumfromArtistAlbums')
    .put(function(req, response) {
      const dbConnect = dbo.getDb();
      const query = {_id: ObjectId(req.body.uid)};
      const updatedAlbums = {
        $pull: {
          albums: ObjectId(req.body.aid),
        },
      };
      dbConnect.collection('users')
          .findOneAndUpdate(query, updatedAlbums, function(err, res) {
            if (err) throw err;
            response.json(res);
          });
    });

// This route allows an artist to add a song to their album
artistRoutes.route('/artist/addSongtoAlbum').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.aid)};
  const updatedAlbum = {
    $push: {
      songs: ObjectId(req.body.sid),
    },
  };
  const options = {returnDocument: 'after'};
  dbConnect.collection('albums')
      .findOneAndUpdate(query, updatedAlbum, options, function(err, res) {
        if (err) throw err;
        response.json(res);
      });
});

// Sets song's album_id to album it was added to
// Should be called directly after /artist/addSongtoAlbum
artistRoutes.route('/artist/addAlbumIdtoSong').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.sid)};
  const updatedSong = {
    $set: {
      album_id: ObjectId(req.body.aid),
    },
  };
  const options = {returnDocument: 'after'};
  dbConnect.collection('songs')
      .findOneAndUpdate(query, updatedSong, options, function(err, res) {
        if (err) throw err;
        response.json(res);
      });
});

// This route allows an artist to edit a song's information
artistRoutes.route('/artist/editSongInfo').put(function(req, response) {
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
  const options = {returnDocument: 'after'};
  dbConnect.collection('songs')
      .findOneAndUpdate(query, updatedSong, options, function(err, res) {
        if (err) throw err;
        response.json(res);
      });
});

// This route allows an artist to edit an album's information
artistRoutes.route('/artist/editAlbumInfo').put(function(req, response) {
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
  const options = {returnDocument: 'after'};
  dbConnect.collection('albums')
      .findOneAndUpdate(query, updatedAlbum, options, function(err, res) {
        if (err) throw err;
        response.json(res);
      });
});

// This route allows an artist view a song's streams
artistRoutes.route('/artist/viewSongStreams').get(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.sid)};
  const projection = {projection: {'streams': 1}};
  dbConnect.collection('songs')
      .findOne(query, projection, function(err, result) {
        if (err) throw err;
        response.json(result);
      });
});

// This route allows an artist view an album's streams
// Need to find each album song's streams and add them all together
artistRoutes.route('/artist/viewAlbumStreams').get(function(req, response) {});

// This route allows an artist view all of their streams
// Find all of a user's published songs' streams and add them all together
artistRoutes.route('/artist/viewAllStreams').get(function(req, response) {});

module.exports = artistRoutes;
