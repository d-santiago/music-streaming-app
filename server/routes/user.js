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
  * {
      "acknowledged": true,
      "insertedId": "61a538141aa6aff50f71ed5a"
  * }
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
  * @name POST user/login
  * @memberof module:routers/user~userRoutes
  * @inner
  * @function
  * @summary Verifies a user's login
  * @param {string} username
  * @param {string} password
  * @return {object}
  * @example
  * {
      "_id": "61a5384b1aa6aff50f71ed5b",
      "username": "testuser",
      "password": "password",
      "name": "Test User",
      "email": "testuser@gmail.com",
      "dob": "11/17/2021",
      "followers": [],
      "following": [],
      "bio": "",
      "library": [],
      "genres": [],
      "isArtist": false,
      "artistName": "",
      "recordLabel": "",
      "playlist": []
  * }
*/
userRoutes.route('/user/login').post(function(req, response) {
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
    "value":
      {
        "_id": "61a536281b616a3b05bc1d9b",
        "username": "user1",
        "password": "password",
        "name": "User 1",
        "email": "user1@gmail.com",
        "dob": "11/17/2021",
        "followers": [],
        "following": [
          "61a536281b616a3b05bc1d9c"
        ],
        "bio": "",
        "library": [],
        "genres": [],
        "isArtist": false,
        "artistName": "",
        "recordLabel": "",
        "playlist": []
      }
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
  const options = {returnDocument: 'after'};
  dbConnect.collection('users')
      .findOneAndUpdate(query, update, options, function(err, result) {
        if (err) throw err;
        response.json(result);
      });
});

/**
  * @name PUT user/addFollower
  * @memberof module:routers/user~userRoutes
  * @inner
  * @function
  * @summary Adds user to user's followers. Called after /user/follow
  * @param {string} uid user _id
  * @param {string} ouid other user _id
  * @return {object}
  * @example
  * {
    "value":
      {
        "_id": "61a538c91aa6aff50f71ed5c",
        "username": "user1",
        "password": "password",
        "name": "User 1",
        "email": "user1@gmail.com",
        "dob": "11/17/2021",
        "followers": [
            "61a538c91aa6aff50f71ed5d"
        ],
        "following": [],
        "bio": "",
        "library": [],
        "genres": [],
        "isArtist": false,
        "artistName": "",
        "recordLabel": "",
        "playlist": []
      }
  * }
*/
userRoutes.route('/user/addFollower').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.uid)};
  const update = {
    $push: {
      followers: ObjectId(req.body.ouid),
    },
  };
  const options = {returnDocument: 'after'};
  dbConnect.collection('users')
      .findOneAndUpdate(query, update, options, function(err, result) {
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
    "value":
      {
        "_id": "61a539191aa6aff50f71ed5e",
        "username": "user1",
        "password": "password",
        "name": "User 1",
        "email": "user1@gmail.com",
        "dob": "11/17/2021",
        "followers": [],
        "following": [],
        "bio": "",
        "library": [],
        "genres": [],
        "isArtist": false,
        "artistName": "",
        "recordLabel": "",
        "playlist": []
      }
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
  const options = {returnDocument: 'after'};
  dbConnect.collection('users')
      .findOneAndUpdate(query, update, options, function(err, result) {
        if (err) throw err;
        response.json(result);
      });
});

/**
  * @name PUT user/removeFollower
  * @memberof module:routers/user~userRoutes
  * @inner
  * @function
  * @summary Removes user from user's followers. Called after /user/unfollow.
  * @param {string} uid user _id
  * @param {string} ouid other user _id
  * @return {object}
  * @example
  * {
    "value":
      {
        "_id": "61a5395d1aa6aff50f71ed60",
        "username": "user1",
        "password": "password",
        "name": "User 1",
        "email": "user1@gmail.com",
        "dob": "11/17/2021",
        "followers": [],
        "following": [],
        "bio": "",
        "library": [],
        "genres": [],
        "isArtist": false,
        "artistName": "",
        "recordLabel": "",
        "playlist": []
      }
  * }
*/
userRoutes.route('/user/removeFollower').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.uid)};
  const update = {
    $pull: {
      followers: ObjectId(req.body.ouid),
    },
  };
  const options = {returnDocument: 'after'};
  dbConnect.collection('users')
      .findOneAndUpdate(query, update, options, function(err, result) {
        if (err) throw err;
        response.json(result);
      });
});

/**
  * @name POST user/followingCount
  * @memberof module:routers/user~userRoutes
  * @inner
  * @function
  * @summary Retrieves the number of accounts a user is following
  * @param {string} uid user _id
  * @return {object}
  * @example
  * {
      "_id": "61a539871aa6aff50f71ed62",
      "count": 1
  * }
*/
userRoutes.route('/user/followingCount').post(function(req, response) {
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
  * @name POST user/followerCount
  * @memberof module:routers/user~userRoutes
  * @inner
  * @function
  * @summary Retrieves the number of accounts following a user
  * @param {string} uid user _id
  * @return {object}
  * @example
  * {
      "_id": "61a539951aa6aff50f71ed64",
      "count": 1
  * }
*/
userRoutes.route('/user/followerCount').post(function(req, response) {
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
    "value":
      {
        "_id": "61a539a51aa6aff50f71ed66",
        "username": "updatedtestuser",
        "password": "password",
        "name": "Test User",
        "email": "testuser@gmail.com",
        "dob": "11/17/2021",
        "followers": [],
        "following": [],
        "bio": "",
        "library": [],
        "genres": [],
        "isArtist": false,
        "artistName": "",
        "recordLabel": "",
        "playlist": []
      }
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
  const options = {returnDocument: 'after'};
  dbConnect.collection('users')
      .findOneAndUpdate(query, update, options, function(err, result) {
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
    "value":
      {
        "_id": "61a53a0a1aa6aff50f71ed67",
        "username": "testuser",
        "password": "newPassword",
        "name": "Test User",
        "email": "testuser@gmail.com",
        "dob": "11/17/2021",
        "followers": [],
        "following": [],
        "bio": "",
        "library": [],
        "genres": [],
        "isArtist": false,
        "artistName": "",
        "recordLabel": "",
        "playlist": []
      }
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
  const options = {returnDocument: 'after'};
  dbConnect.collection('users')
      .findOneAndUpdate(query, update, options, function(err, result) {
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
    "value":
      {
        "_id": "61a53b951aa6aff50f71ed68",
        "username": "testuser",
        "password": "password",
        "name": "Fake User",
        "email": "testuser@gmail.com",
        "dob": "11/17/2021",
        "followers": [],
        "following": [],
        "bio": "I love music!",
        "library": [],
        "genres": [],
        "isArtist": false,
        "artistName": "",
        "recordLabel": "",
        "playlist": []
      }
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
  const options = {returnDocument: 'after'};
  dbConnect.collection('users')
      .findOneAndUpdate(query, update, options, function(err, result) {
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
    "value":
      {
        "_id": "61a53bdd1aa6aff50f71ed69",
        "username": "testuser",
        "password": "password",
        "name": "Test User",
        "email": "testuser@icloud.com",
        "dob": "11/24/2021",
        "followers": [],
        "following": [],
        "bio": "",
        "library": [],
        "genres": [],
        "isArtist": false,
        "artistName": "",
        "recordLabel": "",
        "playlist": []
      }
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
  const options = {returnDocument: 'after'};
  dbConnect.collection('users')
      .findOneAndUpdate(query, update, options, function(err, result) {
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
    "value":
      {
        "_id": "61a53c101aa6aff50f71ed6a",
        "username": "testuser",
        "password": "password",
        "name": "Test User",
        "email": "testuser@gmail.com",
        "dob": "11/17/2021",
        "followers": [],
        "following": [],
        "bio": "",
        "library": [],
        "genres": [
            "Jazz"
        ],
        "isArtist": false,
        "artistName": "",
        "recordLabel": "",
        "playlist": []
      }
  * }
*/
userRoutes.route('/user/updateGenres').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.uid)};
  const update = {
    $set: {
      genres: [req.body.genres],
    },
  };
  const options = {returnDocument: 'after'};
  dbConnect.collection('users')
      .findOneAndUpdate(query, update, options, function(err, result) {
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
    "value":
      {
        "_id": "61a53c521aa6aff50f71ed6b",
        "username": "testuser",
        "password": "password",
        "name": "Test User",
        "email": "testuser@gmail.com",
        "dob": "11/17/2021",
        "followers": [],
        "following": [],
        "bio": "",
        "library": [],
        "genres": [],
        "isArtist": true,
        "artistName": "Dr. Music",
        "recordLabel": "Music Forever Records",
        "playlist": []
      }
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
  const options = {returnDocument: 'after'};
  dbConnect.collection('users')
      .findOneAndUpdate(query, update, options, function(err, result) {
        if (err) throw err;
        response.json(result);
      });
});

/**
  * @name POST user/getUser
  * @memberof module:routers/user~userRoutes
  * @inner
  * @function
  * @summary Retrieves user with uid or username
  * @param {string} uid user_id
  * @param {string} username
  * @return {object}
  * @example
  * {
      "_id": "61a53c971aa6aff50f71ed6c",
      "username": "testuser",
      "password": "password",
      "name": "Test User",
      "email": "testuser@gmail.com",
      "dob": "11/17/2021",
      "followers": [],
      "following": [],
      "bio": "",
      "library": [],
      "genres": [],
      "isArtist": false,
      "artistName": "",
      "recordLabel": "",
      "playlist": []
  * }
*/
userRoutes.route('/user/getUser').post(function(req, response) {
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
  * @name POST user/getArtist
  * @memberof module:routers/user~userRoutes
  * @inner
  * @function
  * @summary Retrieves artist with uid or multiple artists with artistName
  * @param {string} uid user_id
  * @param {string} artistName
  * @return {object}
  * @example
  * {
    "_id": "61a53ce01aa6aff50f71ed6d",
      "username": "testuser",
      "password": "password",
      "name": "Test User",
      "email": "testuser@gmail.com",
      "dob": "11/17/2021",
      "followers": [],
      "following": [],
      "bio": "",
      "library": [],
      "genres": [],
      "isArtist": true,
      "artistName": "Dr. Music",
      "recordLabel": "Music Forever Records",
      "playlist": []
  * }
*/
userRoutes.route('/user/getArtist').post(function(req, response) {
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
  * @name POST user/getSong
  * @memberof module:routers/user~userRoutes
  * @inner
  * @function
  * @summary Retrieves song with sid or all songs with songName
  * @param {string} sid song _id
  * @param {string} songName
  * @return {object}
  * @example
  * {
      "_id": "618ae4c46d23e189de72d67f",
      "publisher_id": "618aed07fe81ff536b7b3cfc",
      "isPublished": true,
      "songURL": "https://myashamusic.s3.us-east-2.amazonaws.com/Growing+Pains+Vol+2/Act+1+Night.mp3",
      "songName": "Act 1: Night",
      "coverURL": "https://myashamusic.s3.us-east-2.amazonaws.com/Growing+Pains+Vol+2/artwork.png",
      "isSignle": false,
      "fromAlbum": true,
      "albumName": "Growing Pains, Vol 2",
      "genre": "Hip Hop",
      "releaseDate": "11/04/2021",
      "recordLabel": "Really Far Media",
      "streams": 87,
      "album_id": "618ae4f86d23e189de72f3cb"
  * }
*/
userRoutes.route('/user/getSong').post(function(req, response) {
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
  * @name POST user/getAlbum
  * @memberof module:routers/user~userRoutes
  * @inner
  * @function
  * @summary Retrieves album with aid or all albums with albumName
  * @param {string} aid album _id
  * @param {string} albumName
  * @return {object}
  * @example
  * {
      "_id": "618ae4f86d23e189de72f3cb",
      "publisher_id": "618aed07fe81ff536b7b3cfc",
      "isPublished": "true",
      "albumURL": "https://myashamusic.s3.us-east-2.amazonaws.com/Growing+Pains+Vol+2/",
      "albumName": "Growing Pains, Vol 2",
      "coverURL": "https://myashamusic.s3.us-east-2.amazonaws.com/Growing+Pains+Vol+2/artwork.png",
      "songs": [
        "618ae4c46d23e189de72d67f",
        "618ae4c46d23e189de72d680",
        "618ae4c46d23e189de72d681",
        "618ae4c46d23e189de72d682",
        "618ae4c46d23e189de72d683",
        "618ae4c46d23e189de72d684",
        "618ae4c46d23e189de72d685",
        "618ae4c46d23e189de72d686",
        "618ae4c46d23e189de72d687",
        "618ae4c46d23e189de72d688",
        "618ae4c46d23e189de72d68a",
        "618ae4c46d23e189de72d68b",
        "618ae4c46d23e189de72d68c",
        "618ae4c46d23e189de72d68d"
      ],
      "genre": "Hip Hop",
      "releaseDate": "11/04/2021",
      "recordLabel": "Really Far Media"
  * }
*/
// This route retrieves album with _id or all albums with albumName
userRoutes.route('/user/getAlbum').post(function(req, response) {
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
    "value":
      {
        "_id": "61a53df31aa6aff50f71ed71",
        "publisher_id": "61a53df21aa6aff50f71ed70",
        "isPublished": false,
        "songURL": "",
        "songName": "Song Name",
        "coverURL": "",
        "isSignle": true,
        "album_id": "",
        "genre": "Pop",
        "releaseDate": "",
        "recordLabel": "Music Forever Records",
        "streams": 1
      }
  * }
*/
userRoutes.route('/user/incrementSongStream').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.sid)};
  const update = {
    $inc: {streams: 1},
  };
  const options = {returnDocument: 'after'};
  dbConnect.collection('songs')
      .findOneAndUpdate(query, update, options, function(err, result) {
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
    "value":
      {
        "_id": "61a53e191aa6aff50f71ed72",
        "username": "testuser",
        "password": "password",
        "name": "Test User",
        "email": "testuser@gmail.com",
        "dob": "11/17/2021",
        "followers": [],
        "following": [],
        "bio": "",
        "library": [
            "61a53e191aa6aff50f71ed73"
        ],
        "genres": [],
        "isArtist": true,
        "artistName": "Dr. Music",
        "recordLabel": "Music Forever Records",
        "playlist": []
      }
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
  const options = {returnDocument: 'after'};
  dbConnect.collection('users')
      .findOneAndUpdate(query, update, options, function(err, result) {
        if (err) throw err;
        response.json(result);
      });
});

/**
  * @name POST user/recentlyAddedtoLibrary
  * @memberof module:routers/user~userRoutes
  * @inner
  * @function
  * @summary Retrieves last five songs added to user's library
  * @param {string} uid user_id
  * @return {object}
  * @example
  * {
      "_id": "61a53e641aa6aff50f71ed74",
      "recentlyAdded": [
          "61a53e641aa6aff50f71ed75"
      ]
  * }
*/
userRoutes.route('/user/recentlyAddedtoLibrary').post(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.uid)};
  const projection = {projection: {recentlyAdded: {$slice: ['$library', -10]}}};
  dbConnect.collection('users').
      findOne(query, projection, function(err, result) {
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
    "value":
      {
        "_id": "61a53e831aa6aff50f71ed76",
        "username": "testuser",
        "password": "password",
        "name": "Test User",
        "email": "testuser@gmail.com",
        "dob": "11/17/2021",
        "followers": [],
        "following": [],
        "bio": "",
        "library": [],
        "genres": [],
        "isArtist": true,
        "artistName": "Dr. Music",
        "recordLabel": "Music Forever Records",
        "playlist": []
      }
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
  const options = {returnDocument: 'after'};
  dbConnect.collection('users')
      .findOneAndUpdate(query, update, options, function(err, result) {
        if (err) throw err;
        response.json(result);
      });
});

/**
  * @name POST user/librarySongCount
  * @memberof module:routers/user~userRoutes
  * @inner
  * @function
  * @summary Counts number of songs in user's library
  * @param {string} uid user_id
  * @return {object}
  * @example
  * {
      "_id": "617993da4ffb8072f0aec7a3",
      "count": 1
  * }
*/
userRoutes.route('/user/librarySongCount').post(function(req, response) {
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
    "value":
      {
        "_id": "61a53ed71aa6aff50f71ed7a",
        "username": "testuser",
        "password": "password",
        "name": "Test User",
        "email": "testuser@gmail.com",
        "dob": "11/17/2021",
        "followers": [],
        "following": [],
        "bio": "",
        "library": [],
        "genres": [],
        "isArtist": false,
        "artistName": "",
        "recordLabel": "",
        "playlist": [],
        "playlists": [
          {
              "_id": "61a53ed71aa6aff50f71ed7b",
              "name": "Favorite Songs",
              "songs": []
          }
        ]
      }
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
  const options = {returnDocument: 'after'};
  dbConnect.collection('users')
      .findOneAndUpdate(query, update, options, function(err, result) {
        if (err) throw err;
        response.json(result);
      });
});

/**
  * @name POST user/playlistsCount
  * @memberof module:routers/user~userRoutes
  * @inner
  * @function
  * @summary Counts number of user's playlists
  * @param {string} uid user_id
  * @return {object}
  * @example
  * {
      "_id": "618aed07fe81ff536b7b3cfc",
      "count": 1
  * }
*/
userRoutes.route('/user/playlistsCount').post(function(req, response) {
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
    "value":
      {
        "_id": "61a53f361aa6aff50f71ed7e",
        "username": "testuser",
        "password": "password",
        "name": "Test User",
        "email": "testuser@gmail.com",
        "dob": "11/17/2021",
        "followers": [],
        "following": [],
        "bio": "",
        "library": [],
        "genres": [],
        "isArtist": true,
        "artistName": "Dr. Music",
        "recordLabel": "Music Forever Records",
        "playlist": [],
        "playlists": [
          {
            "_id": "61a53f361aa6aff50f71ed80",
            "name": "Favorite Songs",
            "songs": [
              "61a53f361aa6aff50f71ed7f"
            ]
          }
        ]
      }
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
  const options = {returnDocument: 'after'};
  dbConnect.collection('users')
      .findOneAndUpdate(query, update, options, function(err, result) {
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
    "value":
      {
        "_id": "61a53f821aa6aff50f71ed81",
        "username": "testuser",
        "password": "password",
        "name": "Test User",
        "email": "testuser@gmail.com",
        "dob": "11/17/2021",
        "followers": [],
        "following": [],
        "bio": "",
        "library": [],
        "genres": [],
        "isArtist": true,
        "artistName": "Dr. Music",
        "recordLabel": "Music Forever Records",
        "playlist": [],
        "playlists": [
          {
            "_id": "61a53f831aa6aff50f71ed83",
            "name": "Favorite Songs",
            "songs": []
          }
        ]
      }
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
  const options = {returnDocument: 'after'};
  dbConnect.collection('users')
      .findOneAndUpdate(query, update, options, function(err, result) {
        if (err) throw err;
        response.json(result);
      });
});

/**
  * @name POST user/getPlaylistInfo
  * @memberof module:routers/user~userRoutes
  * @inner
  * @function
  * @summary Retrieves a playlist's information
  * @param {string} uid user_id
  * @param {string} pid [(p)laylist _id]
  * @return {object}
  * @example
  * {
      "_id": "61a53fbb1aa6aff50f71ed84",
        "playlists": [
          {
            "_id": "61a53fbc1aa6aff50f71ed86",
            "name": "Favorite Songs",
            "songs": [
                "61a53fbc1aa6aff50f71ed85"
            ]
          }
        ]
  * }
*/
userRoutes.route('/user/getPlaylistInfo').post(function(req, response) {
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
  * @name POST user/playlistSongCount
  * @memberof module:routers/user~userRoutes
  * @inner
  * @function
  * @summary Counts number of songs in user's playlist
  * @param {string} uid user_id
  * @param {string} pid [(p)laylist _id]
  * @return {array}
  * @example
  * [
      {
        "_id": "61776035f20535a31b19d77d",
        "count": 7
      }
  * ]
*/
userRoutes.route('/user/playlistSongCount').post(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = [
    {$match: {
      _id: ObjectId(req.body.uid),
      'playlists._id': ObjectId(req.body.pid)},
    },
    {$unwind: '$playlists'},
    {$unwind: '$playlists.songs'},
    {$group: {
      // _id: '$playlists.songs',
      _id: ObjectId(req.body.uid),
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
    "value":
      {
        "_id": "61a5400a1aa6aff50f71ed8c",
        "username": "testuser",
        "password": "password",
        "name": "Test User",
        "email": "testuser@gmail.com",
        "dob": "11/17/2021",
        "followers": [],
        "following": [],
        "bio": "",
        "library": [],
        "genres": [],
        "isArtist": false,
        "artistName": "",
        "recordLabel": "",
        "playlist": [],
        "playlists": []
      }
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
  const options = {returnDocument: 'after'};
  dbConnect.collection('users')
      .findOneAndUpdate(query, update, options, function(err, result) {
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
      "acknowledged": true,
      "deletedCount": 1
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

module.exports = userRoutes;
