import React, { createContext, useState, useEffect } from "react";

type TimerProviderState = {
    time: number,
    state: boolean
    start: (time?: number) => void,
    stop: () => void 
}

const initialState: TimerProviderState = {
    time: 0,
    state: false,
    start: () => {},
    stop: () => {}
}

export const TimerProviderContext = createContext<TimerProviderState>(initialState)

type TimerProviderProps = {
    children: React.ReactNode
}

export function TimerProvider({ children }: TimerProviderProps) {
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);

    function startTimer(time?: number): void {
        setIsRunning(true)
        setTimeLeft(time ? time : 60)
    }

    function stopTimer(): void {
        setIsRunning(false)
    }

    //cuenta regresiva
    useEffect(() => {
        if (!isRunning || timeLeft <= 0) return;

        const interval = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonta
    }, [isRunning, timeLeft]);

    //Si el tiempo llega a 0 el state (isRunning) pasa a false
    useEffect(() => {
        if (timeLeft === 0) {
            stopTimer();
        }
    }, [timeLeft]);

    const value = {
        time: timeLeft,
        state: isRunning,
        start: startTimer,
        stop: stopTimer,
    }

    return (
        <TimerProviderContext.Provider value={value}>
            {children}
        </TimerProviderContext.Provider>
    )
}

