import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export default function CountdownTimer({userId, examId, durationSeconds, onTimeUp }) {
    const COOKIE_NAME = `exam_${examId}_user_${userId}_end_time`;

    const getInitialSecondsLeft = () => {
        const endTime = Cookies.get(COOKIE_NAME);

        if (endTime) {
            const timeLeft = Math.floor((new Date(endTime) - new Date()) / 1000);
            return timeLeft > 0 ? timeLeft : 0;
        } else {
            const newEndTime = new Date(Date.now() + durationSeconds * 1000);
            Cookies.set(COOKIE_NAME, newEndTime.toISOString(), { expires: 1 });
            return durationSeconds;
        }
    };

    const [secondsLeft, setSecondsLeft] = useState(getInitialSecondsLeft);

    useEffect(() => {
        if (secondsLeft <= 0) {
            Cookies.remove(COOKIE_NAME);
            if (onTimeUp) onTimeUp();
            return;
        }

        const interval = setInterval(() => {
            setSecondsLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [secondsLeft, onTimeUp]);

    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    const alertClass = minutes < 2 ? 'alert alert-danger text-center' : 'alert alert-success text-center';

    return (
        <div className={alertClass}>
            Time Left: {formattedTime}
        </div>
    );
}
