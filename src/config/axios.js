import axios from "axios";

const server = "https://duet.mangotech-api.com//api";
export const baseUrl = "https://duet.mangotech-api.com/";

const instance = axios.create({
  baseURL: server,
});

instance.interceptors.request.use((request) => {
  const token = localStorage.getItem("token");
  request.headers = {
    Accept: "application/json, text/plain, */*",
    // Authorization: `Bearer ${token}`,
    deviceuid: "TTxTT",
  }
  return request;
});

instance.interceptors.response.use((response) => {
  if (response) {
    return response;
  }
}, function (error) {
  return Promise.reject(error)
})

export default instance;