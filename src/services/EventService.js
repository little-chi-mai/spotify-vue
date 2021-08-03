import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const apiClient = axios.create({
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
  login() {
    return apiClient.get("/api/login");
  },
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
    return apiClient.get("/api/recent-tracks");
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
  createPlaylist(name) {
    return apiClient.post(`/api/playlist/create/${name}`);
  },
  getAlbum(id) {
    return apiClient.get(`/api/album/${id}`);
  },
  getUserTopTracks() {
    return apiClient.get(`/api/my-top-tracks`);
  },
  getUserLikedTracks() {
    return apiClient.get(`/api/get-my-liked-tracks`);
  },
  addToLikedTracks(songId) {
    return apiClient.get(`/api/add-to-liked-tracks/${songId}`);
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
