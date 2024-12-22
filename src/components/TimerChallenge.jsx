import {useState, useRef} from "react";
import ResultModal from "./ResultModal.jsx";


//let timer; <- na zewnatrz glownej funkcji sie nadpisuje,
//a w srodku dziala na kopiach po re-execute kodu i ma inna wartosc
export default function TimerChallenge({title, targetTime}){
    const timer = useRef();
    const dialog = useRef();
    const [timerStarted, setTimerStarted] = useState(false);
    const [timerExpired, setTimerExpired] = useState(false);

    function handleStart(){
        timer.current = setTimeout(() => {
            setTimerExpired(true);
            dialog.current.open();
        }, targetTime * 1000);

        setTimerStarted(true);
    }
    function handleStop() {
        clearTimeout(timer.current);
    }
    return (
        <>
        < ResultModal ref={dialog} result="lost" targetTime={targetTime}/>
        <section className="challenge">
            <h2>{title}</h2>
            <p className="challenge-time">
                {targetTime} second{targetTime > 1 ? 's' : ''}
            </p>
            <p>
                <button onClick={timerStarted ? handleStop : handleStart}>
                    {timerStarted ? "Stop" : "Start"} Challenge
                </button>
            </p>
            <p className={timerStarted ? "active" : undefined}>
                {timerStarted ? 'Time is running....' : "Timer inactive"}
            </p>
        </section>
        </>
    )

}