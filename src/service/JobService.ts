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
    get(pageRequest: PageRequest) {
        return getJobs(pageRequest);
    }

    getAll(pageRequest: PageRequest) {
        return getAllJobs(pageRequest);
    }

    getCount(): Promise<number> {
        return getCount();
    }

    getCountAll(del:boolean) : Promise<number> {
        return getCountAll(del);
    }

    post(name: string, description: string) {
        return postJob(name, description);
    }

    patch(seq: number, name: string, description: string) {
        return patchJob(seq, name, description);
    }

    patchEnable(seq: number, enabled: boolean): Promise<SimpleBoard> {
        return patchEnable(seq, enabled);
    }

}