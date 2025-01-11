import { TimerProviderContext } from "@/context/TimerProvider"
import { useContext } from "react"

export default function useTimerControl(){
    const context = useContext(TimerProviderContext)

    if(context === undefined)
        throw new Error("useTimerControl musbe used within a TimerProvider")

    return context
}