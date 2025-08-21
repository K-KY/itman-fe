import {
    getCountAll,
    getCount,
    getCategories,
    type PageRequest,
    patchCategory,
    patchEnable,
    postCategory,
    getAllCategories
} from "../axios/category.ts";
import type {SimpleService} from "./SimpleService.ts";
import type {SimpleBoard} from "../interfaces/SimpleBoard.ts";

export class CategoryService implements SimpleService {
    get(pageRequest: PageRequest, group:number) {
        return getCategories(pageRequest, group);
    }

    getAll(pageRequest: PageRequest, group:number) {
        return getAllCategories(pageRequest, group);
    }

    getCount(group:number): Promise<number> {
        return getCount(group);
    }

    getCountAll(del:boolean, group:number) : Promise<number> {
        return getCountAll(del, group);
    }

    post(name: string, description: string, group:number) {
        return postCategory(name, description, group);
    }

    patch(seq: number, name: string, description: string,  group:number|null): Promise<SimpleBoard|void> {
        return patchCategory(seq, name, description, group);
    }

    patchEnable(seq: number, enabled: boolean): Promise<SimpleBoard> {
        return patchEnable(seq, enabled);
    }

}