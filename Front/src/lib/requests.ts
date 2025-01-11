import { ResponseUserSignature } from '@/types/ResponseUserSignature'
import { ResponseCornSignature } from '@/types/ResponseCornSignature'

export async function getUserData(): Promise<ResponseUserSignature> {
    const API_URL = 'http://localhost:3000'
    try {
        const response = await fetch(`${API_URL}/user/read`)
        const json = await response.json()
        return {status: response.status, result: json.result, message: 'ok'}
    } catch (error) {
        return {status: 500, message: JSON.stringify(error)}
    }
}

export async function registerNewUser(): Promise<ResponseUserSignature> {
    const API_URL = 'http://localhost:3000'
    try {
        const response = await fetch(`${API_URL}/user/create`, {
            method: `POST`
        })
        const json = await response.json()
        return {status: response.status, result: json.result, message: 'ok'}
    } catch (error) {
        return {status: 500, message: JSON.stringify(error)}
    }
}

export async function buyCorn(): Promise<ResponseCornSignature> {
    const API_URL = 'http://localhost:3000'
    try {
        const response = await fetch(`${API_URL}/purchase/create`, { method: 'POST'})
        const json = await response.json()
        return {status: response.status, result: json.result, message: 'ok'}
    } catch (error) {
        return {status: 500, message: JSON.stringify(error)}
    }
}
