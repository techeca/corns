import { PrismaClient, User } from "@prisma/client";
import { Response, Request, NextFunction } from "express";
import { FindUserByIP } from "../utils/DBHelpers";

interface customRequest extends Request {
    user?: User
}

export async function CreatePurchase(req: customRequest, res: Response, next: NextFunction): Promise<void> {
    //Se valida user configurado en middleware de rate limiter
    //Si No encuentra usuario envía middleware de next con "No hay datos de usuario"
    //Si encuentra un usuario realiza la compra, envía 200 y result: purchase   
    //En caso de error envía middleware next con "Error al intentar generar un Purchase"
    const userData: User | undefined = req.user
    if (!userData) return next(new Error("No hay datos de usuario"))

    const prisma = new PrismaClient()
    try {
        const newPurchase = await prisma.purchase.create({
            data: {
                userId: userData.id
            }
        })
        res.status(200).json({ result: newPurchase });
    } catch (error) {
        console.error(error);
        next(new Error("Error al intentar generar un Purchase"))
    } finally {
        await prisma.$disconnect()
    }
}

//Listado de Purchases
export async function ReadPurchase(req: customRequest, res: Response, next: NextFunction): Promise<void> {
    //Se obtiene valida user configurado en middleware de rate limiter
    //Si No encuentra usuario envía middleware de next con "IP de usuario no encontrado"
    //Si encuentra un usuario realiza la compra, envía 200 y result: purchase[]   
    //En caso de error envía middleware next con "Error al obtener lista de purchases"
    const userIp = req.ip
    const userData = await FindUserByIP(userIp)
    if (!userData) return next(new Error("IP de usuario no encontrado"))

    const prisma = new PrismaClient()
    try {
        const purchaseList = await prisma.purchase.findMany({
            where: { userId: userData.id }
        })
        res.status(200).json({ result: purchaseList })
    } catch (error) {
        console.error(error);
        next(new Error("Error al obtener lista de purchases"))
    } finally {
        await prisma.$disconnect()
    }
}
