import axios from "axios";

const BASE_URL = "https://coreapi.hectorai.live/api";


const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept-Language": "en-US",
  },
});

export const setAuthHeaders = (token, xUserIdentity) => {
  if (token) {
    apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;
  }
  if (xUserIdentity) {
    apiClient.defaults.headers["X-USER-IDENTITY"] = xUserIdentity;
  }
  apiClient.defaults.headers["Accept"] = "application/json, text/plain, */*"; 
};
export default apiClient;
