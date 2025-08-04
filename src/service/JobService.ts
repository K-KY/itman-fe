import {getCountAll, getCount, getJobs, type PageRequest, patchJob, postJob} from "../axios/jobs.ts";
import type {SimpleService} from "./SimpleService.ts";

export class JobService implements SimpleService {
    get(pageRequest: PageRequest) {
        return getJobs(pageRequest);
    }

    getCount(del:boolean): Promise<number> {
        return getCount(del);
    }

    getCountAll() : Promise<number> {
        return getCountAll()
    }

    post(name: string, description: string) {
        return postJob(name, description);
    }

    patch(seq: number, name: string, description: string) {
        return patchJob(seq, name, description);
    }

}