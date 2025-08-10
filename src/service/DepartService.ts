import {getCountAll, getCount, getDeparts, type PageRequest, patchDepart, patchEnable, postDepart} from "../axios/depart.ts";
import type { SimpleBoard } from "../interfaces/SimpleBoard.ts";
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
    patchEnable(seq: number, enabled: boolean): Promise<SimpleBoard> {
        return patchEnable(seq, enabled);
    }

}