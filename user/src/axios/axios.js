import axios from "axios";

async function getPublicIp() {
  try {
    const response = await axios.get('http://169.254.169.254/latest/meta-data/public-ipv4');
    return response.data.trim();  // Remove any leading/trailing whitespace
  } catch (error) {
    console.error('Error getting public IP:', error);
    return null;
  }
}
let ipAddress;
getPublicIp()
  .then(ip => {
    if (ip) {
      ipAddress = ip;
    } else {
      console.log('Public IP retrieval failed.');
    }
  });



const BASE_URL = `http://${ipAddress}:3002`

const axiosInstance=axios.create({
    baseURL:BASE_URL,
});

export default axiosInstance; 


