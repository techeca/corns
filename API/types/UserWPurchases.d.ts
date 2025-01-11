import { Prisma } from "@prisma/client";

export type UserWPurchases = Prisma.UserGetPayload<{
    include: { purchases: true }
}>