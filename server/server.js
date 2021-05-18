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
const scopes = ["user-read-private", "user-read-email"];
const stateKey = "spotify_auth_state";

// Set necessary parts of the credentials on the constructor
const spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret,
  redirectUri: redirectUri + "/api/callback",
});

var authorizeURL = spotifyApi.createAuthorizeURL(scopes, stateKey);
console.log(authorizeURL);

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

// server.get("/hey", (req, res) => res.send("ho!"));

server.get("/api/login", function (req, res) {
  console.log("SOMEONE WENT TO /api/login");
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  // this app requests authorization
  const scope = "user-read-private user-read-email";

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
});

// Get an access token and 'save' it using a setter

server.get("/api/callback", callback);

// server.get("/api/access-token", getAccessToken);

server.get("/api/user-info", getUserInfo);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// function getAccessToken(req, res) {
//   res.sendFile(path.join(__dirname, "../dist", "index.html"));
// }

function callback(req, res) {
  console.log(spotifyApi);
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

      // console.log(spotifyApi.getMe());
      res.redirect("http://localhost:8080/loggedin");
      return spotifyApi.getMe();
    })
    // .then(function (data) {
    //   // "Retrieved data for Faruk Sahin"
    //   console.log("Retrieved data for " + data.body["display_name"]);

    //   // "Email is farukemresahin@gmail.com"
    //   console.log("Email is " + data.body.email);

    //   // "Image URL is http://media.giphy.com/media/Aab07O5PYOmQ/giphy.gif"
    //   console.log("Image URL is " + data.body.images[0].url);

    //   // "This user has a premium account"
    //   console.log("This user has a " + data.body.product + " account");
    //   res.status(200).json(data.body);
    // })
    .catch(function (err) {
      console.log("Something went wrong:", err);
    });
}

function getUserInfo(req, res) {
  spotifyApi.getMe().then(function(data) {
    res.status(200).json(data.body);
  }
  );
}
