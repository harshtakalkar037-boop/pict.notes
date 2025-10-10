import axios from "axios";
const LocalBASE_URL="http://localhost:8000/api/";
const BASE_URL = "https://pict-notes.onrender.com/api/";  

export const pf = "https://pict-notes.onrender.com/";  

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
});

