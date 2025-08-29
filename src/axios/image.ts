import axios from 'axios'

const API_URL = 'http://localhost:8080/images';


export async function uploadImage(file: File) {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post(API_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true
        });

        return response.data;
    } catch (error) {
        console.error('이미지 업로드 실패:', error);
        throw error;
    }
}

export async function getImages(imageUrl: string | null) {
    try {
        if (imageUrl === null || imageUrl === '') {
            return null;
        }
        const response = await axios.get(API_URL+`/${imageUrl}`,
            {withCredentials: true},
        )
            .then(response => response.data);
        return response;
    } catch (error) {
        console.error(error);
    }
}

