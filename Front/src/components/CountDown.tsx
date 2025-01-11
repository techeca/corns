import useTimerControl from "@/hooks/useTimerControl";

export default function CountDown(): React.ReactNode {
    const { time, state } = useTimerControl()

    // Calcula minutos y segundos restantes
    const minutes = Math.floor(time / 60);
    const seconds = String(time % 60).padStart(2, "0");

    return (
        <span className="ml-1">{`${state ? `${minutes}:${seconds}⏰` : `0:00` }`}</span>
    )
}