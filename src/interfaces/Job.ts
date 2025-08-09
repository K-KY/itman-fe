interface Job {
    seq: number;
    name: string;
    description: string;
    del: boolean;
    createdDate: Date;
    updatedDate: Date;
}

export type {Job}