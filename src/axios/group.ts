import axios from 'axios';
import type { PageRequest } from "../interfaces/PageRequest.ts";

const BASE_URL = 'http://localhost:8080/';
const API_URL = BASE_URL + 'groups';

const empty = {
    totalPages: 0,
    content: []
};

interface Group {
    groupSeq: number | null;
    groupName: string;
    del: boolean;
    createdDate: Date | null;
    modifiedDate: Date | null;
}

interface GroupInfo {
    groupSeq: number;
    groupName: string;
    departs: number;
    employees: number;
    assets: number;
}

// 그룹 목록 조회
async function getGroups(pageRequest: PageRequest): Promise<{
    totalPages: number;
    content: Group[]
}> {
    try {
        const response = await axios.get(API_URL, {
            params: {
                page: pageRequest.page, // 백엔드가 0부터 시작하는 경우를 가정하여 -1
                size: pageRequest.size
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch groups:', error);
        return empty;
    }
}

// 그룹 생성 (수정됨 - 요청 구조 개선)
async function postGroup(group: Omit<Group, 'groupSeq' | 'createdDate' | 'modifiedDate'>): Promise<Group> {
    try {
        const response = await axios.post(API_URL, {
            groupName: group.groupName,
            del: group.del || false
        }, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to create group:', error);
        throw error; // 에러를 다시 던져서 호출하는 쪽에서 처리할 수 있도록
    }
}

// 그룹 정보 상세 조회
async function getGroupInfo(groupSeq: number): Promise<GroupInfo> {
    try {
        const response = await axios.get(`${API_URL}/info`, {
            params: { groupSeq },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch group info:', error);
        return {
            groupSeq: 0,
            groupName: "",
            departs: 0,
            employees: 0,
            assets: 0,
        };
    }
}

// 그룹 수정
async function putGroup(group: Group): Promise<Group> {
    try {
        const response = await axios.put(`${API_URL}/${group.groupSeq}`, {
            groupName: group.groupName,
            del: group.del
        }, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to update group:', error);
        throw error;
    }
}

// 그룹 삭제
async function deleteGroup(groupSeq: number): Promise<boolean> {
    try {
        await axios.delete(`${API_URL}/${groupSeq}`, {
            withCredentials: true
        });
        return true;
    } catch (error) {
        console.error('Failed to delete group:', error);
        return false;
    }
}

// 그룹 검색
async function searchGroups(keyword: string, pageRequest: PageRequest): Promise<{
    totalPages: number;
    content: Group[]
}> {
    try {
        const response = await axios.get(`${API_URL}/search`, {
            params: {
                keyword,
                page: pageRequest.page - 1,
                size: pageRequest.size
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error('Failed to search groups:', error);
        return empty;
    }
}

export type { Group, GroupInfo };
export {
    getGroups,
    postGroup,
    getGroupInfo,
    putGroup,
    deleteGroup,
    searchGroups
};