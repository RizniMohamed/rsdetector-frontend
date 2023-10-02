import axios from "axios";

const API = axios.create({ baseURL: 'https://rsdetector.onrender.com/V1/', });
// const API = axios.create({ baseURL: 'http://127.0.0.1:8000/V1/', });

export const send_blob = async (send_data) => {
    try {
        const response = await API.post(`process`, send_data);
        return response.data;
    } catch (e) {
        throw e;
    }
};