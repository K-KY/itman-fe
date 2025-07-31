import axios from 'axios'
import type {Depart} from "../interfaces/Depart.ts";
import type {PageRequest} from "../interfaces/PageRequest.ts";

const API_URL = 'http://localhost:8080/departs';


const empty = {
    totalPages: 0,
    content: []
};

async function getDeparts(pageRequest: PageRequest): Promise<{
    totalPages: number;
    content: Depart[]
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

async function getCountAll() {
    try {
        const response = await axios.get(API_URL + "/count", {});
        return response.data;
    } catch (error) {
        console.error(error);
        return 0;
    }
}

async function getCount(del: boolean) {
    try {
        const response = await axios.get(API_URL + `/count/${del}`, {});
        return response.data;
    } catch (error) {
        console.error(error);
        return 0;
    }
}

// POST: 새 항목 생성

async function postDepart(name: string, description: string) {
    try {
        const response = await axios.post(API_URL, {
            departName: name,
            description: description
        });
        return console.log('POST:', response.data);
    } catch (error) {
        return console.error(error);
    }
}

async function patchDepart(departSeq: number, name: string, description: string) {
    try {
        const response = await axios.patch(API_URL, {
            departSeq: departSeq,
            departName: name,
            description: description
        });
        return console.log('POST:', response.data);
    } catch (error) {
        return console.error(error);
    }
}

export {getDeparts, postDepart, patchDepart, getCount, getCountAll};
export type {Depart, PageRequest};


