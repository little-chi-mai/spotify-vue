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

export default {
  getUserInfo() {
    return apiClient.get("/api/user/info");
  },
  getUserPlaylists() {
    return apiClient.get("/api/user/playlists")
  },
  getPlaylistInfo(id) {
    return apiClient.get(`/api/playlist/${id}`);
  }

  // getEvent(id) {
  //   return apiClient.get("/events/" + id);
  // },
};
