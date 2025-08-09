import axios from "axios";

const API_URL = 'http://localhost:8080/signup';

function register() {
}

async function verify(token: string) {
    try {
        const response = await axios.get(API_URL, { params: { token } });
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error };
    }
}

export { register, verify };