import { useEffect, useState } from "react";
import { getUserData, registerNewUser } from "@/lib/requests";
import useTimerControl from "./useTimerControl";

type useUserDataSignature = {
    updateCorns: () => void,
    corns: number,
    isLoading: boolean
}

export default function useUserData(): useUserDataSignature {
    const [totalCorns, setTotalCorns] = useState(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { start } = useTimerControl()

    //Si el usuario no existe lo registra
    //Si el usuario existe obtiene el total de purchaces (totalCorns)
    async function checkIsRegistered() {
        try {
            const response = await getUserData()
            if (response.status === 404) {
                const resp = await registerNewUser()
                if (resp.status === 409 || !resp.result) console.error('Error al registrar IP de usuario')
            } else if (response.result && response.result.purchases.length > 0) {
                const lastPurchase = response.result?.purchases[response.result.purchases.length - 1]
                const actualDate = new Date().getTime()
                const lastPurchaseDate = new Date(lastPurchase.timeStamp).getTime()
                const diff = Number(((60 - (actualDate - lastPurchaseDate) / 1000)).toFixed())
                if(diff > 0) start(diff)
                setTotalCorns(response.result.purchases.length)
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false)
        }
    }

    function updateCorns() {
        setTotalCorns((prevCorns) => prevCorns + 1)
    }

    useEffect(() => {
        checkIsRegistered()
    }, [])

    return {
        updateCorns,
        corns: totalCorns,
        isLoading,
    }
}