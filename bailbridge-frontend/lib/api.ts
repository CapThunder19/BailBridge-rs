import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  register: async (username: string, email: string, password: string, role: string = 'user') => {
    try {
      const response = await apiClient.post('/register', {
        username,
        email,
        password,
        role,
      });

       return response.data;
} 
    
    catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data || error.message || 'Registration failed');
      }

      throw error;
    }
  },




  login: async (email: string, password: string) => {
    try {
      const response = await apiClient.post('/login', {
        email,
        password,
      });


      return response.data;


    }
    
    catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data || error.message || 'Login failed');
      }

      throw error;
    }
  },
};


export const setAuthToken = (token: string | null) => {
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } 
  
  else {
    delete apiClient.defaults.headers.common['Authorization'];
  }
};
