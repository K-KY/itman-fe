import axios from 'axios'
import type {PageRequest} from "../interfaces/PageRequest.ts";
import type {SimpleBoard} from "../interfaces/SimpleBoard.ts";

const API_URL = 'http://localhost:8080/jobs';


const empty = {
    totalPages: 0,
    content: []
};

async function getAllJobs(pageRequest: PageRequest, group:number|null): Promise<{
    totalPages: number;
    content: SimpleBoard[]
}> {
    try {
        const response = await axios.get(API_URL + `/all`, {
            params: {page: pageRequest.page, size: pageRequest.size, groupSeq: group},
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return empty;
    }
}

async function getJobs(pageRequest: PageRequest, group:number|null): Promise<{
    totalPages: number;
    content: SimpleBoard[]
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

async function getCountAll(del: boolean, group:number|null) {
    try {
        const response = await axios.get(API_URL + `/count/${del}`, {
            params: {groupSeq: group},
            withCredentials: true});
        return response.data;
    } catch (error) {
        console.error(error);
        return 0;
    }
}

async function getCount(group:number|null) {
    try {
        const response = await axios.get(API_URL + "/count", {
            params: {groupSeq: group},
            withCredentials: true});
        return response.data;
    } catch (error) {
        console.error(error);
        return 0;
    }
}

// POST: 새 항목 생성
async function postJob(name: string, description: string, group:number) {
    try {
        const response = await axios.post(API_URL, {
            name: name,
            description: description,
            groupSeq: group,
        }, {withCredentials: true});
        return response.data;
    } catch (error) {
        return console.error(error);
    }
}

async function patchJob(seq: number, name: string, description: string,  group:number|null): Promise<SimpleBoard|void> {
    try {
        const response = await axios.patch(API_URL, {
            seq: seq,
            name: name,
            description: description,
            groupSeq: group,
        }, {withCredentials: true});
         console.log('PATCH:', response.data);
        return response.data;
    } catch (error) {
        return console.error(error);
    }
}

async function patchEnable(seq: number, groupSeq:number, enabled: boolean, del:boolean) {
    try {
        const response = await axios.patch(API_URL+`/enable`, {
            seq: seq,
            groupSeq:groupSeq,
            enabled: enabled,
            del: del
        },  {withCredentials: true});
        return response.data;
    } catch (error) {
        return console.error(error);
    }
}

export {getJobs, getAllJobs, patchJob, postJob, getCount, patchEnable, getCountAll};
export type {PageRequest};


