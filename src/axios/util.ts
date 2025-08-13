import axios from "axios";

async function getCountAll(url: string, group: number|null): Promise<number> {
    try {
        const response = await axios.get(url + "/count", {
            params: {groupSeq: group},
            withCredentials: true
        });
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
        return 0;
    }
}

async function getCount(url: string, del: boolean, group: number|null): Promise<number> {
    try {
        const response = await axios.get(url + `/count/${del}`, {
                params: {groupSeq: group},
                withCredentials: true
            });
        return response.data;
    } catch (error) {
        console.error(error);
        return 0;
    }
}

export {getCountAll, getCount}