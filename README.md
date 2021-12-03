# Asha Music

## Team Members:
* Afnan Haq (Front End Developer) 
* Sheika Islam (Front End Developer)
* Hellen Ekpo (Front End Developer)
* Abed Islam (Back End Developer)
* Damaris Santiago (Back End Developer)

## Description:
Asha Music is a streaming service that allows users to have a personalized music listening experience. Users can create playlists, tailor music recommendations, and upgrade to an Artist account, allowing them to upload music. One of our developers, Abed Islam, is a musical artist. He has noticed the disparity between local and popular artists and believes that it is imperative bridge the gap between the two groups. This application will give local aspiring artists the opportunity to connect with the artists that inspire them and give artists with larger fanbases the ability to provide mentoring services and develop personal connections with their audience.

_________________
## Stack: MongoDB, Express, React, Node (MERN), and AWS S3
## Linting: ESLint
## Automated Documentation: JSDoc
## Automated Testing: Postman, Newman, and GitHub Actions
## Automated Build and Deployment: Heroku
## CI/CD Pipeline: GitHub Actions to Heroku
##### Git Push &rarr; Github Actions Testing &rarr; Tests Pass &rarr; Heroku Builds and Deploys Application
##### Git Push &rarr; Github Actions Testing &rarr; Tests Fail
_________________
## To Install Dependencies:
### Root
    npm run dev

## To Start the Application Locally: Refer to collections/users.json for Login Information
### Client and Server
    npm start

## To Test Routes (Using Postman and Newman) Locally:
### Server
    npm start

### Root
    npm run tests (user and artist)
    npm run utests (user)
    npm run atests (artist)

## To Lint Code (Using ESLint)
### Root
    npm run lint (client and server)
    npm run cl (client)
    npm run sl (server)

## To Read Routes Documentation (Using JSDOC):
### Root
    npm run jsdoc
    Open server/jsdoc/index.html in browser

    User Routes

        GET      /user/listUserRoutes
        POST     /user/register
        POST     /user/login
        PUT      /user/follow
        PUT      /user/addFollower
        PUT      /user/unfollow
        PUT      /user/removeFollower
        POST     /user/followingCount
        POST     /user/followerCount
        PUT      /user/updateUsername
        PUT      /user/updatePassword
        PUT      /user/updateProfile
        PUT      /user/updatePersonalInfo
        PUT      /user/updateGenres
        PUT      /user/switchToArtist
        POST     /user/getUser
        POST     /user/getArtist
        POST     /user/getSong
        POST     /user/getAlbum
        PUT      /user/incrementSongStream
        PUT      /user/addLibrarySong
        POST     /user/recentlyAddedtoLibrary
        PUT      /user/removeLibrarySong
        POST     /user/librarySongCount
        PUT      /user/createPlaylist
        POST     /user/playlistsCount
        PUT      /user/addPlaylistSong
        PUT      /user/removePlaylistSong
        POST     /user/getPlaylistInfo
        POST     /user/playlistSongCount
        PUT      /user/deletePlaylist
        DELETE   /user/deleteAccount

    Artist Routes

        POST     /artist/createSong
        PUT      /artist/uploadSongData
        PUT      /artist/uploadSongCover
        PUT      /artist/editSongInfo
        DELETE   /artist/deleteSingle
        POST     /artist/createAlbum
        PUT      /artist/uploadAlbumCover
        PUT      /artist/editAlbumInfo
        PUT      /artist/addSongtoAlbum
        PUT      /artist/addAlbumIdtoSong
        PUT      /artist/removeSongfromAlbum
        PUT      /artist/removeAlbumIdfromSong
        PUT      /artist/publishSingle
        PUT      /artist/publishAlbum
        DELETE   /artist/deleteAlbumSongs
        DELETE   /artist/deleteAlbum
        POST     /artist/getSongs
        POST     /artist/getAlbums
        POST     /artist/getAlbumSongs
        POST     /artist/getSongStreams
        POST     /artist/getAlbumStreams
        POST     /artist/getAllStreams

## Completed Requirements:
### User and Artist Requirements:
1. Register and Delete Account
1. Login
1. Edit Account Information (Username, Password, Name, Bio, Email, DOB, Favorite Genres)
1. Upgrade from User to Artist
1. Search for Users and Artists
1. Follow and Unfollow Users and Artists
1. Search for Music
1. Play Music
1. Add Music to and Remove Music from Library
1. View Songs Recently Added to Library
1. Create and Delete Playlists
1. Add Music to and Remove Music from Playlists

### Artist Specific Requirements:
1. Upload and Publish Songs and Albums
1. Update Unpublished Song and Album Information
1. Delete Unpublished Songs
1. Delete Unpublished and Published Singles and Albums
1. View Song, Album, and All Streams