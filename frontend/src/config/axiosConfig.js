import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://coursegeneratorai.onrender.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

//Automatically add token to every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
