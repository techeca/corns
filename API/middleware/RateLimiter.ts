import { PrismaClient, User } from "@prisma/client";
import { FindUserByIP } from "../utils/DBHelpers";
import { NextFunction, Request, Response } from "express";

interface customRequest extends Request {
    user?: User
}

export async function RateLimiter(req: customRequest, res: Response, next: NextFunction): Promise<void> {
    const prisma = new PrismaClient()
    try {
        //Se obtiene y valida IP, se busca y obtiene valores de usuario, y se incluye en req, 404 si no encuentra usuario
        const IP = req.ip
        const user = await FindUserByIP(IP)
        if (!user) {
            res.status(404).json({ error: "Usuario no encontrado" })
            return
        }
        req.user = user;
        //Busca última compra del usuario y revisa diferencia en tiempo   
        const lastPurchase = await prisma.purchase.findFirst({
            where: { userId: user.id },
            orderBy: {
                id: 'desc'
            }
        })
        
        if (lastPurchase) {
            //En caso que diff > 0 envía 429 Too Many Request
            const lastPurchaseDate = lastPurchase.timeStamp.getTime()
            const actualDate = new Date().getTime()
            const diff = Number(((60 - (actualDate - lastPurchaseDate) / 1000)).toFixed())
            if (diff > 0) {
                res.status(429).json({ error: 'Too Many Request' })
                return
            }
        }
        //Si no existen compras, continúa a la cración del purchase (next())
        return next()
    } catch (error) {
        console.error(error);
        next(new Error("Error al realizar rate limiter"))
    } finally {
        await prisma.$disconnect();
    }
}