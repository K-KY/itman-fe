import {
    getCountAll,
    getCount,
    getAllDeparts,
    type PageRequest,
    patchDepart,
    patchEnable,
    postDepart,
    getDeparts
} from "../axios/depart.ts";
import type { SimpleBoard } from "../interfaces/SimpleBoard.ts";
import type {SimpleService} from "./SimpleService.ts";

export class DepartService implements SimpleService {
    get(pageRequest: PageRequest, group:number) {
        return getDeparts(pageRequest, group);
    }

    getAll(pageRequest: PageRequest, group:number) {

        return getAllDeparts(pageRequest, group);
    }

    getCount(group:number|null): Promise<number> {
        return getCount(group);
    }

    getCountAll(del:boolean, group:number|null) : Promise<number> {
        return getCountAll(del, group)
    }

    post(name: string, description: string, group:number) {
        return postDepart(name, description, group);
    }

    patch(seq: number, name: string, description: string) {
        return patchDepart(seq, name, description);
    }

    patchEnable(seq: number, groupSeq: number | null, enabled: boolean, del: boolean): Promise<SimpleBoard> {
        return patchEnable(seq, groupSeq, enabled, del);
    }

}