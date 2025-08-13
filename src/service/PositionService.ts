import {
    getCountAll,
    getCount,
    getPositions,
    type PageRequest,
    patchPosition,
    patchEnable,
    postPosition,
    getAllPositions
} from "../axios/position.ts";
import type {SimpleService} from "./SimpleService.ts";
import type {SimpleBoard} from "../interfaces/SimpleBoard.ts";

export class PositionService implements SimpleService {
    get(pageRequest: PageRequest, group:number) {
        return getPositions(pageRequest, group);
    }

    getAll(pageRequest: PageRequest, group:number) {
        return getAllPositions(pageRequest, group);
    }

    getCount(group:number): Promise<number> {
        return getCount(group);
    }

    getCountAll(del:boolean, group:number) : Promise<number> {
        return getCountAll(del, group);
    }

    post(name: string, description: string, group:number) {
        return postPosition(name, description, group);
    }

    patch(seq: number, name: string, description: string,  group:number|null): Promise<SimpleBoard|void> {
        return patchPosition(seq, name, description, group);
    }

    patchEnable(seq: number, enabled: boolean): Promise<SimpleBoard> {
        return patchEnable(seq, enabled);
    }

}