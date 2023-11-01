import React, { useState, useEffect } from 'react';

interface TimerProps {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
}

const Timer: React.FC<TimerProps> = ({ year, month, day, hour, minute }) => {
  const [timeRemaining, setTimeRemaining] = useState('00:00:00');

  useEffect(() => {
    const targetDate = new Date(year, month - 1, day, hour, minute);

    const updateTimer = () => {
      const now = new Date();
      const timeDiff = targetDate.getTime() - now.getTime();

      if (timeDiff <= 0) {
        setTimeRemaining('00:00:00');
        return;
      }

      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      setTimeRemaining(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
    };

    updateTimer();  // Initial update
    const intervalId = setInterval(updateTimer, 1000);

    return () => clearInterval(intervalId);
  }, [year, month, day, hour, minute]);

  return (
    <p className='font-semibold'>{timeRemaining}</p>
  );
};

export default Timer;
