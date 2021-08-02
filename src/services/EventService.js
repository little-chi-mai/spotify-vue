import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const apiClient = axios.create({
  baseURL: `http://localhost:${process.env.PORT || 3030}`,
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
  getUserPlaylists(id) {
    return apiClient.get(`/api/user/${id}/playlists`);
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
  getArtistTopTracks(id) {
    return apiClient.get(`/api/artist/${id}/tracks`);
  },
  getArtistInfo(id) {
    return apiClient.get(`/api/artist/${id}/info`);
  },
  getArtistAlbums(id) {
    return apiClient.get(`/api/artist/${id}/albums`);
  },
  createPlaylist() {
    return apiClient.post("/api/playlist/create");
  },
  getAlbum(id) {
    return apiClient.get(`/api/album/${id}`);
  },
  getTopTracks() {
    return apiClient.get(`/api/toptracks`);
  },
  addTracksToPlaylist(playlistId, tracksIdArray) {
    return apiClient.post(
      `/api/add-tracks-to-playlist/${playlistId}/${tracksIdArray}`
    );
  },
  getSimilarArtirsts(id) {
    return apiClient.get(`/api/artist/${id}/similar-artists`);
  },
};
