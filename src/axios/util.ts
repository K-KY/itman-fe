import axios from "axios";

async function getCountAll(url: string) {
    try {
        const response = await axios.get(url + "/count", {withCredentials: true});
        return response.data;
    } catch (error) {
        console.error(error);
        return 0;
    }
}

async function getCount(url: string, del: boolean) {
    try {
        const response = await axios.get(url + `/count/${del}`, {withCredentials: true},);
        return response.data;
    } catch (error) {
        console.error(error);
        return 0;
    }
}

export {getCountAll, getCount}