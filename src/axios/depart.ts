import axios from 'axios'
import type {PageRequest} from "../interfaces/PageRequest.ts";
import type {SimpleBoard} from "../interfaces/SimpleBoard.ts";

const API_URL = 'http://localhost:8080/departs';


const empty = {
    totalPages: 0,
    content: []
};

async function getAllDeparts(pageRequest: PageRequest, group:number): Promise<{
    totalPages: number;
    content: SimpleBoard[]
}> {
    try {
        const response = await axios.get(API_URL + `/all`, {
            params: {page: pageRequest.page, size: pageRequest.size,  groupSeq: group},
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return empty;
    }
}

async function getDeparts(pageRequest: PageRequest): Promise<{
    totalPages: number;
    content: SimpleBoard[]
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

async function getCountAll(del: boolean) {
    try {
        const response = await axios.get(API_URL + `/count/${del}`, {withCredentials: true});
        return response.data;
    } catch (error) {
        console.error(error);
        return 0;
    }
}

async function getCount() {
    try {
        const response = await axios.get(API_URL + `/count`, {withCredentials: true});
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
            name: name,
            description: description
        }, {withCredentials: true});
        console.log('POST:', response.data)
        return response.data;
    } catch (error) {
        return console.error(error);
    }
}

async function patchDepart(seq: number, name: string, description: string) {
    try {
        const response = await axios.patch(API_URL, {
            seq: seq,
            name: name,
            description: description
        }, {withCredentials: true});
        return response.data;
    } catch (error) {
        return console.error(error);
    }
}

async function patchEnable(seq: number, enable: boolean) {
    try {
        const response = await axios.patch(API_URL+`/enable`, {
            seq: seq,
            enabled: enable
        },  {withCredentials: true});
        return response.data;
    } catch (error) {
        return console.error(error);
    }
}

export {getAllDeparts, getDeparts, postDepart, patchDepart, patchEnable, getCount, getCountAll};
export type {PageRequest};


