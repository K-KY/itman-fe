import axios from 'axios'
import type {Employee} from "../interfaces/Employee.ts";

const BASE_URL = 'http://localhost:8080/';
const API_URL = BASE_URL + 'employees';

function get() {
    return axios.get(API_URL);
}

function post(empInfo: Employee) {
    const body = {
        empName: empInfo.empName,
        departDto: empInfo.departDto,
        manager: empInfo.manager,
        del: empInfo.del,
    };
    return axios.post(API_URL, body);
}

export {get, post}

