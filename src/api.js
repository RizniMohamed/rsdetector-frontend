import axios from "axios";


const API = axios.create({
    // baseURL: 'http://localhost:8000/V1/',
    baseURL: 'https://rsdetector-backend.ngrok.app/V1/',
    
});


export const send_blob = async (send_data, token) => {
    try {
        const response = await API.post(
            `secure-process`,
            send_data, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (e) {
        throw e;
    }
};


export const get_token = async () => {
    try {
        const response = await API.get(`token`,{
            headers: { 'ngrok-skip-browser-warning': true}
        });
        return response.data;
    } catch (e) {
        throw e;
    }
};


export const register = async (send_data) => {
    try {
        const response = await API.post(`register`, send_data);
        return response.data;
    } catch (e) {
        throw e;
    }
};

export const login = async (send_data) => {
    try {
        const response = await API.post(`login`, send_data);
        return response.data;
    } catch (e) {
        throw e;
    }
};


