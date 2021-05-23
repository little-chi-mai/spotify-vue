const express = require("express");
const path = require("path");
const server = express();
const dotenv = require("dotenv");
const cors = require("cors");
const querystring = require("querystring");
const cookieParser = require("cookie-parser");
const SpotifyWebApi = require("spotify-web-api-node");

dotenv.config();
const hostname = "localhost";
const port = 3030;

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = process.env.ROOT_SERVER;
console.log(redirectUri);
// const scopes = ["user-read-private", "user-read-email"];
const stateKey = "spotify_auth_state";

// Set necessary parts of the credentials on the constructor
const spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret,
  redirectUri: redirectUri + "/api/callback",
});

// var authorizeURL = spotifyApi.createAuthorizeURL(scopes, stateKey);
// console.log(authorizeURL);

const generateRandomString = function (length) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

server
  .use(express.static(path.join(__dirname, "../dist")))
  .use(cors())
  .use(cookieParser());

// SERVER-SIDE ROUTES ///////////////////////////////

server.get("/api/login", logIn);

server.get("/api/callback", callback);

server.get("/api/user/info", getUserInfo);

server.get("/api/playlist/:id", getPlaylistInfo);

server.get("/api/recenttracks", getRecentPlayedTracks);

server.get("/api/user/uploadimage", uploadImage);

server.get("/api/tracks/artist/:id", getArtistTracks);

// server.get("/api/user/playlists", getUserPlaylists);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// function getAccessToken(req, res) {
//   res.sendFile(path.join(__dirname, "../dist", "index.html"));
// }

function logIn(req, res) {
  console.log("SOMEONE WENT TO /api/login");
  const state = generateRandomString(16);
  res.cookie(stateKey, state);
  // this app requests authorization
  const scope = "user-read-private user-read-email user-read-recently-played";
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: clientId,
        scope: scope,
        redirect_uri: redirectUri + "/api/callback",
        state: state,
      })
  );
}

function callback(req, res) {
  console.log("spotifyApi", spotifyApi);
  let code = req.query.code;
  console.log(code);
  // Retrieve an access token.
  spotifyApi
    .authorizationCodeGrant(code)
    .then(function (data) {
      console.log("The token expires in " + data.body["expires_in"]);
      console.log("The access token is " + data.body["access_token"]);
      console.log("The refresh token is " + data.body["refresh_token"]);
      // Set the access token on the API object to use it in later calls
      console.log("data.body", data.body);
      spotifyApi.setAccessToken(data.body["access_token"]);
      spotifyApi.setRefreshToken(data.body["refresh_token"]);
      console.log("spotifyApi AFTER REQUIRE", spotifyApi);
      // console.log(spotifyApi.getMe());
      res.redirect("http://localhost:8080/loggedin");
    })
    .catch(function (err) {
      console.log("Something went wrong:", err);
    });
}

function getUserInfo(req, res) {
  let result = {};
  spotifyApi
    .getMe()
    .then(function (data) {
      result.userInfo = data.body;
      spotifyApi.getUserPlaylists(data.body.id).then(function (data1) {
        console.log("Retrieved playlists", data1.body);
        result.userPlaylists = data1.body;
        res.status(200).json(result);
      });
    })
    .catch(function (err) {
      console.log("Something went wrong!", err);
    });
}

function getPlaylistInfo(req, res) {
  const id = req.params.id;
  console.log("PLAYLIST ID", id);
  console.log("spotifyApi", spotifyApi);
  spotifyApi.getPlaylist(id).then(
    function (data) {
      console.log("Some information about this playlist", data.body);
      res.status(200).json(data.body);
    },
    function (err) {
      console.log("Something went wrong!", err);
    }
  );
}

function getRecentPlayedTracks(req, res) {
  spotifyApi.scope = "user-read-recently-played";
  console.log("spotifyApi", spotifyApi);

  spotifyApi
    .getMyRecentlyPlayedTracks({
      limit: 50,
    })
    .then(
      function (data) {
        // Output items
        console.log("Your 20 most recently played tracks are:");
        data.body.items.forEach((item) => console.log(item.track));
        res.status(200).json(data.body.items);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
}

function getArtistTracks(req, res) {
  // spotifyApi.scope = "user-read-recently-played";
  const id = req.params.id;
  console.log("spotifyApi", spotifyApi);

  spotifyApi.getArtistTopTracks(id, "AU").then(
    function (data) {
      console.log(data.body);
      res.status(200).json(data.body.tracks);
    },
    function (err) {
      console.log("Something went wrong!", err);
    }
  );
}

function uploadImage(req, res) {}
