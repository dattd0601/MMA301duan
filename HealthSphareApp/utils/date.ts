/**
 * Returns the current date in a formatted string
 * @returns {string} Formatted date string (e.g., "Monday, January 1")
 */
import dayjs from 'dayjs'
import 'dayjs/locale/vi' // Import ngôn ngữ tiếng Việt
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)
dayjs.locale('vi')
export const getCurrentDate = (): string => {
    const date = new Date();
    return date.toLocaleDateString('vi', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };
  
  /**
   * Formats a timestamp to a readable time string
   * @param {number} timestamp - The timestamp to format
   * @returns {string} Formatted time string (e.g., "9:30 AM")
   */
  export const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('vi', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };
  
  /**
   * Checks if two dates are the same day
   * @param {Date} date1 - First date to compare
   * @param {Date} date2 - Second date to compare
   * @returns {boolean} True if dates are the same day
   */
  export const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };
  
  /**
   * Returns the start of the current day
   * @returns {Date} Date object set to the start of the current day
   */
  export const startOfToday = (): Date => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  };
  
  /**
   * Formats a date for display in logs
   * @param {number} timestamp - The timestamp to format
   * @returns {string} Formatted date string (e.g., "Today, 9:30 AM" or "Yesterday, 9:30 PM")
   */
  export const formatLogDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (isSameDay(date, today)) {
      return `Hôm nay, ${formatTime(timestamp)}`;
    } else if (isSameDay(date, yesterday)) {
      return `Hôm qua, ${formatTime(timestamp)}`;
    } else {
      return `${date.toLocaleDateString('vi', {
        month: 'short',
        day: 'numeric',
      })}, ${formatTime(timestamp)}`;
    }
  };