import { loginApi } from "../api/authApi";
import { setAuthHeaders } from "../api/baseApi";
import { saveAuthData, clearAuthData } from "./storageService";

export const login = async (email, password) => {
  const response = await loginApi(email, password);
  const { token, xUserIdentity } = response;

  saveAuthData(token, xUserIdentity);
  setAuthHeaders(token, xUserIdentity);

  return true;
};

export const logout = () => {
  clearAuthData();
  setAuthHeaders(null, null);
};

export const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};
