import apiClient from './baseApi';

export const loginApi = async (email, password) => {
  const body = {
    email,
    password,
    isLoggedInHere: 0,
  };

  try {
    const response = await apiClient.post('/auth/login', body);
    return response.data; 
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};
