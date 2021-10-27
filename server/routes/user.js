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
// /user/register
// /user/delete
// /user/login
// /user/info
// /user/updateUsername
// /user/updatePassword
// /user/updateProfile
// /user/updatePersonalInfo
// /user/updateGenres
// /user/switchToArtist
// /user/viewSong
// /user/viewAlbum
// /user/incrementSongStream
// /addLibrarySong
// /user/removeLibrarySong
// /user/createPlaylist
// /user/deletePlaylist
// /user/addPlaylistSong
// /user/removePlaylistSong

// This route registers a new user
userRoutes.route('/user/register').post(function(req, response) {
  const dbConnect = dbo.getDb();
  const object = {
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
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
  dbConnect.collection('users').insertOne(object, function(err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This route verifies a user's login
userRoutes.route('/user/login').get(function(req, res) {
  const dbConnect = dbo.getDb();
  const query = {
    username: req.body.username,
    password: req.body.password,
  };
  dbConnect.collection('users').findOne(query, function(err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// This route retrieves a user's information
userRoutes.route('/user/info').get(function(req, res) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.uid)};
  dbConnect.collection('users').findOne(query, function(err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// This route allows a user to update their username
userRoutes.route('/user/updateUsername').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.uid)};
  const updatedUsername = {
    $set: {
      username: req.body.newUsername,
    },
  };
  const options = {returnDocument: 'after'}
  dbConnect.collection('users')
      .findOneAndUpdate(query, updatedUsername, options, function(err, res) {
        if (err) throw err;
        response.json(res);
      });
});

// This route allows a user to update their password
userRoutes.route('/user/updatePassword').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.uid)};
  const updatedPassword = {
    $set: {
      password: req.body.newPassword,
    },
  };
  const options = {returnDocument: 'after'}
  dbConnect.collection('users')
      .findOneAndUpdate(query, updatedPassword, options, function(err, res) {
        if (err) throw err;
        response.json(res);
      });
});

// This route allows a user to update their profile
userRoutes.route('/user/updateProfile').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.uid)};
  const updatedFields = {
    $set: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      bio: req.body.bio,
    },
  };
  dbConnect.collection('users')
      .updateOne(query, updatedFields, function(err, res) {
        if (err) throw err;
        response.json(res);
      });
});

// This route allows a user to update their personal information
userRoutes.route('/user/updatePersonalInfo').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.uid)};
  const updatedFields = {
    $set: {
      email: req.body.email,
      dob: req.body.dob,
    },
  };
  dbConnect.collection('users')
      .updateOne(query, updatedFields, function(err, res) {
        if (err) throw err;
        response.json(res);
      });
});

// This route allows a user to update their preferred genres
userRoutes.route('/user/updateGenres').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.uid)};
  const updatedGenres = {
    $push: {
      genres: req.body.genres,
    },
  };
  dbConnect.collection('users')
      .updateOne(query, updatedGenres, function(err, res) {
        if (err) throw err;
        response.json(res);
      });
});

// This route allows a user to update their status to 'Artist'
userRoutes.route('/user/switchToArtist').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.uid)};
  const updatedFields = {
    $set: {
      isArtist: true,
      artistName: req.body.artistName,
      recordLabel: req.body.recordLabel,
    },
  };
  dbConnect.collection('users')
      .updateOne(query, updatedFields, function(err, res) {
        if (err) throw err;
        response.json(res);
      });
});

// This route allows a user to delete their account
userRoutes.route('/user/delete').delete((req, response) => {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId( req.body.uid )};
  dbConnect.collection('users').deleteOne(query, function(err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This route allows a user to view a song's information
userRoutes.route('/user/viewSong').get(function(req, res) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.sid)};
  dbConnect.collection('songs').findOne(query, function(err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// This route allows a user to view an album's information
userRoutes.route('/user/viewAlbum').get(function(req, res) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.aid)};
  dbConnect.collection('albums').findOne(query, function(err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// This route increment's a song's stream count by 1
userRoutes.route('/user/incrementSongStream').put(function(req, res) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.sid)};
  const updatedSong = {
    $inc: {streams: 1},
  };

  dbConnect.collection('songs')
      .updateOne(query, updatedSong, function(err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This route allows a user add a song to their library
userRoutes.route('/user/addLibrarySong').put(function(req, res) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.uid)};
  const updatedUser = {
    $push: {
      library: {_id: ObjectId(req.body.sid)},
    },
  };

  dbConnect.collection('users')
      .updateOne(query, updatedUser, function(err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This route allows a user remove a song from their library
userRoutes.route('/user/removeLibrarySong').put(function(req, res) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.uid)};
  const updatedUser = {
    $pull: {
      library: {_id: ObjectId(req.body.sid)},
    },
  };

  dbConnect.collection('users')
      .updateOne(query, updatedUser, function(err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This route allows a user create a playlist
userRoutes.route('/user/createPlaylist').put(function(req, res) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.uid)};
  const updatedUser = {
    $push: {
      playlists: {
        _id: new ObjectId,
        name: req.body.name,
        songs: [],
      },
    },
  };
  const options = {returnDocument: 'after'}

  dbConnect.collection('users')
      .findOneAndUpdate(query, updatedUser, options, function(err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This route allows a user delete a playlist
userRoutes.route('/user/deletePlaylist').put(function(req, res) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body.uid)};
  const updatedPlaylist = {
    $pull: {
      playlists: {
        _id: ObjectId(req.body.pid),
      },
    },
  };

  dbConnect.collection('users')
      .updateOne(query, updatedPlaylist, function(err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This route allows a user add a song to their playlist
userRoutes.route('/user/addPlaylistSong').put(function(req, res) {
  const dbConnect = dbo.getDb();
  const query = {
    _id: ObjectId(req.body.uid),
    'playlists._id': ObjectId(req.body.pid),
  };
  const updatedPlaylist = {
    $push: {
      'playlists.$.songs': ObjectId(req.body.sid),
    },
  };

  dbConnect.collection('users')
      .updateOne(query, updatedPlaylist, function(err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This route allows a user remove a song from their playlist
userRoutes.route('/user/removePlaylistSong').put(function(req, res) {
  const dbConnect = dbo.getDb();
  const query = {
    _id: ObjectId(req.body.uid),
    'playlists._id': ObjectId(req.body.pid),
  };
  const updatedPlaylist = {
    $pull: {
      'playlists.$.songs': ObjectId(req.body.sid),
    },
  };
  dbConnect.collection('users')
      .updateOne(query, updatedPlaylist, function(err, result) {
        if (err) throw err;
        res.json(result);
      });
});

module.exports = userRoutes;
