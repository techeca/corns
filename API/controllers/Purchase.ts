import { PrismaClient, User } from "@prisma/client";
import { Response, Request, NextFunction } from "express";
import { FindUserByIP } from "../utils/DBHelpers";

interface customRequest extends Request {
    user?: User
}

export async function CreatePurchase(req: customRequest, res: Response, next: NextFunction): Promise<void> {
    //Se valida user configurado en middleware de rate limiter
    const userData: User | undefined = req.user
    const prisma = new PrismaClient()
    try {
        //Si por alguna razón no está el usuario, envía 404 Usuario no encontrado
        if (!userData) {
            res.status(404).json({ error: "Usuario no encontrado" })
            return
        }
        //Si encuentra un usuario realiza la compra, envía 200 y result: purchase   
        const newPurchase = await prisma.purchase.create({
            data: {
                userId: userData.id
            }
        })
        res.status(200).json({ result: newPurchase });
    } catch (error) {
        //En caso de error envía middleware next con "Error al intentar generar un Purchase"
        console.error(error);
        next(new Error("Error al intentar generar un Purchase"))
    } finally {
        await prisma.$disconnect()
    }
}

//Listado de Purchases
export async function ReadPurchase(req: customRequest, res: Response, next: NextFunction): Promise<void> {
    //Se valida IP y busca usuario 
    const userIp = req.ip
    const userData = await FindUserByIP(userIp)
    //Si No encuentra usuario envía 404 Usuario no encontrado
    if (!userData) {
        res.status(404).json({ error: "Usuario no encontrado" })
        return
    }

    const prisma = new PrismaClient()
    try {
        //Si encuentra un usuario realiza la compra, envía 200 y result: purchase[]   
        const purchaseList = await prisma.purchase.findMany({
            where: { userId: userData.id }
        })
        res.status(200).json({ result: purchaseList })
    } catch (error) {
        //En caso de error envía middleware next con "Error al obtener lista de purchases"
        console.error(error);
        next(new Error("Error al obtener lista de purchases"))
    } finally {
        await prisma.$disconnect()
    }
}
