import axios from "axios";

export const AxiosInstance = axios.create({
  baseURL: "https://api.github.com/",
  headers: { Accept: "application/vnd.github.v3+json" }
});
