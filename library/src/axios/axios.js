import axios from "axios";

const publicIP= '52.54.112.54' // elastic IP of development server

const BASE_URL = `http://${publicIP}:3002`

const axiosInstance=axios.create({
    baseURL:BASE_URL,
});

export default axiosInstance; 


