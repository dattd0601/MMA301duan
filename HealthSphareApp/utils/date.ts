/**
 * Trả về ngày hiện tại dưới dạng chuỗi đã định dạng
 * @returns {string} Chuỗi ngày đã định dạng (ví dụ: "Thứ Hai, ngày 1 tháng 1")
 */
import dayjs from 'dayjs'
import 'dayjs/locale/vi' // Import ngôn ngữ tiếng Việt
import relativeTime from 'dayjs/plugin/relativeTime'

// Cấu hình dayjs để hỗ trợ thời gian tương đối và ngôn ngữ Tiếng Việt
dayjs.extend(relativeTime)
dayjs.locale('vi')

/**
 * Lấy ngày hiện tại và định dạng theo chuẩn Tiếng Việt
 * @returns {string} Chuỗi ngày (ví dụ: "thứ hai, 1 tháng 1")
 */
export const getCurrentDate = (): string => {
    const date = new Date();
    return date.toLocaleDateString('vi', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };
  
  /**
   * Định dạng dấu thời gian thành chuỗi giờ dễ đọc
   * @param {number} timestamp - Dấu thời gian cần định dạng
   * @returns {string} Chuỗi giờ đã định dạng (ví dụ: "9:30 SA")
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
   * Kiểm tra xem hai ngày có cùng một ngày hay không
   * @param {Date} date1 - Ngày thứ nhất để so sánh
   * @param {Date} date2 - Ngày thứ hai để so sánh
   * @returns {boolean} True nếu hai ngày giống nhau
   */
  export const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };
  
  /**
   * Trả về thời điểm bắt đầu của ngày hiện tại (00:00:00)
   * @returns {Date} Đối tượng Date được thiết lập vào đầu ngày hiện tại
   */
  export const startOfToday = (): Date => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  };

  /**
   * Trả về thời điểm kết thúc của ngày hiện tại (23:59:59.999)
   * @returns {Date} Đối tượng Date được thiết lập vào cuối ngày hiện tại
   */
  export const endOfToday = (): Date => {
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    return today;
  };

  /**
   * Trả về ngày đầu tiên của tuần hiện tại (Thứ Hai)
   * @returns {Date} Đối tượng Date được thiết lập vào đầu tuần hiện tại
   */
  export const getStartOfWeek = (): Date => {
    const today = new Date();
    const day = today.getDay(); // 0 is Sunday, 1 is Monday...
    const diff = today.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    const startOfWeek = new Date(today.setDate(diff));
    startOfWeek.setHours(0, 0, 0, 0);
    return startOfWeek;
  };
  
  /**
   * Định dạng ngày để hiển thị trong nhật ký (logs)
   * Sử dụng các từ khóa "Hôm nay", "Hôm qua" nếu phù hợp
   * @param {number} timestamp - Dấu thời gian cần định dạng
   * @returns {string} Chuỗi ngày đã định dạng (ví dụ: "Hôm nay, 9:30 SA")
   */
  export const formatLogDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // Kiểm tra xem là hôm nay hay hôm qua để hiển thị nhãn thân thiện
    if (isSameDay(date, today)) {
      return `Hôm nay, ${formatTime(timestamp)}`;
    } else if (isSameDay(date, yesterday)) {
      return `Hôm qua, ${formatTime(timestamp)}`;
    } else {
      // Định dạng ngày thông thường nếu không phải hôm nay/hôm qua
      return `${date.toLocaleDateString('vi', {
        month: 'short',
        day: 'numeric',
      })}, ${formatTime(timestamp)}`;
    }
  };