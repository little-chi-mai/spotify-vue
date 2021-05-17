const express = require("express");
const path = require("path");
const server = express();
const dotenv = require("dotenv");
const cors = require("cors");
const querystring = require("querystring");
const cookieParser = require("cookie-parser");

dotenv.config();
const hostname = "localhost";
const port = 3030;

const clientID = process.env.SPOTIFY_CLIENT_ID;
// const clientSercret = process.env.SPOTIFY_CLIENT_SECRET;

const redirectURI = `http://${hostname}:${port}/about`;
console.log(redirectURI);
const stateKey = "spotify_auth_state";

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

server.get("/login", function (req, res) {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  // this app requests authorization
  const scope = "user-read-private user-read-email";

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: clientID,
        scope: scope,
        redirect_uri: redirectURI,
        state: state,
      })
  );
});

// server.get("/callback", function (req, res) {
//   // the app requests refresh and access tokens
// });

server.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
