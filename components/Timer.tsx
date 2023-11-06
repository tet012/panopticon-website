import React, { useState, useEffect } from 'react';
import { differenceInSeconds, format } from 'date-fns';

interface TimerProps {
  startTime: bigint;
  endTime: bigint;
  beforeText: string;
  duringText: string;
  afterText: string;
}

const Timer: React.FC<TimerProps> = (props) => {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [text, setText] = useState('');
  const { startTime, endTime } = props;

  useEffect(() => {
    const updateTimer = () => {
      const currentTime = Math.floor(Date.now() / 1000);

      if(currentTime < Number(startTime)) {
        // Before timer is started
        setText(props.beforeText);
        setTimeRemaining(Number(startTime) - currentTime);
      } else if(currentTime < Number(endTime)) {
        // During timer
        setText(props.duringText);
        setTimeRemaining(Number(endTime) - currentTime);
      } else {
        // After timer
        setText(props.afterText);
        setTimeRemaining(0);
      }
    };

    updateTimer();
    const intervalId = setInterval(updateTimer, 1000);

    return () => clearInterval(intervalId);
  }, [ endTime ]);

  return (
    <>
      <p className="whitespace-nowrap">{text}</p>
      <p className='font-semibold'>
        {format(new Date(0, 0, 0, 0, 0, timeRemaining), 'HH:mm:ss')}
      </p>
    </>
  );
};

export default Timer;
