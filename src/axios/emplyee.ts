import axios from 'axios'
import type {Employee} from "../interfaces/Employee.ts";
import type {PageRequest} from "./depart.ts";
import {getCount, getCountAll} from "./util.ts";

const BASE_URL = 'http://localhost:8080/';
const API_URL = BASE_URL + 'employees';

const empty = {
    totalPages : 0,
    content : []
};

async function getEmployees(pageRequest: PageRequest): Promise<{
    totalPages: number;
    content: Employee[]
}> {
    try {
        const response = await axios.get(API_URL, {
            params: {page: pageRequest.page, size: pageRequest.size},
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return empty;
    }
}


function postEmployees(empInfo: Employee) {
    return axios.post(API_URL, empInfo,{withCredentials: true});
}

async function count(del: boolean) {
    return await getCount(API_URL, del);
}

async function countAll() {
    return await getCountAll(API_URL);
}


export {getEmployees, postEmployees,  count, countAll};

