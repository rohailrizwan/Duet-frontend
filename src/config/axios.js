import axios from "axios";

const server = "http://localhost:8000/api";
export const baseUrl = "http://localhost:8000/";
export const imagebaseUrl = "https://duet.mangotech-api.com/uploads";

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
  const persistRoot = localStorage.getItem("persist:root");
  let token;
  if (persistRoot) {
    const parsedRoot = JSON.parse(persistRoot);
    const authString = parsedRoot.auth;
    if (authString) {
      const authData = JSON.parse(authString);
      token = authData.token;

      // console.log("Token:", token);
    }
  }

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
