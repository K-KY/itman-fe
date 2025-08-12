import axios from 'axios'
import type {PageRequest} from "../interfaces/PageRequest.ts";

const BASE_URL = 'http://localhost:8080/';
const API_URL = BASE_URL + 'groups';

const empty = {
    totalPages: 0,
    content: []
};


interface Group {
    groupSeq: number;
    groupName: string;
    del: boolean;
    createdDate: Date;
    modifiedDate: Date;


}
async function getGroups(pageRequest: PageRequest): Promise<{
    totalPages: number;
    content: Group[]
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

interface GroupInfo {
    groupSeq: number;
    groupName: string;
    departs: number;
    employees: number;
    assets: number;
}

async function getGroupInfo(groupSeq:number) : Promise<GroupInfo> {
    try {
        const response = await axios.get(API_URL + '/info',
            {withCredentials: true, params: {groupSeq: groupSeq}},
        )
            .then(response => response.data);
        return response;
    } catch (error) {
        console.error(error);
        return {
            groupSeq: 0,
            groupName: "",
            departs: 0,
            employees: 0,
            assets: 0,
        }
    }
}

export type {Group}
export {getGroups, getGroupInfo}