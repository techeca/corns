import { Request, Response, NextFunction } from "express";


export default function ErrorHandler(err: Error, req: Request, res: Response, next: NextFunction){   
    if(err.message === 'Too Many Request'){
        res.status(429).json(err.message)
    } else if(err.message === 'Usuario no encontrado'){
        res.status(404).json(err.message)
    } else if(err.message === 'Usuario ya registrado'){
        res.status(409).json(err.message)
    }else{
        res.status(500).json(err.message);
    }
};