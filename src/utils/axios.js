import axios from 'axios';

const axiosIns = axios.create({
    timeout: 5000,
    headers: { 
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
    },
    responseType: 'json'
})

export default axiosIns