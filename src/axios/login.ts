import axios from "axios";


const API_URL = 'http://localhost:8080/login';

function login(userEmail: string, userPassword: string) {
    return axios.post(API_URL, {userEmail, userPassword},
        {withCredentials: true}
    ).then(response => {
        console.log(response.data);
    })

}

export default login;