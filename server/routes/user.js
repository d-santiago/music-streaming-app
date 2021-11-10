/** Express router providing user related routes
 * @module routers/user
 * @requires express
 */
const express = require('express');

// userRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will
// take control of requests starting with path /user.

/**
 * Express router to mount user related functions on.
 * @type {object}
 * @const
 * @namespace userRoutes
 */
const userRoutes = express.Router();

// This will help us connect to the database
const dbo = require('../db/conn');

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require('mongodb').ObjectId;

userRoutes.route('/user/listUserRoutes').get(function(req, response) {
  const listRoutes = require('express-list-routes');
  response.json(listRoutes(userRoutes));
});

/**
  * @name POST user/register
  * @memberof module:routers/user~userRoutes
  * @inner
  * @function
  * @summary Registers a new user
  * @param {string} username
  * @param {string} password
  * @param {string} name
  * @param {string} email
  * @param {string} dob
  * @return {object}
  * @example
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
  * @name GET user/login
  * @memberof module:routers/user~userRoutes
  * @inner
  * @function
  * @summary Verifies a user's login
  * @param {string} username
  * @param {string} password
  * @return {object}
  * @example
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
  * @name GET user/followerCount
  * @memberof module:routers/user~userRoutes
  * @inner
  * @function
  * @summary Retrieves the number of accounts following a user
  * @param {string} uid user _id
  * @return {object}
  * @example
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
  * @name GET user/followingCount
  * @memberof module:routers/user~userRoutes
  * @inner
  * @function
  * @summary Retrieves the number of accounts a user is following
  * @param {string} uid user _id
  * @return {object}
  * @example
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
  * @name PUT user/follow
  * @memberof module:routers/user~userRoutes
  * @inner
  * @function
  * @summary Allows user to follow an account
  * @param {string} uid user _id
  * @param {string} ouid other user _id
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
  * @name PUT user/unfollow
  * @memberof module:routers/user~userRoutes
  * @inner
  * @function
  * @summary Allows a user to unfollow an account
  * @param {string} uid user _id
  * @param {string} ouid other user _id
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
  * @name PUT user/updateUsername
  * @memberof module:routers/user~userRoutes
  * @inner
  * @function
  * @summary Updates user's username
  * @param {string} uid user_id
  * @param {string} newUsername
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
  * @name PUT user/updatePassword
  * @memberof module:routers/user~userRoutes
  * @inner
  * @function
  * @summary Updates user's password
  * @param {string} uid user _id
  * @param {string} newPassword
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
  * @name PUT user/updateProfile
  * @memberof module:routers/user~userRoutes
  * @inner
  * @function
  * @summary Updates user's profile
  * @param {string} uid user _id
  * @param {string} name
  * @param {string} bio
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
  * @name PUT user/updatePersonalInfo
  * @memberof module:routers/user~userRoutes
  * @inner
  * @function
  * @summary Updates user's personal information
  * @param {string} uid user_id
  * @param {string} email
  * @param {string} dob
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
  * @name PUT user/updateGenres
  * @memberof module:routers/user~userRoutes
  * @inner
  * @function
  * @summary Updates user's preferred genres of music
  * @param {string} uid user_id
  * @param {string[]} genres
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
  * @name PUT user/switchToArtist
  * @memberof module:routers/user~userRoutes
  * @inner
  * @function
  * @summary Updates user to 'Artist' status
  * @param {string} uid user_id
  * @param {string} artistName
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
  * @name DELETE user/deleteAccount
  * @memberof module:routers/user~userRoutes
  * @inner
  * @function
  * @summary Deletes user's account
  * @param {string} uid user_id
  * @return {object}
  * @example
  * {
  *   "acknowledged": true,
  *   "deletedCount": 1
  * }
*/
userRoutes.route('/user/deleteAccount').delete((req, response) => {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId( req.body.uid )};
  dbConnect.collection('users').deleteOne(query, function(err, result) {
    if (err) throw err;
    response.json(result);
  });
});

/**
  * @name GET user/getUser
  * @memberof module:routers/user~userRoutes
  * @inner
  * @function
  * @summary Retrieves user with uid or username
  * @param {string} uid user_id
  * @param {string} username
  * @return {object}
  * @example
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
  * @name GET user/getArtist
  * @memberof module:routers/user~userRoutes
  * @inner
  * @function
  * @summary Retrieves artist with uid or multiple artists with artistName
  * @param {string} uid user_id
  * @param {string} artistName
  * @return {object}
  * @example
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
  * @name GET user/getSong
  * @memberof module:routers/user~userRoutes
  * @inner
  * @function
  * @summary Retrieves song with sid or all songs with songName
  * @param {string} sid song _id
  * @param {string} songName
  * @return {object}
  * @example
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
  * @name GET user/getAlbum
  * @memberof module:routers/user~userRoutes
  * @inner
  * @function
  * @summary Retrieves album with aid or all albums with albumName
  * @param {string} aid album _id
  * @param {string} albumName
  * @return {object}
  * @example
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
  * @name PUT user/incrementSongStream
  * @memberof module:routers/user~userRoutes
  * @inner
  * @function
  * @summary Increments a song's stream count by 1
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
  * @name PUT user/addLibrarySong
  * @memberof module:routers/user~userRoutes
  * @inner
  * @function
  * @summary Adds song to user's library
  * @param {string} uid user_id
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
  * @name PUT user/removeLibrarySong
  * @memberof module:routers/user~userRoutes
  * @inner
  * @function
  * @summary Removes song from user's library
  * @param {string} uid user_id
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
  * @name GET user/recentlyAddedtoLibrary
  * @memberof module:routers/user~userRoutes
  * @inner
  * @function
  * @summary Retrieves last five songs added to user's library
  * @param {string} uid user_id
  * @return {object}
  * @example
  * {}
*/
userRoutes.route('/user/recentlyAddedtoLibrary').get(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.uid)};
  const projection = {projection: {recentlyAdded: {$slice: ['$library', -5]}}};
  dbConnect.collection('users').
      findOne(query, projection, function(err, result) {
        if (err) throw err;
        response.json(result);
      });
});

/**
  * @name GET user/librarySongCount
  * @memberof module:routers/user~userRoutes
  * @inner
  * @function
  * @summary Counts number of songs in user's library
  * @param {string} uid user_id
  * @return {object}
  * @example
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
  * @name PUT user/createPlaylist
  * @memberof module:routers/user~userRoutes
  * @inner
  * @function
  * @summary Creates a playlist
  * @param {string} uid user_id
  * @param {string} name
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
  * @name GET user/playlistsCount
  * @memberof module:routers/user~userRoutes
  * @inner
  * @function
  * @summary Counts number of user's playlists
  * @param {string} uid user_id
  * @return {object}
  * @example
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
  * @name GET user/playlistSongCount
  * @memberof module:routers/user~userRoutes
  * @inner
  * @function
  * @summary Counts number of songs in user's playlist
  * @param {string} uid user_id
  * @param {string} pid [(p)laylist _id]
  * @return {array}
  * @example
  * [
  *   {
  *     "_id": "61776035f20535a31b19d77d",
  *     "count": 7
  *   }
  * ]
*/
userRoutes.route('/user/playlistSongCount').get(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = [
    {$match: {
      _id: ObjectId(req.body.uid),
      'playlists._id': ObjectId(req.body.pid)},
    },
    {$unwind: '$playlists'},
    {$unwind: '$playlists.songs'},
    {$group: {
      _id: '$playlists.songs',
      count: {$sum: 1}},
    },
  ];
  dbConnect.collection('users')
      .aggregate(query).toArray(function(err, result) {
        if (err) throw err;
        response.json(result);
      });
});

/**
  * @name PUT user/addPlaylistSong
  * @memberof module:routers/user~userRoutes
  * @inner
  * @function
  * @summary Adds song to user's playlist
  * @param {string} uid user_id
  * @param {string} pid [(p)laylist _id]
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
  * @name PUT user/removePlaylistSong
  * @memberof module:routers/user~userRoutes
  * @inner
  * @function
  * @summary Removes song from user's playlist
  * @param {string} uid user_id
  * @param {string} pid [(p)laylist _id]
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
  * @name GET user/getPlaylistInfo
  * @memberof module:routers/user~userRoutes
  * @inner
  * @function
  * @summary Retrieves a playlist's information
  * @param {string} uid user_id
  * @param {string} pid [(p)laylist _id]
  * @return {object}
  * @example
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
userRoutes.route('/user/getPlaylistInfo').get(function(req, response) {
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
  * @name DELETE user/deletePlaylist
  * @memberof module:routers/user~userRoutes
  * @inner
  * @function
  * @summary Deletes user's playlist
  * @param {string} uid user_id
  * @param {string} pid [(p)laylist _id]
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
