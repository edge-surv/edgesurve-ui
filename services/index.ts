import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:8000/api",
});

export const BASE_URL = "http://localhost:8000/api";
