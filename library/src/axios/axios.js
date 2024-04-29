import axios from "axios";

let publicIP;

axios.get('http://checkip.amazonaws.com')
  .then(response => {
    publicIP = response.data.trim();
    console.log(`Public IP: ${publicIP}`);
  })
  .catch(error => {
    console.error(`Problem with request: ${error.message}`);
  });
  

const BASE_URL = `http://${publicIP}:3002`

const axiosInstance=axios.create({
    baseURL:BASE_URL,
});

export default axiosInstance; 


