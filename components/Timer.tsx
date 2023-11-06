import React, { useState, useEffect } from 'react';
import { differenceInSeconds, format } from 'date-fns';

interface TimerProps {
  to: bigint;
}

const Timer: React.FC<TimerProps> = ({ to }) => {
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    const updateTimer = () => {
      const currentTime = Math.floor(Date.now() / 1000);
      let remaining = Number(to) - currentTime;
      if (remaining < 0) {
        remaining = 0;
      }

      setTimeRemaining(remaining);

      const formattedTime = format(new Date(0, 0, 0, 0, 0, timeRemaining), 'HH:mm:ss');
    };

    updateTimer();
    const intervalId = setInterval(updateTimer, 1000);

    return () => clearInterval(intervalId);
  }, [to]);

  return (
    <p className='font-semibold'>
      {format(new Date(0, 0, 0, 0, 0, timeRemaining), 'HH:mm:ss')}
    </p>
  );
};

export default Timer;
