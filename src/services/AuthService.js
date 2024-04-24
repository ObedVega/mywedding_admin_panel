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
  async login(email, password) {
    try{
        // Obtener el token CSRF
    //    const csrfResponse = await axios.get(`${baseURL}/get-token-csrf/`);
    //    const csrfToken = csrfResponse.data.csrf_token;
        const csrfToken = 'cf74a608e33face59b6015830ecf5cb12d49097b8c3a4c59de5d77b4c08cdbe7';
        const hPassword = CryptoJS.SHA256(password).toString();
        const headers = {
            'X-CSRFToken': csrfToken,
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + 'accessToken',
            'Accept': 'application/json'
        };

        console.log(headers);
        console.log('Email: ' + email);
        return axios.post(`${baseURL}/login/`, { email, hPassword }, { headers });
    }catch(e){
      console.log('Error:', e);
      throw error; 
    }
  },
  async getUserInfo(email) {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        throw new Error('No hay token de sesión.');
      }
      
      const response = await axios.get(`${baseURL}/getInfo/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
    //  console.log(response.data);
      
      const mockUserData = {
        id: 1,
        name: 'obed',
        email: 'vega.obed@gmail.com',
        // Otros campos de información del usuario...
      };
      return response.data;
  //  return mockUserData;
    } catch (error) {
      throw new Error('Error al obtener la información del usuario:', error);
    }
  },
  async actualizaDatos(email, nombre, apellido, evento, tipo) {
    console.log('email: ' + email + ', nombre: ' + nombre + ', apellido: ' + apellido + ', evento: ' + evento + ', tipo: ' + tipo);
    try{
        // Obtener el token CSRF
    //    const csrfResponse = await axios.get(`${baseURL}/get-token-csrf/`);
    //    const csrfToken = csrfResponse.data.csrf_token;
    //    const hPassword = CryptoJS.SHA256(password).toString();
        const headers = {
    //        'X-CSRFToken': csrfToken,
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + 'accessToken',
            'Accept': 'application/json'
        };

        console.log(headers);
       
        return axios.put(`${baseURL}/getInfo/`, { email, nombre, apellido, evento, tipo }, { headers });
    }catch(e){
      console.log('Error:', e);
      throw error; 
    }
  },
  async actualizaDatosNovia(id, email, nombreNovio, nombreNovia, apellidoNovia) {
    try{
        // Obtener el token CSRF
    //    const csrfResponse = await axios.get(`${baseURL}/get-token-csrf/`);
    //    const csrfToken = csrfResponse.data.csrf_token;
    //    const hPassword = CryptoJS.SHA256(password).toString();
        const headers = {
    //        'X-CSRFToken': csrfToken,
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + 'accessToken',
            'Accept': 'application/json'
        };

        console.log(headers);
       
        return axios.put(`${baseURL}/getInfo/`, { id, email, nombreNovio, nombreNovia, apellidoNovia }, { headers });
    }catch(e){
      console.log('Error:', e);
      throw error; 
    }
  },
  async actualizaDatosEvento(id, email, diaEvento, timeEvento, direccionEvento, palabrasInvitados) {
    try{
        // Obtener el token CSRF
    //    const csrfResponse = await axios.get(`${baseURL}/get-token-csrf/`);
    //    const csrfToken = csrfResponse.data.csrf_token;
    //    const hPassword = CryptoJS.SHA256(password).toString();
        const headers = {
    //        'X-CSRFToken': csrfToken,
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + 'accessToken',
            'Accept': 'application/json'
        };

        console.log(headers);
       
        return axios.put(`${baseURL}/getInfo/`, { id, email, diaEvento, timeEvento, direccionEvento, palabrasInvitados }, { headers });
    }catch(e){
      console.log('Error:', e);
      throw error; 
    }
  },
  async eligueDiseno(id, email, template) {
    try{
        // Obtener el token CSRF
    //    const csrfResponse = await axios.get(`${baseURL}/get-token-csrf/`);
    //    const csrfToken = csrfResponse.data.csrf_token;
    //    const hPassword = CryptoJS.SHA256(password).toString();
        const headers = {
    //        'X-CSRFToken': csrfToken,
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + 'accessToken',
            'Accept': 'application/json'
        };

        console.log(headers);
       
        return axios.put(`${baseURL}/getInfo/`, { id, email, template }, { headers });
    }catch(e){
      console.log('Error:', e);
      throw error; 
    }
  }
};