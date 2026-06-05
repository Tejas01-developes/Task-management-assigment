import { Request, Response } from "express";
export declare const registeruser: (req: Request, resp: Response) => Promise<void>;
export declare const loginuser: (req: Request, resp: Response) => Promise<Response<any, Record<string, any>>>;
interface cutomreq extends Request {
    id?: string;
}
export declare const addtask: (req: cutomreq, resp: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const gettasks: () => void;
export {};
//# sourceMappingURL=controller.d.ts.map