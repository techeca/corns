import { Purchase } from "./User"

export type ResponseCornSignature = {
    status: number,
    result?: Purchase,
    message: string
}