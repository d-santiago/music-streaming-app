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
### Stack: MongoDB, Express, React, Node (MERN), and AWS S3
### Linting: ESLint
### Documentation: JSDoc
### Testing: Postman, Newman, and GitHub Actions
### Build and Deployment: Heroku
### CI/CD Pipeline: GitHub Actions to Heroku
#### Git Push &rarr; Github Actions Testing &rarr; Tests Pass &rarr; Heroku Builds and Deploys Application
#### Git Push &rarr; Github Actions Testing &rarr; Tests Fail
_________________
## To Install Dependencies:
### Root
    npm run dev

## To Start the Application Locally:
### Client and Server
    npm start

## To Test Routes (Using Postman and Newman) Locally:
### Server
    npm start

### Root
    npm run tests (user and artist routes)
    npm run utests (user routes)
    npm run atests (artist routes)

## To Lint Code (Using ESLint)
### Root
    npm run lint (client and server)
    npm run cl (client)
    npm run sl (server)

## To Read Routes Documentation (Using JSDOC):
### Root
    npm run jsdoc
    Open server/jsdoc/index.html in browser

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
