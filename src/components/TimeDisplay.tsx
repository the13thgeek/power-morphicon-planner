import React from 'react';

interface TimeDisplayProps {
   startTime?: string | null; // Expected format: "HH:mm", e.g. "16:00"
  endTime?: string | null;
}

const formatTo12Hour = (time24: string): string | null => {
  if (!time24 || !/^\d{1,2}:\d{2}$/.test(time24)) return null;

  const [hoursStr, minutesStr] = time24.split(':');
  let hours = parseInt(hoursStr, 10);
  const minutes = minutesStr;

  if (Number.isNaN(hours) || hours < 0 || hours > 23) return null;

  const period = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  if (hours === 0) hours = 12;

  return `${hours}:${minutes} ${period}`;
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({ startTime, endTime }) => {
  const formattedStart = startTime ? formatTo12Hour(startTime) : null;
  const formattedEnd = endTime ? formatTo12Hour(endTime) : null;

  if (!formattedStart) {
    return <span></span>;
  }

  if (formattedEnd) {
    return <span>{formattedStart} - {formattedEnd}</span>;
  }

  return <span>{formattedStart}</span>;
};

export default TimeDisplay;