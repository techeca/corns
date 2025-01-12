import { Request, Response } from "express";

export default function ErrorHandler(err: Error, req: Request, res: Response){   
    //console.error(err.stack);
    res.status(500).json(err.message);
};