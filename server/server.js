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
const stateKey = "spotify_auth_state";

server
  .use(express.static(path.join(__dirname, "../dist")))
  .use(cors())
  .use(cookieParser());

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

// SERVER-SIDE ROUTES ///////////////////////////////

server.get("/api/login", logIn);

server.post("/api/logout", logout);

server.get("/api/callback", callback);

server.get("/api/new-release", getNewRelease);

server.get("/api/user/info", getUserInfo);

server.get("/api/user/:id/playlists", getUserPlaylists);

server.get("/api/playlist/:id", getPlaylistInfo);

server.get("/api/recent-tracks", getRecentPlayedTracks);

server.get("/api/my-top-tracks", getMyTopTracks);
server.get("/api/my-top-artists", getMyTopArtists);

server.get("/api/get-my-liked-tracks", getMyLikedTracks);

server.get("/api/add-to-liked-tracks/:id", addToLikedTrack);

// server.get("/api/user/uploadimage", uploadImage);

server.get("/api/artist/:id/tracks", getArtistTopTracks);

server.get("/api/artist/:id/info", getArtistInfo);

server.get("/api/artist/:id/albums", getArtistAlbums);

server.post("/api/playlist/create/:name", createPlaylist);

server.get("/api/artist/:id/similar-artists", getSimilarArtists);

// SEARCH FUNCTIONS
server.get("/api/search/tracks/:searchTerm", searchTracks);
server.get("/api/search/playlists/:searchTerm", searchPlaylists);

server.post(
  "/api/add-tracks-to-playlist/:playlistId/:tracksArray",
  addTracksToPlaylist
);

server.get("/api/album/:id", getAlbum);
server.get("/*", function (req, res) {
  const origin = process.env.VUE_APP_ROOT_CLIENT;
  // res.send("what???", 404);
  res.redirect(origin);
});

server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});

function logIn(req, res) {
  let sess = req.session;
  console.log("SESS", sess);
  const state = generateRandomString(16);
  console.log("STATE", state);
  res.cookie(stateKey, state, { path: "/" });

  // this app requests authorization
  const scope =
    "user-read-private user-read-email user-read-recently-played user-top-read playlist-modify-public playlist-modify-private user-library-modify user-library-read";
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
        maxAge: 3600000,
        secure: true,
        httpOnly: true,
        sameSite: "lax",
      });
      res.cookie("spotify_refresh_token", data.body["refresh_token"], {
        maxAge: 3600000,
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
        res.status(200).json(data.body.items);
      },
      function (err) {
        console.log("Something went wrong!", err.body);
      }
    );
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
async function getMyTopArtists(req, res) {
  const spotifyApi = new SpotifyWebApi({
    accessToken: req.cookies["spotify_access_token"],
  });

  let topArtists = await spotifyApi.getMyTopArtists();
  const getTopTracks = (topArtists) => {
    const promises = topArtists.body.items.map(async (artist) => {
      let topTracksInfo = await spotifyApi.getArtistTopTracks(artist.id, "AU");
      return {
        ...artist,
        topTracks: topTracksInfo.body.tracks,
      };
    });
    // return promises
    return Promise.all(promises);
  };
  let topArtistsFullInfo = await getTopTracks(topArtists);
  res.status(200).json(topArtistsFullInfo);
}

function getMyLikedTracks(req, res) {
  const spotifyApi = new SpotifyWebApi({
    accessToken: req.cookies["spotify_access_token"],
  });
  spotifyApi
    .getMySavedTracks({
      limit: 50,
      offset: 0,
    })
    .then(
      function (data) {
        res.status(200).json(data.body);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
}

function getArtistTopTracks(req, res) {
  const id = req.params.id;

  const spotifyApi = new SpotifyWebApi({
    accessToken: req.cookies["spotify_access_token"],
  });

  spotifyApi.getArtistTopTracks(id, "AU").then(
    function (data) {
      res.status(200).json(data.body.tracks);
    },
    function (err) {
      console.log("Something went wrong!", err);
    }
  );
}

function createPlaylist(req, res) {
  const name = req.params.name;
  const spotifyApi = new SpotifyWebApi({
    accessToken: req.cookies["spotify_access_token"],
  });
  spotifyApi
    .createPlaylist(name, {
      description: `Playlist ${name} was created with Vue Spotify`,
      public: true,
    })
    .then(
      function (data) {
        res.status(200).json(data.body);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
}

async function getArtistInfo(req, res) {
  const id = req.params.id;
  const spotifyApi = new SpotifyWebApi({
    accessToken: req.cookies["spotify_access_token"],
  });
  let artistInfo = await spotifyApi.getArtist(id);

  let mainArtistTopTracks = await spotifyApi.getArtistTopTracks(
    artistInfo.body.id,
    "AU"
  );

  let artistFullInfo = {
    ...artistInfo.body,
    topTracks: mainArtistTopTracks.body.tracks,
  };

  let relatedArtists = await spotifyApi.getArtistRelatedArtists(id);

  // TOO EXPENSIVE
  // const getTopTracks = (relatedArtists) => {
  //   const promises = relatedArtists.body.artists.map(async (artist) => {
  //     let topTracksInfo = await spotifyApi.getArtistTopTracks(artist.id, "AU");
  //     return {
  //       ...artist,
  //       topTracks: topTracksInfo.body.tracks,
  //     };
  //   });
  //   // return promises
  //   return Promise.all(promises);
  // };
  // let relatedArtistsFullInfo = await getTopTracks(relatedArtists);

  res.status(200).json({
    artistInfo: artistFullInfo,
    relatedArtists: relatedArtists.body.artists,
  });
}

async function getArtistAlbums(req, res) {
  const id = req.params.id;
  const spotifyApi = new SpotifyWebApi({
    accessToken: req.cookies["spotify_access_token"],
  });
  let albums = await spotifyApi.getArtistAlbums(id);

  const getAlbumInfo = (albums) => {
    const promises = albums.body.items.map(async (album) => {
      let albumsInfo = await spotifyApi.getAlbum(album.id, "AU");
      return albumsInfo.body;
    });
    // return promises
    return Promise.all(promises);
  };

  let albumsArray = await getAlbumInfo(albums);

  let albumsOnly = [];
  albumsArray.map((album) => {
    if (album.album_type === "album") {
      albumsOnly.push(album);
    }
  });
  res.status(200).json(albumsOnly);
}

async function getAlbum(req, res) {
  const id = req.params.id;
  const spotifyApi = new SpotifyWebApi({
    accessToken: req.cookies["spotify_access_token"],
  });

  let albumInfo = await spotifyApi.getAlbum(id);

  res.status(200).json(albumInfo.body);
}

function addTracksToPlaylist(req, res) {
  const spotifyApi = new SpotifyWebApi({
    accessToken: req.cookies["spotify_access_token"],
  });
  let playlistId = req.params.playlistId;
  let tracksArray = JSON.parse(req.params.tracksArray);
  let convertedTracksArray = tracksArray.map((id) => "spotify:track:" + id);

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

function addToLikedTrack(req, res) {
  const songId = req.params.id;
  const spotifyApi = new SpotifyWebApi({
    accessToken: req.cookies["spotify_access_token"],
  });
  spotifyApi.containsMySavedTracks([songId]).then(
    function (data) {
      // An array is returned, where the first element corresponds to the first track ID in the query
      var trackIsInYourMusic = data.body[0];

      if (trackIsInYourMusic) {
        console.log("Track was found your music library!");
        res.status(200).json({
          added: false,
          message: "Track was found your music library!",
        });
      } else {
        spotifyApi.addToMySavedTracks([songId]).then(
          function (data) {
            console.log(data.body);
            res.status(200).json({ added: true, message: "Track added!" });
          },
          function (err) {
            console.log("Something went wrong!", err);
          }
        );
      }
    },
    function (err) {
      console.log("Something went wrong!", err);
    }
  );
}

function getNewRelease(req, res) {
  const spotifyApi = new SpotifyWebApi({
    accessToken: req.cookies["spotify_access_token"],
  });
  spotifyApi.getNewReleases({ limit: 50, offset: 0, country: "AU" }).then(
    function (data) {
      res.status(200).json(data.body);
    },
    function (err) {
      console.log("Something went wrong!", err);
      res.status(503).json(false);
    }
  );
}

function searchTracks(req, res) {
  const searchTerm = req.params.searchTerm;
  // const artist = req.params.artist;
  const spotifyApi = new SpotifyWebApi({
    accessToken: req.cookies["spotify_access_token"],
  });
  spotifyApi.searchTracks(searchTerm).then(
    function (data) {
      console.log(
        'Search tracks by "Alright" in the track name and "Kendrick Lamar" in the artist name',
        data.body
      );
      res.status(200).json(data.body);
    },
    function (err) {
      console.log("Something went wrong!", err);
    }
  );
}

async function searchPlaylists(req, res) {
  const searchTerm = req.params.searchTerm;
  // const artist = req.params.artist;
  const spotifyApi = new SpotifyWebApi({
    accessToken: req.cookies["spotify_access_token"],
  });
  let resultInfo = await spotifyApi.searchPlaylists(searchTerm);

  res.status(200).json(resultInfo.body);
}
