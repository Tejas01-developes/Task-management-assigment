import { NextFunction, Request, Response } from "express";
interface customreq extends Request {
    id?: string;
}
export declare const accessfilter: (req: customreq, resp: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export {};
//# sourceMappingURL=accessfilter.d.ts.map