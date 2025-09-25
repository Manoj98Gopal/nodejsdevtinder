import axios from "axios";

const BASE_API = "http://localhost:7777";

const api = axios.create({
  baseURL: BASE_API,
  headers: {
    "Content-type": "application/json"
  },
  withCredentials: true
});

export default api;
