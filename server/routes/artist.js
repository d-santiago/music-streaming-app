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

/**
  * GET /artist/listArtistRoutes
  * @summary Lists all /artist routes
  * @return {object} 200 - success response
  * @example response - 200 - success response example
  *   POST     /artist/createSong
  *   PUT      /artist/uploadSongURLs
  *   PUT      /artist/addSongtoArtistSongs
*/
artistRoutes.route('/user/listArtistRoutes').get(function(req, response) {
  const listRoutes = require('express-list-routes');
  response.json(listRoutes(artistRoutes));
});

/**
  * POST /artist/createSong
  * @summary Creates a new song
  * @bodyParam {string} songName
  * @bodyParam {boolean} isSignle
  * @bodyParam {string} genre
  * @bodyParam {string} recordLabel
  * @return {object} 200 - success response - application/json
  * @example response - 200 - success response example
  *  {
  *   "acknowledged": true,
  *   "insertedId": "618ad779c2c43d391bf73919"
  *  }
*/
artistRoutes.route('/artist/createSong').post(function(req, response) {
  const dbConnect = dbo.getDb();
  const object = {
    publisher_id: ObjectId(req.body.uid),
    isPublished: false,
    songURL: '',
    songName: req.body.songName,
    coverURL: '',
    isSignle: req.body.isSignle,
    album_id: '',
    genre: req.body.genre,
    releaseDate: '',
    recordLabel: req.body.recordLabel,
    streams: 0,
  };
  dbConnect.collection('songs').insertOne(object, function(err, result) {
    if (err) throw err;
    response.json(result);
  });
});

/**
  * PUT /artist/uploadSongAudio
  * @summary Uploads AWS URLs containing song's audio
  * @bodyParam {string} sid [(s)ong _id]
  * @bodyParam {string} songURL
  * @return {object} 200 - success response - application/json
  * @example response - 200 - success response example
  *  {
  *   "acknowledged": true,
  *   "insertedId": "618ad779c2c43d391bf73919"
  *  }
*/
artistRoutes.route('/artist/uploadSongAudio').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.sid)};
  const update = {
    $set: {
      songURL: req.body.songURL,
    },
  };
  dbConnect.collection('songs')
      .updateOne(query, update, function(err, result) {
        if (err) throw err;
        response.json(result);
      });
});

/**
  * PUT /artist/uploadSongCover
  * @summary Uploads AWS URLs containing song's cover
  * @bodyParam {string} sid [(s)ong _id]
  * @bodyParam {string} coverURL
  * @return {object} 200 - success response - application/json
  * @example response - 200 - success response example
  *  {
  *   "acknowledged": true,
  *   "insertedId": "618ad779c2c43d391bf73919"
  *  }
*/
artistRoutes.route('/artist/uploadSongCover').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.sid)};
  const update = {
    $set: {
      coverURL: req.body.coverURL,
    },
  };
  dbConnect.collection('songs')
      .updateOne(query, update, function(err, result) {
        if (err) throw err;
        response.json(result);
      });
});

/**
  * PUT /artist/editSongInfo
  * @summary Edits artist's unpublished song's information
  * @bodyParam {string} sid [(s)ong _id]
  * @bodyParam {string} songName
  * @bodyParam {boolean} isSignle
  * @bodyParam {string} genre
  * @bodyParam {string} recordLabel
  * @return {object} 200 - success response - application/json
  * @example response - 200 - success response example
  * {
  *   "acknowledged": true,
  *   "modifiedCount": 1,
  *   "upsertedId": null,
  *   "upsertedCount": 0,
  *   "matchedCount": 1
  * }
*/
artistRoutes.route('/artist/editSongInfo').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.sid), isPublished: false};
  const update = {
    $set: {
      songName: req.body.songName,
      isSignle: req.body.isSignle,
      genre: req.body.genre,
      recordLabel: req.body.recordLabel,
    },
  };
  dbConnect.collection('songs')
      .updateOne(query, update, function(err, result) {
        if (err) throw err;
        response.json(result);
      });
});

/**
  * DELETE /artist/deleteSingle
  * @summary Deletes artist's song if it is a single
  * @bodyParam {string} sid [(s)ong _id]
  * @return {object} 200 - success response - application/json
  * @example response - 200 - success response example
  * {
  *   "acknowledged": true,
  *   "deletedCount": 1
  * }
*/
artistRoutes.route('/artist/deleteSingle').delete((req, response) => {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId( req.body.sid ), isSignle: true};
  dbConnect.collection('songs').deleteOne(query, function(err, result) {
    if (err) throw err;
    response.json(result);
  });
});

/**
  * POST /artist/createAlbum
  * @summary Creates a new album
  * @bodyParam {string} albumName
  * @bodyParam {string} genre
  * @bodyParam {string} recordLabel
  * @return {object} 200 - success response - application/json
  * @example response - 200 - success response example
  *  {
  *   "acknowledged": true,
  *   "insertedId": "618ae2fe05315faa2ee23c85"
  *  }
*/
// This route allows an artist to upload an album's information
artistRoutes.route('/artist/createAlbum').post(function(req, response) {
  const dbConnect = dbo.getDb();
  const object = {
    publisher_id: ObjectId(req.body.uid),
    albumName: req.body.albumName,
    coverURL: '',
    genre: req.body.genre,
    recordLabel: req.body.recordLabel,
    songs: [],
  };
  dbConnect.collection('albums').insertOne(object, function(err, result) {
    if (err) throw err;
    response.json(result);
  });
});

/**
  * PUT /artist/uploadAlbumCover
  * @summary Uploads AWS URL containing album's cover
  * @bodyParam {string} aid [(a)lbum _id]
  * @bodyParam {string} coverURL
  * @return {object} 200 - success response - application/json
  * @example response - 200 - success response example
  * {
  *   "acknowledged": true,
  *   "modifiedCount": 1,
  *   "upsertedId": null,
  *   "upsertedCount": 0,
  *   "matchedCount": 1
  * }
*/
// This route inserts the AWS URL for an album's cover
artistRoutes.route('/artist/uploadAlbumCover').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.aid)};
  const update = {
    $set: {
      coverURL: req.body.coverURL,
    },
  };
  dbConnect.collection('albums')
      .updateOne(query, update, function(err, result) {
        if (err) throw err;
        response.json(result);
      });
});

/**
  * PUT /artist/editAlbumInfo
  * @summary Edits artist's unpublished album's information
  * @bodyParam {string} aid [(a)lbum _id]
  * @bodyParam {string} albumName
  * @bodyParam {string} genre
  * @bodyParam {string} recordLabel
  * @return {object} 200 - success response - application/json
  * @example response - 200 - success response example
  * {
  *   "acknowledged": true,
  *   "modifiedCount": 1,
  *   "upsertedId": null,
  *   "upsertedCount": 0,
  *   "matchedCount": 1
  * }
*/
// This route allows an artist to edit an album's information
artistRoutes.route('/artist/editAlbumInfo').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.aid)};
  const update = {
    $set: {
      albumName: req.body.albumName,
      genre: req.body.genre,
      recordLabel: req.body.recordLabel,
    },
  };
  dbConnect.collection('albums')
      .updateOne(query, update, function(err, result) {
        if (err) throw err;
        response.json(result);
      });
});

/**
  * PUT /artist/addSongtoAlbum
  * @summary Adds song to artist's album
  * @bodyParam {string} sid [(s)ong _id]
  * @bodyParam {string} aid [(a)lbum _id]
  * @return {object} 200 - success response - application/json
  * @example response - 200 - success response example
  * {
  *   "acknowledged": true,
  *   "modifiedCount": 1,
  *   "upsertedId": null,
  *   "upsertedCount": 0,
  *   "matchedCount": 1
  * }
*/
artistRoutes.route('/artist/addSongtoAlbum').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.aid)};
  const update = {
    $push: {
      songs: ObjectId(req.body.sid),
    },
  };
  dbConnect.collection('albums')
      .updateOne(query, update, function(err, result) {
        if (err) throw err;
        response.json(result);
      });
});

/**
  * PUT /artist/addAlbumIdtoSong
  * @summary Updates song's album_id. Should be called after /artist/addSongtoAlbum
  * @bodyParam {string} sid [(s)ong _id]
  * @bodyParam {string} aid [(a)lbum _id]
  * @return {object} 200 - success response - application/json
  * @example response - 200 - success response example
  * {
  *   "acknowledged": true,
  *   "modifiedCount": 1,
  *   "upsertedId": null,
  *   "upsertedCount": 0,
  *   "matchedCount": 1
  * }
*/
artistRoutes.route('/artist/addAlbumIdtoSong').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.sid)};
  const update = {
    $set: {
      album_id: ObjectId(req.body.aid),
    },
  };
  dbConnect.collection('songs')
      .findOneAndUpdate(query, update, function(err, result) {
        if (err) throw err;
        response.json(result);
      });
});

/**
  * PUT /artist/removeSongfromAlbum
  * @summary Removes song from artist's album
  * @bodyParam {string} sid [(s)ong _id]
  * @bodyParam {string} aid [(a)lbum _id]
  * @return {object} 200 - success response - application/json
  * @example response - 200 - success response example
  * {
  *   "acknowledged": true,
  *   "modifiedCount": 1,
  *   "upsertedId": null,
  *   "upsertedCount": 0,
  *   "matchedCount": 1
  * }
*/
artistRoutes.route('/artist/removeSongfromAlbum').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.aid)};
  const update = {
    $pull: {
      songs: ObjectId(req.body.sid),
    },
  };
  dbConnect.collection('albums')
      .updateOne(query, update, function(err, result) {
        if (err) throw err;
        response.json(result);
      });
});

/**
  * PUT /artist/removeAlbumIdfromSong
  * @summary Removes song's album_id. Should be called after /artist/removeSongfromAlbum
  * @bodyParam {string} sid [(s)ong _id]
  * @bodyParam {string} aid [(a)lbum _id]
  * @return {object} 200 - success response - application/json
  * @example response - 200 - success response example
  * {
  *   "acknowledged": true,
  *   "modifiedCount": 1,
  *   "upsertedId": null,
  *   "upsertedCount": 0,
  *   "matchedCount": 1
  * }
*/
artistRoutes.route('/artist/removeAlbumIdfromSong').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.sid)};
  const update = {
    $set: {
      album_id: '',
    },
  };
  dbConnect.collection('songs')
      .findOneAndUpdate(query, update, function(err, result) {
        if (err) throw err;
        response.json(result);
      });
});

/**
  * DELETE /artist/deleteAlbum
  * @summary Deletes artist's album if album is empty.
  * @bodyParam {string} aid [(a)lbum _id]
  * @return {object} 200 - success response - application/json
  * @example response - 200 - success response example
  * {
  *   "acknowledged": true,
  *   "modifiedCount": 1,
  *   "upsertedId": null,
  *   "upsertedCount": 0,
  *   "matchedCount": 1
  * }
*/
artistRoutes.route('/artist/deleteAlbum').delete((req, response) => {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId( req.body.aid )};
  dbConnect.collection('albums').deleteOne(query, function(err, result) {
    if (err) throw err;
    response.json(result);
  });
});

/**
  * GET /artist/getSongStreams
  * @summary Retrieves song's stream count
  * @bodyParam {string} sid [(s)ong _id]
  * @return {object} 200 - success response - application/json
  * @example response - 200 - success response example
  * {
  *   "_id": "618ae85ffe81ff536b7b3cfb",
  *   "streams": 23
  * }
*/
artistRoutes.route('/artist/getSongStreams').get(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.sid)};
  const projection = {projection: {'streams': 1}};
  dbConnect.collection('songs')
      .findOne(query, projection, function(err, result) {
        if (err) throw err;
        response.json(result);
      });
});

/**
  * GET /artist/viewAlbumStreams
  * @summary Adds all streams from artist's album's songs
  * @bodyParam {string} aid [(a)lbum _id]
  * @return {object} 200 - success response - application/json
  * @example response - 200 - success response example
  * {
  *   "_id": "618ae85ffe81ff536b7b3cfb",
  *   "streams": 23
  * }
*/
artistRoutes.route('/artist/viewAlbumStreams').get(function(req, response) {});

/**
  * GET /artist/viewAlbumStreams
  * @summary Adds all streams from artist's songs
  * @bodyParam {string} aid [(a)lbum _id]
  * @return {object} 200 - success response - application/json
  * @example response - 200 - success response example
  * {
  *   "_id": "618ae85ffe81ff536b7b3cfb",
  *   "streams": 23
  * }
*/
artistRoutes.route('/artist/viewAllStreams').get(function(req, response) {});

module.exports = artistRoutes;
