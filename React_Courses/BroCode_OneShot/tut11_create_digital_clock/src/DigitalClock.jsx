import { useState, useEffect } from "react";

function DigitalClock(){
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(()=>{
            setTime(new Date());
        }, 1000);
        
        // adding a cleanup function
        return ()=>{
            clearInterval(intervalId);
        }
    }, []);

    function formatTime(){
        let hours = time.getHours();
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();
        const meridiem = hours >= 12 ? "PM" : "AM"


        // In JS and in programming language 0 means false and 1 means true
        // It will convert the hour to 1 (as 12 % 12) as soon as the hour reaches 12 and if the hour is not 12 then it will return 'hours % 12'
        hours = hours % 12 || 12;

        return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)} ${meridiem}`;
    }

    function padZero(number){
        return (number < 10 ? "0" : "") + number;
    }

    return(
        <div className="clock-container">
            <div className="clock">
                <span>{formatTime()}</span>
            </div>
        </div>
    );
}

export default DigitalClock;