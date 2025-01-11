import { User } from "./User"

export type ResponseUserSignature = {
    status: number,
    result?: User
    message: string
}