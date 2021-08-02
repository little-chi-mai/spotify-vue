const express = require("express");
const path = require("path");
const server = express();
const dotenv = require("dotenv");
const cors = require("cors");
const querystring = require("querystring");
const cookieParser = require("cookie-parser");
const SpotifyWebApi = require("spotify-web-api-node");
const session = require("express-session");

dotenv.config();
const port = process.env.PORT || 3030;

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = process.env.VUE_APP_ROOT_SERVER;
console.log(redirectUri);
const stateKey = "spotify_auth_state";

server
  .use(express.static(path.join(__dirname, "../dist")))
  .use(cors())
  .use(cookieParser());

// Set necessary parts of the credentials on the constructor
// const makeSpotifyApi = function () {
//   const spotifyApi = new SpotifyWebApi({
//     clientId: clientId,
//     clientSecret: clientSecret,
//     redirectUri: redirectUri + "/api/callback",
//   });
//   return spotifyApi;
// };

// const setApiTokens = function (spotifyApi, access_token, refresh_token) {
//   spotifyApi.setAccessToken(access_token);
//   spotifyApi.setRefreshToken(refresh_token);
// };

const generateRandomString = function (length) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

server.use(
  session({
    secret: "lala",
    resave: true,
    saveUninitialized: true,
    cookie: {
      // sameSite: "none",
      secure: true,
    },
  })
);

server.get("/api/setcookie", (req, res) => {
  res.cookie(`Cookie token name`, `encrypted cookie string Value`, {
    maxAge: 5000,
    // expires works the same as the maxAge
    expires: new Date("01 12 2021"),
    secure: true,
    httpOnly: true,
    sameSite: "lax",
  });
  res.send("Cookie have been saved successfully");
});

server.get("/api/getcookie", (req, res) => {
  //show the saved cookies
  console.log(req.cookies);
  res.send(req.cookies);
});
// SERVER-SIDE ROUTES ///////////////////////////////

server.get("/api/login", logIn);

server.post("/api/logout", logout);

server.get("/api/callback", callback);

server.get("/api/user/info", getUserInfo);

server.get("/api/user/:id/playlists", getUserPlaylists);

server.get("/api/playlist/:id", getPlaylistInfo);

server.get("/api/recenttracks", getRecentPlayedTracks);

server.get("/api/toptracks", getMyTopTracks);

// server.get("/api/user/uploadimage", uploadImage);

server.get("/api/artist/:id/tracks", getArtistTopTracks);

server.get("/api/artist/:id/info", getArtistInfo);

server.get("/api/artist/:id/albums", getArtistAlbums);

server.post("/api/playlist/create", createPlaylist);

server.get("/api/artist/:id/similar-artists", getSimilarArtists);

server.post(
  "/api/add-tracks-to-playlist/:playlistId/:tracksArray",
  addTracksToPlaylist
);

server.get("/api/album/:id", getAlbum);

server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});

// let sess;

function logIn(req, res) {
  let sess = req.session;
  console.log("SESS", sess);
  const state = generateRandomString(16);
  console.log("STATE", state);
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
  res.clearCookie("spotify_access_token");
  res.clearCookie("spotify_refresh_token");
  res.status(200).json("logged out!");
}

function callback(req, res) {
  let code = req.query.code;
  // Retrieve an access token.
  const spotifyApi = new SpotifyWebApi({
    clientId: clientId,
    clientSecret: clientSecret,
    redirectUri: redirectUri + "/api/callback",
  });
  spotifyApi
    .authorizationCodeGrant(code)
    .then(function (data) {
      console.log("The token expires in " + data.body["expires_in"]);
      console.log("The access token is " + data.body["access_token"]);
      console.log("The refresh token is " + data.body["refresh_token"]);

      res.cookie("spotify_access_token", data.body["access_token"], {
        maxAge: data.body["expires_in"],
        secure: true,
        httpOnly: true,
        sameSite: "lax",
      });
      res.cookie("spotify_refresh_token", data.body["refresh_token"], {
        maxAge: data.body["expires_in"],
        secure: true,
        httpOnly: true,
        sameSite: "lax",
      });
      const origin = process.env.VUE_APP_ROOT_CLIENT;
      console.log("ORIGIN", origin);

      res.redirect(origin);
    })
    .catch(function (err) {
      console.log("Something went wrong:", err);
    });
}

function getUserInfo(req, res) {
  let result = {};

  const spotifyApi = new SpotifyWebApi({
    accessToken: req.cookies["spotify_access_token"],
  });

  spotifyApi
    .getMe()
    .then(function (data) {
      result.userInfo = data.body;
      res.cookie("spotify_userId", result.userInfo.id, {
        maxAge: 5000,
        // expires works the same as the maxAge
        expires: new Date("01 12 2021"),
        secure: true,
        httpOnly: true,
        sameSite: "lax",
      });

      res.status(200).json(result);
    })
    .catch(function (err) {
      console.log("Something went wrong!", err);
    });
}

function getUserPlaylists(req, res) {
  const id = req.params.id;
  const spotifyApi = new SpotifyWebApi({
    accessToken: req.cookies["spotify_access_token"],
  });
  spotifyApi
    .getUserPlaylists(id)
    .then(function (data) {
      res.status(200).json(data.body);
    })
    .catch(function (err) {
      console.log("Something went wrong", err);
    });
}

function getPlaylistInfo(req, res) {
  const id = req.params.id;
  const spotifyApi = new SpotifyWebApi({
    accessToken: req.cookies["spotify_access_token"],
  });
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
  const spotifyApi = new SpotifyWebApi({
    accessToken: req.cookies["spotify_access_token"],
  });

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
  const spotifyApi = new SpotifyWebApi({
    accessToken: req.cookies["spotify_access_token"],
  });
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

function getArtistTopTracks(req, res) {
  // spotifyApi.scope = "user-read-recently-played";
  const id = req.params.id;
  // console.log("spotifyApi", spotifyApi);
  const spotifyApi = new SpotifyWebApi({
    accessToken: req.cookies["spotify_access_token"],
  });

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
  const spotifyApi = new SpotifyWebApi({
    accessToken: req.cookies["spotify_access_token"],
  });
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
  const spotifyApi = new SpotifyWebApi({
    accessToken: req.cookies["spotify_access_token"],
  });
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
  const spotifyApi = new SpotifyWebApi({
    accessToken: req.cookies["spotify_access_token"],
  });
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
  const spotifyApi = new SpotifyWebApi({
    accessToken: req.cookies["spotify_access_token"],
  });
  spotifyApi.getAlbum(id).then(
    function (data) {
      // console.log('Album information', data.body);
      res.status(200).json(data.body);
    },
    function (err) {
      console.error(err);
    }
  );

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

function addTracksToPlaylist(req, res) {
  const spotifyApi = new SpotifyWebApi({
    accessToken: req.cookies["spotify_access_token"],
  });
  let playlistId = req.params.playlistId;
  let tracksArray = JSON.parse(req.params.tracksArray);
  let convertedTracksArray = tracksArray.map((id) => "spotify:track:" + id);
  console.log("PLAYLISTID", playlistId);
  console.log("tracksArray", convertedTracksArray);
  spotifyApi.addTracksToPlaylist(playlistId, convertedTracksArray).then(
    function (data) {
      console.log("Added tracks to playlist!", data);
      res.status(200).json("Successfully added tracks to playlist!");
    },
    function (err) {
      console.log("Something went wrong!", err);
    }
  );
}

function getSimilarArtists(req, res) {
  const id = req.params.id;
  const spotifyApi = new SpotifyWebApi({
    accessToken: req.cookies["spotify_access_token"],
  });
  spotifyApi.getArtistRelatedArtists(id).then(
    function (data) {
      // console.log(data.body);
      res.status(200).json(data.body);
    },
    function (err) {
      console.log("Something went wrong!", err);
    }
  );
}
