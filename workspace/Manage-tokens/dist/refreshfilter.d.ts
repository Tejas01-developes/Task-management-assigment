import { NextFunction, Request, Response } from "express";
interface customreq extends Request {
    id?: string;
}
export declare const refreshfilter: (req: customreq, resp: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export {};
//# sourceMappingURL=refreshfilter.d.ts.map