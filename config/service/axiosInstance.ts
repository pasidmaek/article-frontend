import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1`,
  timeout: 1000,
  headers: {
    'Content-Type': "application/json",
  }
});

const authorization = localStorage.getItem('autho');
console.log(authorization)
axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${authorization}`;

// axiosInstance.interceptors.request.use((config) => {
//   try {

//     if (authorization) {
//       config.headers['Authorization'] = authorization;
//     }
//   } catch (error) {
//     console.error("Error parsing headers from localStorage:", error);
//   }

//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });

export default axiosInstance;
