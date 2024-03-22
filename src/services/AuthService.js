import axios from 'axios';
import CryptoJS from 'crypto-js';

const baseURL = 'https://mywedding-backend.onrender.com'; 
//const baseURL = 'http://localhost:8000';

export default {
  async register(email, password) {
    try{
        // Obtener el token CSRF
    //    const csrfResponse = await axios.get(`${baseURL}/get-token-csrf/`);
    //    const csrfToken = csrfResponse.data.csrf_token;
        const hPassword = CryptoJS.SHA256(password).toString();
        const headers = {
    //        'X-CSRFToken': csrfToken,
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + 'accessToken',
            'Accept': 'application/json'
        };

        console.log(headers);
        console.log('Email: ' + email);
        console.log('Password: ' + hPassword);  
        return axios.post(`${baseURL}/registro/`, { email, hPassword }, { headers });
    }catch(e){
      console.log('Error:', e);
      throw error; 
    }
  },
  /*,
  resetPassword(email) {
    return axios.post(`${baseURL}/reset-password`, { email });
  },
  login(credentials) {
    return axios.post(`${baseURL}/login`, credentials);
  }*/
  login(email, password) {
    try{
        // Obtener el token CSRF
    //    const csrfResponse = await axios.get(`${baseURL}/get-token-csrf/`);
    //    const csrfToken = csrfResponse.data.csrf_token;
        const hPassword = CryptoJS.SHA256(password).toString();
        const headers = {
    //        'X-CSRFToken': csrfToken,
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + 'accessToken',
            'Accept': 'application/json'
        };

        console.log(headers);
        console.log('Email: ' + email);
        console.log('Password: ' + hPassword);  
        return axios.post(`${baseURL}/login/`, { email, hPassword }, { headers });
    }catch(e){
      console.log('Error:', e);
      throw error; 
    }
  }
  
};