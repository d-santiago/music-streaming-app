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

/**
  * GET /user/listUserRoutes
  * @summary Lists all /user routes
  * @return {object} 200 - success response
  * @example response - 200 - success response example
  *   GET      /user/listUserRoutes
  *   POST     /user/register
  *   GET      /user/login
*/
userRoutes.route('/user/listUserRoutes').get(function(req, response) {
  const listRoutes = require('express-list-routes');
  response.json(listRoutes(userRoutes));
});

/**
  * POST /user/register
  * @summary Registers a new user
  * @bodyParam {string} username
  * @bodyParam {string} password
  * @bodyParam {string} name
  * @bodyParam {string} email
  * @bodyParam {string} dob
  * @return {object} 200 - success response - application/json
  * @example response - 200 - success response example
  *  {
  *   "acknowledged": true,
  *   "insertedId": "618aed07fe81ff536b7b3cfc"
  *  }
*/
userRoutes.route('/user/register').post(function(req, response) {
  const dbConnect = dbo.getDb();
  const object = {
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    email: req.body.email,
    dob: req.body.dob,
    followers: [],
    following: [],
    bio: '',
    library: [],
    genres: [],
    isArtist: false,
    artistName: '',
    recordLabel: '',
    playlist: [],
  };
  dbConnect.collection('users').insertOne(object, function(err, result) {
    if (err) throw err;
    response.json(result);
  });
});

/**
  * GET /user/login
  * @summary Verifies a user's login
  * @bodyParam {string} username
  * @bodyParam {string} password
  * @return {object} 200 - success response - application/json
  * @example response - 200 - success response example
  * {
  *   "_id": "618aed07fe81ff536b7b3cfc",
  *   "username": "abedislam",
  *   "password": "password",
  *   "name": "Abed Islam",
  *   "email": "abedislam@music.com",
  *   "dob": "",
  *   "followers": [],
  *   "following": [],
  *   "bio": "",
  *   "library": [],
  *   "genres": [],
  *   "isArtist": true,
  *   "artistName": "Abed Islam",
  *   "recordLabel": "Really Far Media",
  *   "playlists": []
  * }
*/
userRoutes.route('/user/login').get(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {
    username: req.body.username,
    password: req.body.password,
  };
  dbConnect.collection('users').findOne(query, function(err, result) {
    if (err) throw err;
    response.json(result);
  });
});

/**
  * GET /user/followerCount
  * @summary Retrieves the number of accounts following a user
  * @bodyParam {string} uid [(u)ser _id]
  * @return {object} 200 - success response - application/json
  * @example response - 200 - success response example
  *  {
  *   "_id": "618aed07fe81ff536b7b3cfc",
  *   "count": 0
  *  }
*/
userRoutes.route('/user/followerCount').get(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.uid)};
  const projection = {projection: {count: {$size: '$followers'}}};
  dbConnect.collection('users')
      .findOne(query, projection, function(err, result) {
        if (err) throw err;
        response.json(result);
      });
});

/**
  * GET /user/followingCount
  * @summary Retrieves the number of accounts a user is following
  * @bodyParam {string} uid [(u)ser _id]
  * @return {object} 200 - success response - application/json
  * @example response - 200 - success response example
  *  {
  *   "_id": "618aed07fe81ff536b7b3cfc",
  *   "count": 0
  *  }
*/
userRoutes.route('/user/followingCount').get(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.uid)};
  const projection = {projection: {count: {$size: '$following'}}};
  dbConnect.collection('users')
      .findOne(query, projection, function(err, result) {
        if (err) throw err;
        response.json(result);
      });
});

/**
  * PUT /user/follow
  * @summary Allows user to follow an account
  * @bodyParam {string} uid [(u)ser _id]
  * @bodyParam {string} ouid [(o)ther (u)ser _id]
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
userRoutes.route('/user/follow').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.uid)};
  const update = {
    $push: {
      following: ObjectId(req.body.ouid),
    },
  };
  dbConnect.collection('users')
      .updateOne(query, update, function(err, result) {
        if (err) throw err;
        response.json(result);
      });
});

/**
  * PUT /user/unfollow
  * @summary Allows a user to unfollow an account
  * @bodyParam {string} uid [(u)ser _id]
  * @bodyParam {string} ouid [(o)ther (u)ser _id]
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
userRoutes.route('/user/unfollow').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.uid)};
  const update = {
    $pull: {
      following: ObjectId(req.body.ouid),
    },
  };
  dbConnect.collection('users')
      .updateOne(query, update, function(err, result) {
        if (err) throw err;
        response.json(result);
      });
});

/**
  * PUT /user/updateUsername
  * @summary Updates user's username
  * @bodyParam {string} uid [(u)ser _id]
  * @bodyParam {string} newUsername
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
userRoutes.route('/user/updateUsername').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.uid)};
  const update = {
    $set: {
      username: req.body.newUsername,
    },
  };
  dbConnect.collection('users')
      .updateOne(query, update, function(err, result) {
        if (err) throw err;
        response.json(result);
      });
});

/**
  * PUT /user/updatePassword
  * @summary Updates user's password
  * @bodyParam {string} uid [(u)ser _id]
  * @bodyParam {string} newPassword
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
userRoutes.route('/user/updatePassword').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.uid)};
  const update = {
    $set: {
      password: req.body.newPassword,
    },
  };
  dbConnect.collection('users')
      .updateOne(query, update, function(err, result) {
        if (err) throw err;
        response.json(result);
      });
});

/**
  * PUT /user/updateProfile
  * @summary Updates user's profile
  * @bodyParam {string} uid [(u)ser _id]
  * @bodyParam {string} name
  * @bodyParam {string} bio
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
userRoutes.route('/user/updateProfile').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.uid)};
  const update = {
    $set: {
      name: req.body.name,
      bio: req.body.bio,
    },
  };
  dbConnect.collection('users')
      .updateOne(query, update, function(err, result) {
        if (err) throw err;
        response.json(result);
      });
});

/**
  * PUT /user/updatePersonalInfo
  * @summary Updates user's personal information
  * @bodyParam {string} uid [(u)ser _id]
  * @bodyParam {string} email
  * @bodyParam {string} dob
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
userRoutes.route('/user/updatePersonalInfo').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.uid)};
  const update = {
    $set: {
      email: req.body.email,
      dob: req.body.dob,
    },
  };
  dbConnect.collection('users')
      .updateOne(query, update, function(err, result) {
        if (err) throw err;
        response.json(result);
      });
});

/**
  * PUT /user/updateGenres
  * @summary Updates user's preferred genres of music
  * @bodyParam {string} uid [(u)ser _id]
  * @bodyParam {list} genres
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
userRoutes.route('/user/updateGenres').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.uid)};
  const update = {
    $push: {
      genres: req.body.genres,
    },
  };
  dbConnect.collection('users')
      .updateOne(query, update, function(err, result) {
        if (err) throw err;
        response.json(result);
      });
});

/**
  * PUT /user/switchToArtist
  * @summary Updates user to 'Artist' status
  * @bodyParam {string} uid [(u)ser _id]
  * @bodyParam {string} artistName
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
userRoutes.route('/user/switchToArtist').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.uid)};
  const update = {
    $set: {
      isArtist: true,
      artistName: req.body.artistName,
      recordLabel: req.body.recordLabel,
    },
  };
  dbConnect.collection('users')
      .updateOne(query, update, function(err, result) {
        if (err) throw err;
        response.json(result);
      });
});

/**
  * DELETE /user/delete
  * @summary Deletes user's account
  * @bodyParam {string} uid [(u)ser _id]
  * @return {object} 200 - success response - application/json
  * @example response - 200 - success response example
  * {
  *   "acknowledged": true,
  *   "deletedCount": 1
  * }
*/
userRoutes.route('/user/delete').delete((req, response) => {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId( req.body.uid )};
  dbConnect.collection('users').deleteOne(query, function(err, result) {
    if (err) throw err;
    response.json(result);
  });
});

/**
  * GET /user/getUser
  * @summary Retrieves user with uid or username
  * @bodyParam {string} uid [(u)ser _id]
  * @bodyParam {string} username
  * @return {object} 200 - success response - application/json
  * @example response - 200 - success response example
  * {
  *   "_id": "618aed07fe81ff536b7b3cfc",
  *   "username": "abedislam",
  *   "password": "password",
  *   "name": "Abed Islam",
  *   "email": "abedislam@music.com",
  *   "dob": "",
  *   "followers": [],
  *   "following": [],
  *   "bio": "",
  *   "library": [],
  *   "genres": [],
  *   "isArtist": true,
  *   "artistName": "Abed Islam",
  *   "recordLabel": "Really Far Media",
  *   "playlists": []
  * }
*/
userRoutes.route('/user/getUser').get(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {
    $or: [
      {_id: ObjectId(req.body.uid)},
      {username: req.body.username},
    ],
  };
  dbConnect.collection('users').findOne(query, function(err, result) {
    if (err) throw err;
    response.json(result);
  });
});

/**
  * GET /user/getArtist
  * @summary Retrieves artist with uid or multiple artists with artistName
  * @bodyParam {string} uid [(u)ser _id]
  * @bodyParam {string} artistName
  * @return {object} 200 - success response - application/json
  * @example response - 200 - success response example
  * {
  *   "_id": "618aed07fe81ff536b7b3cfc",
  *   "username": "abedislam",
  *   "password": "password",
  *   "name": "Abed Islam",
  *   "email": "abedislam@music.com",
  *   "dob": "",
  *   "followers": [],
  *   "following": [],
  *   "bio": "",
  *   "library": [],
  *   "genres": [],
  *   "isArtist": true,
  *   "artistName": "Abed Islam",
  *   "recordLabel": "Really Far Media",
  *   "playlists": []
  * }
*/
userRoutes.route('/user/getArtist').get(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {
    $or: [
      {_id: ObjectId(req.body.uid)},
      {artistName: req.body.artistName},
    ],
  };
  dbConnect.collection('users').findOne(query, function(err, result) {
    if (err) throw err;
    response.json(result);
  });
});

/**
  * GET /user/getSong
  * @summary Retrieves song with sid or all songs with songName
  * @bodyParam {string} sid [(s)ong _id]
  * @bodyParam {string} songName
  * @return {object} 200 - success response - application/json
  * @example response - 200 - success response example
  * {
  *   "_id": "618ae4c46d23e189de72d67f",
  *   "publisher_id": "618aed07fe81ff536b7b3cfc",
  *   "isPublished": true,
  *   "songURL": "https://myashamusic.s3.us-east-2.amazonaws.com/Growing+Pains+Vol+2/Act+1+Night.mp3",
  *   "songName": "Act 1: Night",
  *   "coverURL": "https://myashamusic.s3.us-east-2.amazonaws.com/Growing+Pains+Vol+2/artwork.png",
  *   "isSignle": false,
  *   "fromAlbum": true,
  *   "albumName": "Growing Pains, Vol 2",
  *   "genre": "Hip Hop",
  *   "releaseDate": "11/04/2021",
  *   "recordLabel": "Really Far Media",
  *   "streams": 87,
  *   "album_id": "618ae4f86d23e189de72f3cb"
  * }
*/
userRoutes.route('/user/getSong').get(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {
    $or: [
      {_id: ObjectId(req.body.sid)},
      {songName: req.body.songName},
    ],
  };
  dbConnect.collection('songs').findOne(query, function(err, result) {
    if (err) throw err;
    response.json(result);
  });
});

/**
  * GET /user/getAlbum
  * @summary Retrieves album with aid or all albums with albumName
  * @bodyParam {string} aid [(a)lbum _id]
  * @bodyParam {string} albumName
  * @return {object} 200 - success response - application/json
  * @example response - 200 - success response example
  * {
  *   "_id": "618ae4f86d23e189de72f3cb",
  *   "publisher_id": "618aed07fe81ff536b7b3cfc",
  *   "isPublished": "true",
  *   "albumURL": "https://myashamusic.s3.us-east-2.amazonaws.com/Growing+Pains+Vol+2/",
  *   "albumName": "Growing Pains, Vol 2",
  *   "coverURL": "https://myashamusic.s3.us-east-2.amazonaws.com/Growing+Pains+Vol+2/artwork.png",
  *   "songs": [
  *     "618ae4c46d23e189de72d67f",
  *     "618ae4c46d23e189de72d680",
  *     "618ae4c46d23e189de72d681",
  *     "618ae4c46d23e189de72d682",
  *     "618ae4c46d23e189de72d683",
  *     "618ae4c46d23e189de72d684",
  *     "618ae4c46d23e189de72d685",
  *     "618ae4c46d23e189de72d686",
  *     "618ae4c46d23e189de72d687",
  *     "618ae4c46d23e189de72d688",
  *     "618ae4c46d23e189de72d68a",
  *     "618ae4c46d23e189de72d68b",
  *     "618ae4c46d23e189de72d68c",
  *     "618ae4c46d23e189de72d68d"
  *   ],
  * "genre": "Hip Hop",
  * "releaseDate": "11/04/2021",
  * "recordLabel": "Really Far Media"
  * }
*/
// This route retrieves album with _id or all albums with albumName
userRoutes.route('/user/getAlbum').get(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {
    $or: [
      {albumName: req.body.albumName},
      {_id: ObjectId(req.body.aid)},
    ],
  };
  dbConnect.collection('albums').findOne(query, function(err, result) {
    if (err) throw err;
    response.json(result);
  });
});

/**
  * PUT /user/incrementSongStream
  * @summary Increments a song's stream count by 1
  * @bodyParam {string} sid [(s)ong _id]
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
userRoutes.route('/user/incrementSongStream').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.sid)};
  const update = {
    $inc: {streams: 1},
  };
  dbConnect.collection('songs')
      .updateOne(query, update, function(err, result) {
        if (err) throw err;
        response.json(result);
      });
});

/**
  * PUT /user/addLibrarySong
  * @summary Adds song to user's library
  * @bodyParam {string} uid [(u)ser _id]
  * @bodyParam {string} sid [(s)ong _id]
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
userRoutes.route('/user/addLibrarySong').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.uid)};
  const update = {
    $push: {
      library: ObjectId(req.body.sid),
    },
  };
  dbConnect.collection('users')
      .updateOne(query, update, function(err, result) {
        if (err) throw err;
        response.json(result);
      });
});

/**
  * PUT /user/removeLibrarySong
  * @summary Removes song from user's library
  * @bodyParam {string} uid [(u)ser _id]
  * @bodyParam {string} sid [(s)ong _id]
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
userRoutes.route('/user/removeLibrarySong').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.uid)};
  const update = {
    $pull: {
      library: ObjectId(req.body.sid),
    },
  };
  dbConnect.collection('users')
      .updateOne(query, update, function(err, result) {
        if (err) throw err;
        response.json(result);
      });
});

/**
  * GET /user/librarySongCount
  * @summary Counts number of songs in user's library
  * @bodyParam {string} uid [(u)ser _id]
  * @return {object} 200 - success response - application/json
  * @example response - 200 - success response example
  * {
  *   "_id": "617993da4ffb8072f0aec7a3",
  *   "count": 1
  * }
*/
userRoutes.route('/user/librarySongCount').get(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.uid)};
  const projection = {projection: {count: {$size: '$library'}}};
  dbConnect.collection('users')
      .findOne(query, projection, function(err, result) {
        if (err) throw err;
        response.json(result);
      });
});

/**
  * PUT /user/createPlaylist
  * @summary Creates a playlist
  * @bodyParam {string} uid [(u)ser _id]
  * @bodyParam {string} name
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
userRoutes.route('/user/createPlaylist').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.uid)};
  const update = {
    $push: {
      playlists: {
        _id: new ObjectId,
        name: req.body.name,
        songs: [],
      },
    },
  };
  dbConnect.collection('users')
      .updateOne(query, update, function(err, result) {
        if (err) throw err;
        response.json(result);
      });
});

/**
  * GET /user/playlistsCount
  * @summary Counts number of user's playlists
  * @bodyParam {string} uid [(u)ser _id]
  * @return {object} 200 - success response - application/json
  * @example response - 200 - success response example
  * {
  *   "_id": "618aed07fe81ff536b7b3cfc",
  *   "count": 1
  * }
*/
userRoutes.route('/user/playlistsCount').get(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.uid)};
  const projection = {projection: {count: {$size: '$playlists'}}};
  dbConnect.collection('users')
      .findOne(query, projection, function(err, result) {
        if (err) throw err;
        response.json(result);
      });
});

/**
  * PUT /user/addPlaylistSong
  * @summary Adds song to user's playlist
  * @bodyParam {string} uid [(u)ser _id]
  * @bodyParam {string} pid [(p)laylist _id]
  * @bodyParam {string} sid [(s)ong _id]
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
userRoutes.route('/user/addPlaylistSong').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {
    _id: ObjectId(req.body.uid),
    'playlists._id': ObjectId(req.body.pid),
  };
  const update = {
    $push: {
      'playlists.$.songs': ObjectId(req.body.sid),
    },
  };
  dbConnect.collection('users')
      .updateOne(query, update, function(err, result) {
        if (err) throw err;
        response.json(result);
      });
});

/**
  * PUT /user/removePlaylistSong
  * @summary Removes song from user's playlist
  * @bodyParam {string} uid [(u)ser _id]
  * @bodyParam {string} pid [(p)laylist _id]
  * @bodyParam {string} sid [(s)ong _id]
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
userRoutes.route('/user/removePlaylistSong').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {
    _id: ObjectId(req.body.uid),
    'playlists._id': ObjectId(req.body.pid),
  };
  const update = {
    $pull: {
      'playlists.$.songs': ObjectId(req.body.sid),
    },
  };
  dbConnect.collection('users')
      .updateOne(query, update, function(err, result) {
        if (err) throw err;
        response.json(result);
      });
});

/**
  * GET /user/viewPlaylistInfo
  * @summary Retrieves a playlist's information
  * @bodyParam {string} uid [(u)ser _id]
  * @bodyParam {string} pid [(p)laylist _id]
  * @return {object} 200 - success response - application/json
  * @example response - 200 - success response example
  * {
  *   "_id": "618aed07fe81ff536b7b3cfc",
  *   "playlists": [
  *     {
  *       "_id": "618afd6bfe81ff536b7b3d00",
  *       "name": "Favorites",
  *       "songs": []
  *     }
  *   ]
  * }
*/
userRoutes.route('/user/viewPlaylistInfo').get(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {
    _id: ObjectId(req.body.uid),
    'playlists._id': ObjectId(req.body.pid),
  };
  const projection = {projection: {'playlists.$': 1}};
  dbConnect.collection('users')
      .findOne(query, projection, function(err, result) {
        if (err) throw err;
        response.json(result);
      });
});

/**
  * GET /user/playlistSongCount
  * @summary Counts number of songs in user's playlist
  * @bodyParam {string} uid [(u)ser _id]
  * @bodyParam {string} pid [(p)laylist _id]
  * @return {object} 200 - success response - application/json
  * @example response - 200 - success response example
  * {}
*/
userRoutes.route('/user/playlistSongCount').get(function(req, response) {});

/**
  * DELETE /user/deletePlaylist
  * @summary Deletes user's playlist
  * @bodyParam {string} uid [(u)ser _id]
  * @bodyParam {string} pid [(p)laylist _id]
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
userRoutes.route('/user/deletePlaylist').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.uid)};
  const update = {
    $pull: {
      playlists: {
        _id: ObjectId(req.body.pid),
      },
    },
  };
  dbConnect.collection('users')
      .updateOne(query, update, function(err, result) {
        if (err) throw err;
        response.json(result);
      });
});

module.exports = userRoutes;
