import {useState, useRef} from "react";
import ResultModal from "./ResultModal.jsx";


//let timer; <- na zewnatrz glownej funkcji sie nadpisuje,
//a w srodku dziala na kopiach po re-execute kodu i ma inna wartosc
export default function TimerChallenge({title, targetTime}){
    const timer = useRef();
    const dialog = useRef();
    const [timeRemaining, setTimeRemaining] = useState(targetTime*1000);

    const timerIsActive = timeRemaining > 0 && timeRemaining <targetTime*1000;

    if(timeRemaining <=0){
        clearInterval(timer.current);
        dialog.current.open();
    }

    function handleReset(){
        setTimeRemaining(targetTime*1000);
    }

    function handleStart(){
        timer.current = setInterval(() => {
            setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10);
        }, 10);
    }
    function handleStop() {
        dialog.current.open();
        clearTimeout(timer.current);

    }
    return (
        <>
        <ResultModal
            ref={dialog}
            targetTime={targetTime}
            remainingTime={timeRemaining}
            onReset={handleReset}
        />
        <section className="challenge">
            <h2>{title}</h2>
            <p className="challenge-time">
                {targetTime} second{targetTime > 1 ? 's' : ''}
            </p>
            <p>
                <button onClick={timerIsActive ? handleStop : handleStart}>
                    {timerIsActive ? "Stop" : "Start"} Challenge
                </button>
            </p>
            <p className={timerIsActive ? "active" : undefined}>
                {timerIsActive ? 'Time is running....' : "Timer inactive"}
            </p>
        </section>
        </>
    )

}