import { createContext } from "react";

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

export const TimerContext = createContext<TimerProviderState>(initialState)