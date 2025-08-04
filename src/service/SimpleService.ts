import type {SimpleBoard} from "../interfaces/SimpleBoard.ts";
import type {PageRequest} from "../interfaces/PageRequest.ts";

export interface SimpleService {
    get(req: PageRequest): Promise<{
        totalPages: number;
        content: SimpleBoard[];
    }>;

    getCount(del:boolean): Promise<number>;

    getCountAll(): Promise<number>;

    post(name: string, description: string): void;

    patch(seq: number, name: string, description: string): void;

}
