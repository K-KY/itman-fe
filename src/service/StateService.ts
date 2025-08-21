import {
    getCountAll,
    getCount,
    getStates,
    type PageRequest,
    patchState,
    patchEnable,
    postState,
    getAllStates
} from "../axios/state.ts";
import type {SimpleService} from "./SimpleService.ts";
import type {SimpleBoard} from "../interfaces/SimpleBoard.ts";

export class StateService implements SimpleService {
    get(pageRequest: PageRequest, group:number) {
        return getStates(pageRequest, group);
    }

    getAll(pageRequest: PageRequest, group:number) {
        return getAllStates(pageRequest, group);
    }

    getCount(group:number): Promise<number> {
        return getCount(group);
    }

    getCountAll(del:boolean, group:number) : Promise<number> {
        return getCountAll(del, group);
    }

    post(name: string, description: string, group:number) {
        return postState(name, description, group);
    }

    patch(seq: number, name: string, description: string,  group:number|null): Promise<SimpleBoard|void> {
        return patchState(seq, name, description, group);
    }

    patchEnable(seq: number, groupSeq:number, enabled: boolean, del:boolean): Promise<SimpleBoard> {
        return patchEnable(seq, groupSeq, enabled, del);
    }

}