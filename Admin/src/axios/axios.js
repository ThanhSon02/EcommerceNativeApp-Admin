import axios from "axios";
const axiosInstance = axios.create({
    baseURL: "http://localhost:3001/api/v1",
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
    },
});

export default axiosInstance;
