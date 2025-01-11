import { PrismaClient, User } from "@prisma/client"
import { UserWPurchases } from "../types/UserWPurchases"

//Busca usuario por IP
//Si lo encuentra retorna el usuario con sus purchases
//Si no lo encuentra retorna null
export async function FindUserByIP(ip: string | undefined): Promise<UserWPurchases | null> {
    if (!ip) throw new Error("Error al obtener la ip del usuario")
    const prisma = new PrismaClient()
    try {
        const user = await prisma.user.findFirst({
            where: { ip: ip },
            include: {
                purchases: true
            }
        })
        return user
    } catch (error) {
        console.error(error);
        return null
    } finally {
        prisma.$disconnect()
    }
}

//Busca usuario por IP
//Si lo encuentra retorna el usuario sin sus purchases
//Si no lo encuentra retorna null
export async function FindUserInfoByIP(ip: string): Promise<User | null> {
    const prisma = new PrismaClient()
    try {
        const user = await prisma.user.findFirst({
            where: { ip: ip },
        })
        return user
    } catch (error) {
        console.error(error);
        return null
    } finally {
        prisma.$disconnect()
    }
}