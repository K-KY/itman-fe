import axios from 'axios'

const API_URL = 'http://localhost:8080/departs';

interface DepartData {
    departSeq: string;
    departName: string;
    del: boolean;
    createdDate: Date;
    updatedDate: Date;
}

interface PageRequest {
    page: number;
    size: number;
}

function get(pageRequest: PageRequest): Promise<{
    totalPages: number;
    content: DepartData[] }> {
    return axios.get(API_URL, {
        params: {page: pageRequest.page, size: pageRequest.size},
        withCredentials: true
    })
        .then(response =>
            response.data)
        .catch(error => {
            console.error(error);
            return [];
        });
}

function getCountAll() {
    return axios.get(API_URL + "/count", {})
        .then(response => response.data)
        .catch(error => {
            console.error(error);
            return 0;
        });
}

function getCount(del: boolean) {
    return axios.get(API_URL + `/count/${del}`, {})
        .then(response => response.data)
        .catch(error => {
            console.error(error);
            return 0;
        })
}

// POST: 새 항목 생성

function post(name:string, description: string) {
    return axios.post(API_URL, {
        departName: name,
        description: description
    })
        .then(response => console.log('POST:', response.data))
        .catch(error => console.error(error));
}

export {get, post, getCount, getCountAll};
export type {DepartData, PageRequest};


