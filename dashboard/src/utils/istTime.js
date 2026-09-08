import { useState, useEffect } from 'react';

/**
 * Returns current Date in Indian Standard Time (UTC+5:30)
 */
export function getIstDate(baseDate = new Date()) {
  return new Date(baseDate.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
}

/**
 * Format time strictly as HH:mm:ss IST
 */
export function formatIstTime(date = new Date()) {
  const d = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  const timeStr = d.toLocaleTimeString('en-GB', {
    timeZone: 'Asia/Kolkata',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  return `${timeStr} IST`;
}

/**
 * Format time strictly as HH:mm:ss (without IST suffix)
 */
export function formatIstTimeShort(date = new Date()) {
  const d = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  return d.toLocaleTimeString('en-GB', {
    timeZone: 'Asia/Kolkata',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

/**
 * Format full date-time strictly in IST
 */
export function formatIstDateTime(date = new Date()) {
  const d = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  const dateStr = d.toLocaleDateString('en-GB', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
  const timeStr = formatIstTimeShort(d);
  return `${dateStr}, ${timeStr} IST`;
}

/**
 * React hook providing a synchronized 1-second interval IST clock
 */
export function useIstClock() {
  const [currentTime, setCurrentTime] = useState(() => formatIstTimeShort());

  useEffect(() => {
    const update = () => {
      setCurrentTime(formatIstTimeShort());
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  return currentTime;
}
