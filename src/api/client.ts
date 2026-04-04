import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.example.com', // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optionally, you can add interceptors for request/response handling
apiClient.interceptors.request.use((config) => {
  // Add any request modifications here
  return config;
}, (error) => {
  return Promise.reject(error);
});

apiClient.interceptors.response.use((response) => {
  // Handle response data here
  return response;
}, (error) => {
  return Promise.reject(error);
});

export default apiClient;