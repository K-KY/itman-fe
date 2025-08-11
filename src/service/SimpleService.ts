import type {SimpleBoard} from "../interfaces/SimpleBoard.ts";
import type {PageRequest} from "../interfaces/PageRequest.ts";

export interface SimpleService {
    get(req: PageRequest): Promise<{
        totalPages: number;
        content: SimpleBoard[];
    }>;

    getAll(req: PageRequest): Promise<{
        totalPages: number;
        content: SimpleBoard[];
    }>;

    getCount(): Promise<number>;

    getCountAll(del: boolean): Promise<number>;

    post(name: string, description: string): Promise<SimpleBoard>;

    patch(seq: number, name: string, description: string): Promise<SimpleBoard>;

    patchEnable(seq: number, enabled: boolean): Promise<SimpleBoard>;

}
