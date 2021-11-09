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

// This route lists all user routes
userRoutes.route('/user/listUserRoutes').get(function(req, response) {
  const listRoutes = require('express-list-routes');
  console.log('\n ---------------- USER ROUTES ---------------- \n');
  response.json(listRoutes(userRoutes));
  console.log('\n ---------------- USER ROUTES ---------------- \n');
});

// This route registers a new user
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
    songs: [],
    albums: [],
    playlist: [],
  };
  dbConnect.collection('users').insertOne(object, function(err, result) {
    if (err) throw err;
    response.json(result);
  });
});

// This route verifies a user's login
// To retrieve specific user <field>: result.<field>
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

// This route retrieves a user's information
userRoutes.route('/user/info').get(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.uid)};
  dbConnect.collection('users').findOne(query, function(err, result) {
    if (err) throw err;
    response.json(result);
  });
});

// This route retrieves the number of accounts following a user
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

// This route retrieves a the number of accounts a user is following
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

// This route allows a user to follow another user
userRoutes.route('/user/follow').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.uid)};
  const update = {
    $push: {
      following: ObjectId(req.body.ouid), // oid = other user id
    },
  };
  const options = {returnDocument: 'after'};
  dbConnect.collection('users')
      .findOneAndUpdate(query, update, options, function(err, result) {
        if (err) throw err;
        response.json(result);
      });
});

// This route allows a user to unfollow another user
userRoutes.route('/user/unfollow').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.uid)};
  const update = {
    $pull: {
      following: ObjectId(req.body.ouid), // oid = other user id
    },
  };
  const options = {returnDocument: 'after'};
  dbConnect.collection('users')
      .findOneAndUpdate(query, update, options, function(err, result) {
        if (err) throw err;
        response.json(result);
      });
});

// This route allows a user to update their username
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

// This route allows a user to update their password
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

// This route allows a user to update their profile
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

// This route allows a user to update their personal information
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

// This route allows a user to update their preferred genres
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

// This route allows a user to update their status to 'Artist'
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

// This route allows a user to delete their account
userRoutes.route('/user/delete').delete((req, response) => {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId( req.body.uid )};
  dbConnect.collection('users').deleteOne(query, function(err, result) {
    if (err) throw err;
    response.json(result);
  });
});

// This route allows a user to view a song's information
userRoutes.route('/user/viewSongInfo').get(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.sid)};
  dbConnect.collection('songs').findOne(query, function(err, result) {
    if (err) throw err;
    response.json(result);
  });
});

// This route allows a user to view an album's information
userRoutes.route('/user/viewAlbumInfo').get(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.aid)};
  dbConnect.collection('albums').findOne(query, function(err, result) {
    if (err) throw err;
    response.json(result);
  });
});

// This route increment's a song's stream count by 1
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

// This route allows a user add a song to their library
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

// This route allows a user remove a song from their library
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

// This route retrieves the number of songs in a user's library
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

// This route allows a user create a playlist
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

// This route retrieves the number of playlists that a user has
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

// This route allows a user add a song to their playlist
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

// This route allows a user remove a song from their playlist
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

// This route retrieves information about a user's specific playlist
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

// This route retrieves the number of songs
// within a user's specific playlist
userRoutes.route('/user/playlistSongCount').get(function(req, response) {});

// This route allows a user delete a playlist
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

// This route retrieves user with _id or username
userRoutes.route('/user/findUser').get(function(req, response) {
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

// This route retrieves artist with _id or all artists with artistName
userRoutes.route('/user/findArtist').get(function(req, response) {
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

// This route retrieves all song with _id or all songs with songName
userRoutes.route('/user/findSong').get(function(req, response) {
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

// This route retrieves album with _id or all albums with albumName
userRoutes.route('/user/findAlbum').get(function(req, response) {
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

module.exports = userRoutes;
