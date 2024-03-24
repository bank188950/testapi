import axios, { AxiosInstance } from "axios";

const apiService: AxiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 60 * 5 * 1000,
  validateStatus: (status) => {
    return status >= 200 && status <= 401;
  },
});

apiService.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiService.interceptors.response.use(
  (response) => {
    if (response.status === 400) {
      console.error("Bad Request");
    }

    if (response.status === 401) {
      console.error("Unauthorized");
    }

    return response;
  },
  (error) => {
    console.error("API Request Error", error);
    return Promise.reject(error);
  }
);

export default apiService;
