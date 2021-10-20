const {MongoClient} = require('mongodb');

describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect('mongodb+srv://AshaAdmin:seniordesign@ashamusic.znhbd.mongodb.net/AshaMusic?retryWrites=true&w=majority', {
      useNewUrlParser: true,
    });
    db = await connection.db('AshaMusic');
  });

  afterAll(async () => {
    await connection.close();
    // await db.close();
  });

  it('should check if a doc is in a collection', async () => {
    const users = db.collection('users');
    const mockUser = {
      _id: 'test-user-id-login',
      username: 'testUser',
      password: 'Passord',
      firstName: 'Test',
      lastName: 'User',
      email: 'test@user.com',
      dob: '10/13/2020',
      followers: [],
      following: [],
      bio: '',
      genres: [],
      isArtist: false,
      artistName: '',
      songs: [],
      albums: [],
      playlist: [{
        'name': '',
        'coverURL': '',
        'songs': [],
      }],
    };

    await users.insertOne(mockUser);
    const insertedUser = await users.findOne({
      username: 'testUser',
      password: 'Passord',
    });
    expect(insertedUser.username).toBe(mockUser.username);
    expect(insertedUser.password).toBe(mockUser.password);
    await users.deleteOne(mockUser);
  });
});
