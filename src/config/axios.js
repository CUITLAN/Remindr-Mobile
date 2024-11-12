import axios from 'axios';

const clienteAxios = axios.create({
    baseURL:'http://148.220.208.113:8080/',
});



export default clienteAxios;