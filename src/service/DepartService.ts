import {getCountAll, getCount, getDeparts, type PageRequest, patchDepart, postDepart} from "../axios/depart.ts";
import type {SimpleService} from "./SimpleService.ts";

export class DepartService implements SimpleService {
    get(pageRequest: PageRequest) {
        return getDeparts(pageRequest);
    }

    getCount(del:boolean): Promise<number> {
        return getCount(del);
    }

    getCountAll() : Promise<number> {
        return getCountAll()
    }

    post(name: string, description: string) {
        return postDepart(name, description);
    }

    patch(seq: number, name: string, description: string) {
        return patchDepart(seq, name, description);
    }

}