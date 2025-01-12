import { PrismaClient, User, Prisma } from "@prisma/client";
import { FindUserByIP, FindUserInfoByIP } from "../utils/DBHelpers";
import { NextFunction, Response, Request } from "express";

type UserWPurchases = Prisma.UserGetPayload<{
    include: { purchases: true }
}>

export async function CreateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    //Se valida que existe IP y luego se busca si existen datos de usuario(sin purchases) 
    const userIP = req.ip;
    if (!userIP) return next(new Error("Error al obtener la ip del usuario"))
    const userData: User | null = await FindUserInfoByIP(userIP);
    const prisma = new PrismaClient();
    try {
        //Si encuentra un usuario envía 409 y error: 'Usuario ya registrado'   
        if (userData) {
            res.status(409).json({ error: "Usuario ya registrado" })
            return
        }
        //Registra nuevo usuario, envía 200 y result: user
        const newUser: User = await prisma.user.create({
            data: {
                ip: userIP,
            }
        })
        res.status(200).json({ result: newUser })
    } catch (error) {
        console.error(error);
        next("Error al crear el usuario")
    } finally {
        prisma.$disconnect();
    }

}

export async function ReadUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        //Se valida que existe IP y luego se busca con esta los datos del usuario(con purchases) 
        const userIP = req.ip;
        const userData: UserWPurchases | null = await FindUserByIP(userIP);
        //Si No encuentra usuario envía 404 y error: "Usuario no encontrado"
        if (!userData) {
            res.status(404).json({ error: 'Usuario no encontrado' })
            return
        }
        //Si encuentra un usuario envía 200 y result: {user + purchases[]}
        res.status(200).json({ result: userData })
    } catch (error) {
        //En caso de error va a middleware "Error al crear el usuario"
        console.error(error);
        next(new Error("Error al buscar el usuario"))
    }
}