export interface User {
    id: number,
    ip: string,
    corns: number
    purchases: Purchase[]
}

export interface Purchase {
    id: number,
    userId: number,
    timeStamp: Date
}