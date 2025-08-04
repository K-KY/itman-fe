import axios from 'axios'
import type {PageRequest} from "../interfaces/PageRequest.ts";
import type {SimpleBoard} from "../interfaces/SimpleBoard.ts";

const API_URL = 'http://localhost:8080/jobs';


const empty = {
    totalPages: 0,
    content: []
};

async function getJobs(pageRequest: PageRequest): Promise<{
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

async function getCountAll() {
    try {
        const response = await axios.get(API_URL + "/count", {withCredentials: true});
        return response.data;
    } catch (error) {
        console.error(error);
        return 0;
    }
}

async function getCount(del: boolean) {
    try {
        const response = await axios.get(API_URL + `/count/${del}`, {withCredentials: true});
        return response.data;
    } catch (error) {
        console.error(error);
        return 0;
    }
}

// POST: 새 항목 생성

async function postJob(name: string, description: string) {
    try {
        const response = await axios.post(API_URL, {
            name: name,
            description: description
        }, {withCredentials: true});
        return console.log('POST:', response.data);
    } catch (error) {
        return console.error(error);
    }
}

async function patchJob(seq: number, name: string, description: string) {
    try {
        const response = await axios.patch(API_URL, {
            seq: seq,
            name: name,
            description: description
        }, {withCredentials: true});
        return console.log('POST:', response.data);
    } catch (error) {
        return console.error(error);
    }
}

export {getJobs, patchJob, postJob, getCount, getCountAll};
export type {PageRequest};


