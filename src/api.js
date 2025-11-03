import axios from "axios";

const API_URL = "https://sbc-api.zupees.com/"; // your backend endpoint
const API_TOKEN = "wd0bms/F0WQsngRBq-nZuJ-jT5LCR=ljRqo=rtnVPsQLkMxunkYCQZlqNp2JGBcm"; // replace with actual token or env var

// Create Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to attach x-api-token
api.interceptors.request.use((config) => {
  config.headers["x-api-token"] = API_TOKEN;
  return config;
});

export default api;

