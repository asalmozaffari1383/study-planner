import { useState, useEffect, useCallback } from 'react';

// ۱. تعریف فایل صدا (خارج از کامپوننت)
const alarmSound = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');

const Pomodoro = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  // ۲. استفاده از useCallback برای اینکه ری‌اکت دیگه اخطار Dependency نده
  const handleReset = useCallback(() => {
    setIsActive(false);
    setMinutes(isBreak ? 5 : 25);
    setSeconds(0);
  }, [isBreak]);

  const handleStartPause = () => setIsActive(!isActive);

  const toggleMode = () => {
    const nextMode = !isBreak;
    setIsBreak(nextMode);
    setIsActive(false);
    setMinutes(nextMode ? 5 : 25);
    setSeconds(0);
  };

  // ۳. هوک اصلی تایمر
  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            alarmSound.play().catch(e => console.log("Audio play failed:", e)); 
            setIsActive(false);
            alert(isBreak ? "Break is over! Time to study." : "Study session done! Take a break.");
            handleReset(); 
          } else {
            setMinutes(prev => prev - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(prev => prev - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, isBreak, handleReset]); // handleReset اینجا اضافه شد

  return (
    <div className="container mt-5 text-center">
      <div className="timer-card p-5 rounded-5 shadow-lg" 
           style={{ 
             background: isBreak ? 'linear-gradient(135deg, #1cc88a 0%, #13855c 100%)' : 'linear-gradient(135deg, #4e73df 0%, #224abe 100%)', 
             color: 'white',
             transition: 'all 0.5s ease'
           }}>
        
        <h4 className="fw-bold mb-4">{isBreak ? '☕ Break Time' : '📚 Study Session'}</h4>
        <div className="display-1 fw-bold mb-4" style={{ fontSize: '80px' }}>
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>

        <div className="d-flex justify-content-center gap-3">
          <button className="btn btn-light btn-lg rounded-pill px-4 fw-bold shadow" onClick={handleStartPause}>
            {isActive ? 'Pause' : 'Start'}
          </button>
          <button className="btn btn-outline-light btn-lg rounded-pill px-4" onClick={handleReset}>
            Reset
          </button>
        </div>

        <button className="btn btn-link text-white mt-4 opacity-75 text-decoration-none" onClick={toggleMode}>
          Switch to {isBreak ? 'Study Mode' : 'Break Mode'}
        </button>
      </div>
    </div>
  );
};

export default Pomodoro;
