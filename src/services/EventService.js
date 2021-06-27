import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const apiClient = axios.create({
  baseURL: "http://localhost:3030",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// const adobeAPI = axios.create({
//   baseURL: "https://image.adobe.io/sensei/cutout ",
//   headers: {
//     Authorization: "Bearer",
//   },
// });

export default {
  getUserInfo() {
    return apiClient.get("/api/user/info");
  },
  logout() {
    return apiClient.post("/api/logout");
  },
  getUserPlaylists() {
    return apiClient.get("/api/user/playlists");
  },
  getPlaylistInfo(id) {
    return apiClient.get(`/api/playlist/${id}`);
  },
  getRecentPlayedTracks() {
    return apiClient.get("/api/recenttracks");
  },
  uploadImage() {
    return apiClient.get("/api/user/uploadimage");
  },
  getArtistTracks(id) {
    return apiClient.get(`/api/tracks/artist/${id}`);
  },
  createPlaylist() {
    return apiClient.post('/api/playlist/create')
  }
};
