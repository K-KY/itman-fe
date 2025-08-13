import type {Depart} from "./Depart.ts";
import type {SimpleBoard} from "./SimpleBoard.ts";
import type {Job} from "./Job.ts";

interface Employee {
    profile: File | null,
    empSeq: number | null,
    empName: string,
    empNum: string,
    empEmail: string,
    empPhone: string,
    departDto: Depart | SimpleBoard | null,
    manager: Employee | null,
    del: boolean | false,
    position: null,
    job: Job | SimpleBoard | null,
    groupSeq:number | null,
    hired: null,
    state: null;
    empStatus: null;
}

export type {Employee};