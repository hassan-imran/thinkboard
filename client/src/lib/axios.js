import axios from "axios";

const api = axios.create({
    // baseURL: "http://localhost:5001/api", // For development
    baseURL: "https://thinkboard-api.vercel.app/api"
});

export default api;