interface Job {
    jobSeq: number;
    jobName: string;
    description: string;
    del: boolean;
    createdDate: Date;
    updatedDate: Date;
}

export type {Job}