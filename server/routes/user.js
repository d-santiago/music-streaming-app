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
// /user/login
// /user/info/:id
// /user/updateUsername/:id
// /user/updatePassword/:id
// /user/updateProfile/:id
// /user/updatePersonalInfo/:id
// /user/updateGenres/:id
// /user/switchToArtist/:id
// /:id (delete)
// /user/viewSong/:id
// /user/viewAlbum/:id
// /user/incrementSongStream/:id
// /addLibrarySong/:uid/:sid
// /user/removeLibrarySong/:uid/:sid
// /createPlaylist/:id
// /user/deletePlaylist/uid/:pid
// /user/addPlaylistSong/uid/:pid/:sid
// /user/removePlaylistSong/:uid/:pid/:sid

// For Debugging:
// console.log('query: ', query);
// console.log('req.params: ', req.params);
// const query = {_id: ObjectId(req.params.id)};
// console.log('req.body: ', req.body);
// console.log('req.body._id: ', req.body._id);

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
    genres: [],
    isArtist: false,
    artistName: '',
    recordLabel: '',
    songs: [],
    albums: [],
    playlist: [{
      'name': '',
      'coverURL': '',
      'songs': [],
    }],
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
// (:id = user _id)
userRoutes.route('/user/info/:id').get(function(req, res) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body._id)};
  dbConnect.collection('users').findOne(query, function(err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// This route allows a user to update their username
// (:id = user _id)
userRoutes.route('/user/updateUsername/:id').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body._id)};
  const updatedUsername = {
    $set: {
      username: req.body.username,
    },
  };
  dbConnect.collection('users')
      .updateOne(query, updatedUsername, function(err, res) {
        if (err) throw err;
        response.json(res);
      });
});

// This route allows a user to update their password
// (:id = user _id)
userRoutes.route('/user/updatePassword/:id').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body._id)};
  const updatedPassword = {
    $set: {
      password: req.body.newPassword,
    },
  };
  dbConnect.collection('users')
      .updateOne(query, updatedPassword, function(err, res) {
        if (err) throw err;
        response.json(res);
      });
});

// This route allows a user to update their profile
// (:id = user _id)
userRoutes.route('/user/updateProfile/:id').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body._id)};
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
// (:id = user _id)
userRoutes.route('/user/updatePersonalInfo/:id').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body._id)};
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
// (:id = user _id)
userRoutes.route('/user/updateGenres/:id').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body._id)};
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
// (:id = user _id)
userRoutes.route('/user/switchToArtist/:id').put(function(req, response) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body._id)};
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
// (:id = user _id)
userRoutes.route('/:id').delete((req, response) => {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId( req.body._id )};
  dbConnect.collection('users').deleteOne(query, function(err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This route allows a user to view a song's information
// (:id = song _id)
userRoutes.route('/user/viewSong/:id').get(function(req, res) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body._id)};
  dbConnect.collection('songs').findOne(query, function(err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// This route allows a user to view an album's information
// (:id = album _id)
userRoutes.route('/user/viewAlbum/:id').get(function(req, res) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body._id)};
  dbConnect.collection('albums').findOne(query, function(err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// This route increment's a song's stream count by 1
// (:id = song _id)
userRoutes.route('/user/incrementSongStream/:id').put(function(req, res) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body._id)};
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
// (:uid = user _id) (:sid = song _id)
userRoutes.route('/user/addLibrarySong/:uid/:sid').put(function(req, res) {
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
// (:uid = user _id) (:sid = song _id)
userRoutes.route('/user/removeLibrarySong/:uid/:sid').put(function(req, res) {
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
// (:id = user _id)
userRoutes.route('/user/createPlaylist/:id').put(function(req, res) {
  const dbConnect = dbo.getDb();
  const query = {_id: ObjectId(req.body._id)};
  const updatedUser = {
    $push: {
      playlists: {
        _id: new ObjectId,
        name: req.body.name,
        songs: [],
      },
    },
  };

  dbConnect.collection('users')
      .updateOne(query, updatedUser, function(err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This route allows a user delete a playlist
// (:uid = user _id) (:pid = playlist _id)
userRoutes.route('/user/deletePlaylist/:uid/:pid').put(function(req, res) {
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
// (:uid = user _id) (:pid = playlist _id) (:sid = song _id)
userRoutes.route('/user/addPlaylistSong/:uid/:pid/:sid').put(function(req, res) {
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
// (:uid = user _id) (:pid = playlist _id) (:sid = song _id)
userRoutes.route('/user/removePlaylistSong/:uid/:pid/:sid').put(function(req, res) {
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
