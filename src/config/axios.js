import axios from "axios";


const server = "https://duet.mangotech-api.com/api";
export const baseUrl = "https://duet.mangotech-api.com/";

// Default instance (without token)
const instance = axios.create({
  baseURL: server,
});

instance.interceptors.request.use((request) => {
  request.headers = {
    ...request.headers, // preserve existing headers
    Accept: "application/json, text/plain, */*",
    deviceuid: "TTxTT",
  };
  return request;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

// Auth instance (with token)
const authInstance = axios.create({
  baseURL: server,
});

authInstance.interceptors.request.use((request) => {
  const token = localStorage.getItem("token");
  request.headers = {
    ...request.headers,
    Accept: "application/json, text/plain, */*",
    Authorization: `Bearer ${token}`,
    deviceuid: "TTxTT",
  };
  return request;
});

authInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export { instance, authInstance };
