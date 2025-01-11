import { Response, Request, NextFunction } from "express";

export interface ErrorHandlerProps{
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
}