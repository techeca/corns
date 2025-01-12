import { TimerContext } from "@/context/TimerContext"
import { useContext } from "react"

export default function useTimerControl(){
    const context = useContext(TimerContext)

    if(context === undefined)
        throw new Error("useTimerControl musbe used within a TimerProvider")

    return context
}