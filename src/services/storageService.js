export const saveAuthData = (token, xUserIdentity) => {
    localStorage.setItem("token", token);
    localStorage.setItem("xUserIdentity", xUserIdentity);
  };
  
  export const clearAuthData = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("xUserIdentity");
  };
  