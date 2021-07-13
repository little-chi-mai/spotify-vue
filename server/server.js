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

server.post("/api/logout", logout);

server.get("/api/callback", callback);

server.get("/api/user/info", getUserInfo);

server.get("/api/playlist/:id", getPlaylistInfo);

server.get("/api/recenttracks", getRecentPlayedTracks);

server.get("/api/toptracks", getMyTopTracks);

// server.get("/api/user/uploadimage", uploadImage);

server.get("/api/artist/:id/tracks", getArtistTracks);

server.get("/api/artist/:id/info", getArtistInfo);

server.get("/api/artist/:id/albums", getArtistAlbums);

server.post("/api/playlist/create", createPlaylist);

// server.get("/api/artist/toptracks", getArtistTopTracks);

// server.get("/api/user/playlists", getUserPlaylists);

server.get("/api/album/:id", getAlbum);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// function getAccessToken(req, res) {
//   res.sendFile(path.join(__dirname, "../dist", "index.html"));
// }

function logIn(req, res) {
  const state = generateRandomString(16);
  res.cookie(stateKey, state, { path: "/" });
  // this app requests authorization
  const scope =
    "user-read-private user-read-email user-read-recently-played user-top-read playlist-modify-public playlist-modify-private";
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

function logout(req, res) {
  res.clearCookie(stateKey, { path: "/" });
  spotifyApi.setAccessToken("");

  res.status(200).json("logged out!");
}

function callback(req, res) {
  let code = req.query.code;
  // Retrieve an access token.
  spotifyApi
    .authorizationCodeGrant(code)
    .then(function (data) {
      console.log("The token expires in " + data.body["expires_in"]);
      console.log("The access token is " + data.body["access_token"]);
      console.log("The refresh token is " + data.body["refresh_token"]);
      // Set the access token on the API object to use it in later calls
      // console.log("data.body", data.body);
      spotifyApi.setAccessToken(data.body["access_token"]);
      spotifyApi.setRefreshToken(data.body["refresh_token"]);
      // console.log("spotifyApi AFTER REQUIRE", spotifyApi);
      // console.log(spotifyApi.getMe());
      res.redirect("http://localhost:8080");
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
        // console.log("Retrieved playlists", data1.body);
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
  // console.log("PLAYLIST ID", id);
  // console.log("spotifyApi", spotifyApi);
  spotifyApi.getPlaylist(id).then(
    function (data) {
      // console.log("Some information about this playlist", data.body);
      res.status(200).json(data.body);
    },
    function (err) {
      console.log("Something went wrong!", err);
    }
  );
}

function getRecentPlayedTracks(req, res) {
  // spotifyApi.scope = "user-read-recently-played";
  // spotifyApi.scope = "user-top-read";
  // console.log("spotifyApi", spotifyApi);

  spotifyApi
    .getMyRecentlyPlayedTracks({
      limit: 50,
    })
    .then(
      function (data) {
        // Output items
        // console.log("Your 20 most recently played tracks are:");
        // data.body.items.forEach((item) => console.log(item.track));
        res.status(200).json(data.body.items);
      },
      function (err) {
        console.log("Something went wrong!", err.body);
      }
    );

 
  // spotifyApi.getMyTopArtists()
  // .then(function(data) {
  //   let topArtists = data.body.items;
  //   console.log(topArtists);
  //   res.status(200).json(topArtists);
  // }, function(err) {
  //   console.log('Something went wrong!', err);
  // });
}

function getMyTopTracks(req, res) {
  spotifyApi.getMyTopTracks().then(
    function (data) {
      let topTracks = data.body.items;
      res.status(200).json(topTracks);
    },
    function (err) {
      console.log("Something went wrong!", err);
    }
  );
} 

function getArtistTracks(req, res) {
  // spotifyApi.scope = "user-read-recently-played";
  const id = req.params.id;
  // console.log("spotifyApi", spotifyApi);

  spotifyApi.getArtistTopTracks(id, "AU").then(
    function (data) {
      // console.log(data.body);
      res.status(200).json(data.body.tracks);
    },
    function (err) {
      console.log("Something went wrong!", err);
    }
  );
}

function createPlaylist(req, res) {
  spotifyApi
    .createPlaylist("My playlist1", {
      description: "My description",
      public: true,
    })
    .then(
      function (data) {
        // console.log("DATA", data);
        // console.log("Created playlist!");
        res.status(200).json(data.body);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
}

function getArtistInfo(req, res) {
  const id = req.params.id;
  spotifyApi.getArtist(id).then(
    function (data) {
      // console.log("Artist information", data.body);
      res.status(200).json(data.body);
    },
    function (err) {
      console.error(err);
    }
  );
}

function getArtistAlbums(req, res) {
  const id = req.params.id;
  spotifyApi.getArtistAlbums(id).then(
    function (data) {
      // console.log('Artist albums', data.body);
      res.status(200).json(data.body);
    },
    function (err) {
      console.error(err);
    }
  );
}

function getAlbum(req, res) {
  const id = req.params.id;
  spotifyApi.getAlbum(id)
  .then(function(data) {
    // console.log('Album information', data.body);
    res.status(200).json(data.body);
  }, function(err) {
    console.error(err);
  });

  // spotifyApi.getAlbumTracks(id, { limit: 5, offset: 1 }).then(
  //   function (data) {
  //     console.log(data.body);
  //     res.status(200).json(data.body);
  //   },
  //   function (err) {
  //     console.log("Something went wrong!", err);
  //   }
  // );
}
