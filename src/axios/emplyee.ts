import axios from 'axios'
import type {Employee} from "../interfaces/Employee.ts";
import type {PageRequest} from "./depart.ts";
import {getCount, getCountAll} from "./util.ts";

const BASE_URL = 'http://localhost:8080/';
const API_URL = BASE_URL + 'employees';

const empty = {
    totalPages: 0,
    content: []
};

async function getEmployees(pageRequest: PageRequest, group:number|null): Promise<{
    totalPages: number;
    content: Employee[]
}> {
    try {
        const response = await axios.get(API_URL, {
            params: {page: pageRequest.page, size: pageRequest.size, groupSeq: group},
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return empty;
    }
}


async function postEmployees(empInfo: Employee) {
    try {
        const employee = await axios.post(API_URL, empInfo, {withCredentials: true});
        return employee.data;
    } catch (error) {
        console.error(error);
        return 0;
    }
}

async function count(del: boolean, group:number|null): Promise<number> {
    return await getCount(API_URL, del, group);
}

async function countAll(group:number|null): Promise<number> {
    return await getCountAll(API_URL, group);
}


export {getEmployees, postEmployees, count, countAll};

