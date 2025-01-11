export interface TimerControl {
    state: boolean,
    start: () => void,
    stop: () => void
}