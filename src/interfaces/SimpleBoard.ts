interface SimpleBoard {
    seq: number;
    name: string;
    description: string;
    del: boolean;
    enabled: boolean;
    createdDate: Date;
    updatedDate: Date;
}

export type {SimpleBoard}