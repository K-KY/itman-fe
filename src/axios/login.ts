import axios from "axios";


const BASE_URL = 'http://localhost:8080/';
const API_URL = 'http://localhost:8080/login';

function login(userEmail: string, userPassword: string) {
    return axios.post(API_URL, {userEmail, userPassword},
        {withCredentials: true}
    ).then(response => {
        console.log(response.data);
    })

}

function logout() {
    return axios.post(
        `${BASE_URL}user/logout`,
        {},
        {
            withCredentials: true,
            headers: {
                "X-Requested-With": "XMLHttpRequest",
            }
        }
    ).then(() => console.log("Logged Out!"));
}

export default login;
export {logout};