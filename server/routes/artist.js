/** Express router providing artist related routes
 * @module routers/artist
 * @requires express
 */
const express = require('express');

// artistRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will
// take control of requests starting with path /user.

/**
 * Express router to mount artist related functions on.
 * @namespace artistRoutes
 */
const artistRoutes = express.Router();

// This will help us connect to the database
const dbo = require('../db/conn');

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require('mongodb').ObjectId;

artistRoutes.route('/user/listArtistRoutes').get(function(req, response) {
  const listRoutes = require('express-list-routes');
  response.json(listRoutes(artistRoutes));
});

/**
  * @name POST user/createSong
  * @memberof module:routers/artist~artistRoutes
  * @inner
  * @function
  * @summary Creates a new song
  * @param {string} songName
  * @param {boolean} isSignle
  * @param {string} genre
  * @param {string} recordLabel
  * @return {object}
  * @example
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
    metaData: '',
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
  * @name PUT user/uploadSongData
  * @memberof module:routers/artist~artistRoutes
  * @inner
  * @function
  * @summary Uploads AWS URLs containing song's audio
  * @param {string} sid song _id
  * @param {string} songURL
  * @return {object}
  * @example
  *  {
  *   "acknowledged": true,
  *   "insertedId": "618ad779c2c43d391bf73919"
  *  }
*/
artistRoutes.route('/artist/uploadSongData').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.sid), isPublished: false};
  const update = {
    $set: {
      songURL: req.body.songURL,
      metaData: req.body.metaData,
    },
  };
  dbConnect.collection('songs')
      .updateOne(query, update, function(err, result) {
        if (err) throw err;
        response.json(result);
      });
});

/**
  * @name PUT user/uploadSongCover
  * @memberof module:routers/artist~artistRoutes
  * @inner
  * @function
  * @summary Uploads AWS URLs containing song's cover
  * @param {string} sid song _id
  * @param {string} coverURL
  * @return {object}
  * @example
  *  {
  *   "acknowledged": true,
  *   "insertedId": "618ad779c2c43d391bf73919"
  *  }
*/
artistRoutes.route('/artist/uploadSongCover').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.sid), isPublished: false};
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
  * @name PUT user/editSongInfo
  * @memberof module:routers/artist~artistRoutes
  * @inner
  * @function
  * @summary Edits artist's unpublished song's information
  * @param {string} sid song _id
  * @param {string} songName
  * @param {boolean} isSignle
  * @param {string} genre
  * @param {string} recordLabel
  * @return {object}
  * @example
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
  * @name DELETE user/deleteSingle
  * @memberof module:routers/artist~artistRoutes
  * @inner
  * @function
  * @summary Deletes artist's song if it is a single
  * @param {string} sid song _id
  * @return {object}
  * @example
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
  * @name POST user/createAlbum
  * @memberof module:routers/artist~artistRoutes
  * @inner
  * @function
  * @summary Creates a new album
  * @param {string} albumName
  * @param {string} genre
  * @param {string} recordLabel
  * @return {object}
  * @example
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
    isPublished: false,
    albumName: req.body.albumName,
    coverURL: '',
    songs: [],
    genre: req.body.genre,
    recordLabel: req.body.recordLabel,
    releaseDate: '',
  };
  dbConnect.collection('albums').insertOne(object, function(err, result) {
    if (err) throw err;
    response.json(result);
  });
});

/**
  * @name PUT user/uploadAlbumCover
  * @memberof module:routers/artist~artistRoutes
  * @inner
  * @function
  * @summary Uploads AWS URL containing album's cover
  * @param {string} aid album _id
  * @param {string} coverURL
  * @return {object}
  * @example
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
  const query = {_id: ObjectId(req.body.aid), isPublished: false};
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
  * @name PUT user/editAlbumInfo
  * @memberof module:routers/artist~artistRoutes
  * @inner
  * @function
  * @summary Edits artist's unpublished album's information
  * @param {string} aid album _id
  * @param {string} albumName
  * @param {string} genre
  * @param {string} recordLabel
  * @return {object}
  * @example
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
  const query = {_id: ObjectId(req.body.aid), isPublished: false};
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
  * @name PUT user/addSongtoAlbum
  * @memberof module:routers/artist~artistRoutes
  * @inner
  * @function
  * @summary Adds song to artist's album
  * @param {string} sid song _id
  * @param {string} aid album _id
  * @return {object}
  * @example
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
  const query = {_id: ObjectId(req.body.aid), isPublished: false};
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
  * @name PUT user/addAlbumIdtoSong
  * @memberof module:routers/artist~artistRoutes
  * @inner
  * @function
  * @summary Updates song's album_id. Called after /artist/addSongtoAlbum
  * @param {string} sid song _id
  * @param {string} aid album _id
  * @return {object}
  * @example
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
  const query = {_id: ObjectId(req.body.sid), isPublished: false};
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
  * @name PUT user/removeSongfromAlbum
  * @memberof module:routers/artist~artistRoutes
  * @inner
  * @function
  * @summary Removes song from artist's album
  * @param {string} sid song _id
  * @param {string} aid album _id
  * @return {object}
  * @example
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
  const query = {_id: ObjectId(req.body.aid), isPublished: false};
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
  * @name PUT user/removeAlbumIdfromSong
  * @memberof module:routers/artist~artistRoutes
  * @inner
  * @function
  * @summary Removes song's album_id. Called after /artist/removeSongfromAlbum
  * @param {string} sid song _id
  * @param {string} aid album _id
  * @return {object}
  * @example
  * {
  *   "acknowledged": true,
  *   "modifiedCount": 1,
  *   "upsertedId": null,
  *   "upsertedCount": 0,
  *   "matchedCount": 1
  * }
*/
artistRoutes.route('/artist/removeAlbumIdfromSong')
    .put(function(req, response) {
      const dbConnect = dbo.getDb();
      const query = {_id: ObjectId(req.body.sid), isPublished: false};
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
  * @name PUT user/publishSingle
  * @memberof module:routers/artist~artistRoutes
  * @inner
  * @function
  * @summary Publishes artist's single
  * @param {string} sid song _id
  * @return {object}
  * @example
  * {
  *   "acknowledged": true,
  *   "modifiedCount": 1,
  *   "upsertedId": null,
  *   "upsertedCount": 0,
  *   "matchedCount": 1
  * }
*/
artistRoutes.route('/artist/publishSingle').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {
    _id: ObjectId(req.body.sid),
    isSingle: true, isPublished: false,
  };
  const update = {
    $set: {
      isPublished: true,
    },
  };
  dbConnect.collection('songs')
      .updateOne(query, update, function(err, result) {
        if (err) throw err;
        response.json(result);
      });
});

/**
  * @name PUT user/publishAlbum
  * @memberof module:routers/artist~artistRoutes
  * @inner
  * @function
  * @summary Publishes artist's album
  * @param {string} aid album _id
  * @return {object}
  * @example
  * {
  *   "acknowledged": true,
  *   "modifiedCount": 1,
  *   "upsertedId": null,
  *   "upsertedCount": 0,
  *   "matchedCount": 1
  * }
*/
artistRoutes.route('/artist/publishAlbum').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.aid), isPublished: false};
  const update = {
    $set: {
      isPublished: true,
    },
  };
  dbConnect.collection('albums')
      .updateOne(query, update, function(err, result) {
        if (err) throw err;
        response.json(result);
      });
});

/**
  * @name DELETE user/deleteAlbumSongs
  * @memberof module:routers/artist~artistRoutes
  * @inner
  * @function
  * @summary Deletes all songs in artist's album
  * @param {string} aid album _id
  * @return {object}
  * @example
  * {
  *   "acknowledged": true,
  *   "deletedCount": 14
  * }
*/
artistRoutes.route('/artist/deleteAlbumSongs').delete((req, response) => {
  const dbConnect = dbo.getDb();
  const query = {album_id: ObjectId(req.body.aid)};
  dbConnect.collection('songs').deleteMany(query, function(err, result) {
    if (err) throw err;
    response.json(result);
  });
});

/**
  * @name DELETE user/deleteAlbum
  * @memberof module:routers/artist~artistRoutes
  * @inner
  * @function
  * @summary Deletes artist's album
  * @param {string} aid album _id
  * @return {object}
  * @example
  * {
  *   "acknowledged": true,
  *   "deletedCount": 1
  * }
*/
artistRoutes.route('/artist/deleteAlbum').delete((req, response) => {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.aid)};
  dbConnect.collection('albums').deleteOne(query, function(err, result) {
    if (err) throw err;
    response.json(result);
  });
});

/**
  * @name POST user/getSongs
  * @memberof module:routers/artist~artistRoutes
  * @inner
  * @function
  * @summary Retrieves all songs from an artist
  * @param {string} uid user _id
  * @return {array}
  * @example
  * {
  *   "_id": "618ae85ffe81ff536b7b3cfb",
  *   "streams": 23
  * }
*/
artistRoutes.route('/artist/getSongs').post(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {publisher_id: ObjectId(req.body.uid)};
  dbConnect.collection('songs').find(query).toArray(function(err, result) {
    if (err) throw err;
    response.json(result);
  });
});

/**
  * @name POST user/getAlbums
  * @memberof module:routers/artist~artistRoutes
  * @inner
  * @function
  * @summary Retrieves all albums from an artist
  * @param {string} uid user _id
  * @return {array}
  * @example
  * {
  *   "_id": "618ae85ffe81ff536b7b3cfb",
  *   "streams": 23
  * }
*/
artistRoutes.route('/artist/getAlbums').post(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {publisher_id: ObjectId(req.body.uid)};
  dbConnect.collection('albums').find(query).toArray(function(err, result) {
    if (err) throw err;
    response.json(result);
  });
});

/**
  * @name POST user/getAlbumSongs
  * @memberof module:routers/artist~artistRoutes
  * @inner
  * @function
  * @summary Retrieves all songs from an album
  * @param {string} uid user _id
  * @param {string} aid album _id
  * @return {array}
  * @example
  * {
  *   "_id": "618ae85ffe81ff536b7b3cfb",
  *   "streams": 23
  * }
*/
artistRoutes.route('/artist/getAlbumSongs').post(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {
    publisher_id: ObjectId(req.body.uid),
    album_id: ObjectId(req.body.aid),
  };
  dbConnect.collection('songs').find(query).toArray(function(err, result) {
    if (err) throw err;
    response.json(result);
  });
});

/**
  * @name POST user/getSongStreams
  * @memberof module:routers/artist~artistRoutes
  * @inner
  * @function
  * @summary Retrieves song's stream count
  * @param {string} sid song _id
  * @return {object}
  * @example
  * {
  *   "_id": "618ae85ffe81ff536b7b3cfb",
  *   "streams": 23
  * }
*/
artistRoutes.route('/artist/getSongStreams').post(function(req, response) {
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
  * @name POST user/getAlbumStreams
  * @memberof module:routers/artist~artistRoutes
  * @inner
  * @function
  * @summary Adds all streams from artist's album's songs
  * @param {string} aid album _id
  * @return {array}
  * @example
  * [
  *   {
  *     "streams": 1218
  *   }
  * ]
*/
artistRoutes.route('/artist/getAlbumStreams').post(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = [
    {
      $match: {
        album_id: ObjectId(req.body.aid),
      },
    },
    {
      $group: {
        _id: '',
        streams: {$sum: '$streams'},
      },
    },
    {
      $project: {
        _id: 0,
        streams: '$streams',
      },
    },
  ];
  dbConnect.collection('songs').aggregate(query).toArray(function(err, result) {
    if (err) throw err;
    response.json(result);
  });
});

/**
  * @name POST user/getAllStreams
  * @memberof module:routers/artist~artistRoutes
  * @inner
  * @function
  * @summary Adds all streams from artist's songs
  * @param {string} uid user _id
  * @return {object}
  * @example
  * {
  *   "_id": "618ae85ffe81ff536b7b3cfb",
  *   "streams": 23
  * }
*/
artistRoutes.route('/artist/getAllStreams').post(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = [
    {
      $match: {
        publisher_id: ObjectId(req.body.uid),
      },
    },
    {
      $group: {
        _id: '',
        streams: {$sum: '$streams'},
      },
    },
    {
      $project: {
        _id: 0,
        streams: '$streams',
      },
    },
  ];
  dbConnect.collection('songs').aggregate(query).toArray(function(err, result) {
    if (err) throw err;
    response.json(result);
  });
});

module.exports = artistRoutes;
