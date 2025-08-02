import axios from "axios";


const API_URL = 'http://localhost:8080/login';

function login(userId:string, userPassword:string) {
    return axios.post(API_URL, {userId, userPassword},
        {withCredentials: true}
).then(response => {
        console.log(response.data);})

}

export default login;