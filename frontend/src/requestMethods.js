import axios from "axios";
const LocalBASE_URL="http://localhost:8000/api/";
const BASE_URL = "https://pictnotes-backend.onrender.com/api/";  

export const pf = "https://pictnotes-backend.onrender.com/images";  

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
});
