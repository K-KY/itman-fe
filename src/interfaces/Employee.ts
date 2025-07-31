import type {Depart} from "./Depart.ts";

interface Employee {
    profile: File | null,
    empSeq: number | null,
    empName: string,
    empNum: string,
    empEmail: string,
    empPhone: string,
    departDto: Depart | null,
    manager: Employee | null,
    del: boolean | false,
    position: null,
    job: null
    hired: null,
    state: null;
    empStatus: null;
}

export type {Employee};