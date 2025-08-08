import axios from "axios";


const API_URL = 'http://localhost:8080/user';

export async function authMe() {
    try {
        const response = await axios.get(API_URL + "/auth/me", {
            withCredentials: true, // ✅ JSESSIONID 쿠키 포함해서 요청
        });

        return response.data;

    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            console.warn("로그인되지 않은 사용자입니다.");
        } else {
            console.error("auth/me 요청 중 오류 발생:", error);
        }

        return null;
    }
}

