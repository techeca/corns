import { PrismaClient, User, Prisma } from "@prisma/client";
import { FindUserByIP, FindUserInfoByIP } from "../utils/DBHelpers";
import { NextFunction, Response, Request } from "express";

type UserWPurchases = Prisma.UserGetPayload<{
    include: { purchases: true }
}>

export async function CreateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    //Se valida que existe IP y luego se busca si existen datos de usuario(sin purchases) 
    //Si encuentra un usuario envía 409 y error: 'Usuario ya registrado'   
    //Si No encuentra usuario lo registra, envía 200 y result: user
    //En caso de error envía 500 y error: "Error al crear el usuario"
    const userIP = req.ip;
    if (!userIP) return next(new Error("Error al obtener la ip del usuario"))
    const userData: User | null = await FindUserInfoByIP(userIP);
    if (!userData && userIP) {
        const prisma = new PrismaClient();
        try {
            const newUser: User = await prisma.user.create({
                data: {
                    ip: userIP,
                }
            })
            res.status(200).json({result : newUser})
        } catch (error) {
            next("Error al crear el usuario")
        } finally {
            prisma.$disconnect();
        }
    }else{
        return next(new Error("Usuario ya registrado"))
    }
    
    //res.status(409).json({error: 'Usuario ya registrado'})
}

export async function ReadUser(req: Request, res: Response, next: NextFunction): Promise<void>{
    //Se valida que existe IP y luego se busca con esta los datos del usuario(con purchases) 
    //Si encuentra un usuario envía 200 y result: {user + purchases[]}
    //Si No encuentra usuario envía 404 y error: "Usuario no encontrado"
    //En caso de error va a middleware "Error al crear el usuario"
    try {
        const userIP = req.ip;
        const userData: UserWPurchases | null = await FindUserByIP(userIP);
        if(!userData) return next(new Error("Usuario no encontrado"))  
        res.status(200).json({result: userData})
    } catch (error) {
        next(new Error("Error al buscar el usuario"))
    }
}