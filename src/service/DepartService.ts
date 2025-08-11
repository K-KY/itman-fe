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
    get(pageRequest: PageRequest) {
        return getDeparts(pageRequest);
    }

    getAll(pageRequest: PageRequest) {
        return getAllDeparts(pageRequest);
    }

    getCount(): Promise<number> {
        return getCount();
    }

    getCountAll(del:boolean) : Promise<number> {
        return getCountAll(del)
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