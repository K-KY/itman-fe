import {
    getCountAll,
    getCount,
    getJobs,
    type PageRequest,
    patchJob,
    patchEnable,
    postJob,
    getAllJobs
} from "../axios/jobs.ts";
import type {SimpleService} from "./SimpleService.ts";
import type {SimpleBoard} from "../interfaces/SimpleBoard.ts";

export class JobService implements SimpleService {
    get(pageRequest: PageRequest, group:number) {
        return getJobs(pageRequest, group);
    }

    getAll(pageRequest: PageRequest, group:number) {
        return getAllJobs(pageRequest, group);
    }

    getCount(group:number): Promise<number> {
        return getCount(group);
    }

    getCountAll(del:boolean, group:number) : Promise<number> {
        return getCountAll(del, group);
    }

    post(name: string, description: string, group:number) {
        return postJob(name, description, group);
    }

    patch(seq: number, name: string, description: string,  group:number|null): Promise<SimpleBoard|void> {
        return patchJob(seq, name, description, group);
    }

    patchEnable(seq: number, groupSeq:number, enabled: boolean, del:boolean): Promise<SimpleBoard> {
        return patchEnable(seq, groupSeq, enabled, del);
    }

}