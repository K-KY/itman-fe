import type {Asset} from "../interfaces/Asset.ts";

import axios from 'axios'
import type {PageRequest} from "./depart.ts";
import {getCount, getCountAll} from "./util.ts";

const BASE_URL = 'http://localhost:8080/';
const API_URL = BASE_URL + 'assets';

const empty = {
    totalPages: 0,
    content: []
};

async function getAssets(pageRequest: PageRequest, group: number | null): Promise<{
    totalPages: number;
    content: Asset[]
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

async function getAssetsDetail(assetSeq: number, group: number | null): Promise<Asset>{
    try {
        const response = await axios.get(API_URL + '/detail', {
            params: {assetSeq, groupSeq: group},
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


async function postAsset(assetInfo: Asset) {
    try {
        const asset = await axios.post(API_URL, assetInfo, {withCredentials: true});
        console.log(asset);
        return asset.data;
    } catch (error) {
        console.error(error);
        return 0;
    }
}

async function count(del: boolean, group: number | null): Promise<number> {
    return await getCount(API_URL, del, group);
}

async function countAll(group: number | null): Promise<number> {
    return await getCountAll(API_URL, group);
}


export {getAssets, getAssetsDetail, postAsset, count, countAll};

