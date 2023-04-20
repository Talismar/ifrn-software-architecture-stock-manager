import axios from "axios";
import { parseCookies } from "nookies";

export const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Token 27bbb1877f7714690750ab5f9836d29d4c0c2a18",
  },
});
