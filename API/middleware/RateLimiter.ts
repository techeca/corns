import { PrismaClient, User } from "@prisma/client";
import { FindUserByIP } from "../utils/DBHelpers";
import { NextFunction, Request, Response } from "express";

interface customRequest extends Request {
    user?: User
}

export async function RateLimiter(req: customRequest, res: Response, next: NextFunction): Promise<void> {
    //Se obtiene y valida IP, se busca y obtiene valores de usuario, y se incluye en req
    //Busca última compra del usuario y revisa si diferencia en tiempo es menor a 0 seg   
    //Si diferencia < 0 o no existen compras, continúa a la cración del purchase
    //En caso contrario envía 429 Too Many Request
    const prisma = new PrismaClient()
    try {   
        const IP = req.ip 
        const user = await FindUserByIP(IP)
        if(!user) return next(new Error('Usuario no encontrado'))
        req.user = user;
        const lastPurchase = await prisma.purchase.findFirst({
            where: { userId: user.id },
            orderBy: {
                id: 'desc'
            }
        })
   
        if (lastPurchase) {
            const lastPurchaseDate = lastPurchase.timeStamp.getTime()
            const actualDate = new Date().getTime()
            const diff = Number(((60 - (actualDate - lastPurchaseDate) / 1000)).toFixed())
            if(diff < 0) return next()
        }else{
            return next()
        }
        res.status(429).json({error: 'Too Many Request'})
    } catch (error) {
        console.error(error);
        next(new Error("Error al realizar rate limiter"))
    } finally {
        await prisma.$disconnect();
    }
}