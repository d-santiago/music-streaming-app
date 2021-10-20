const {MongoClient} = require('mongodb');

describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect("mongodb+srv://AshaAdmin:seniordesign@ashamusic.znhbd.mongodb.net/AshaMusic?retryWrites=true&w=majority", {
      useNewUrlParser: true,
    });
    db = await connection.db('AshaMusic');
  });

  afterAll(async () => {
    await connection.close();
    // await db.close();
  });

  it('should insert a doc into collection', async () => {
    const users = db.collection('users');
    const mockUser = {
        _id: "test-user-id",
        username: "testUser",
        password: "Passord",
        firstName: "Test",
        lastName: "User",
        email: "test@user.com",
        dob: "10/13/2020",
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
        _id: "test-user-id",
        username: "testUser",
        password: "Passord",
        firstName: "Test",
        lastName: "User",
        email: "test@user.com",
        dob: "10/13/2020",
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
    });
    expect(insertedUser).toEqual(mockUser);
    await users.deleteOne(mockUser);
  });
});

// const registration = require('./../client/components/registration');

// test('Testing if user can register', () => {
//     const object = {
//         username: "testUser",
//         password: "Passord",
//         firstName: "Test",
//         lastName: "User",
//         email: "test@user.com",
//         dob: "10/13/2020",
//         followers: [],
//         following: [],
//         bio: '',
//         genres: [],
//         isArtist: false,
//         artistName: '',
//         songs: [],
//         albums: [],
//         playlist: [{
//           'name': '',
//           'coverURL': '',
//           'songs': [],
//         }],
//     };
// });

// // axios
// //     .post("http://localhost:5000/user/register", newUser)
// //     .then((res) => console.log(res.data));