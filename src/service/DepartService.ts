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

    getCount(): Promise<number> {
        return getCount();
    }

    getCountAll(del:boolean) : Promise<number> {
        return getCountAll(del)
    }

    post(name: string, description: string, group:number) {
        return postDepart(name, description, group);
    }

    patch(seq: number, name: string, description: string) {
        return patchDepart(seq, name, description);
    }

    patchEnable(seq: number, enabled: boolean): Promise<SimpleBoard> {
        return patchEnable(seq, enabled);
    }

}