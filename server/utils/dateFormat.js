// ESM date formatter with suffix support
const addDateSuffix = (date) => {
  let dateStr = String(date);
  const last = dateStr.slice(-1);
  const lastTwo = dateStr.slice(-2);

  if (last === '1' && lastTwo !== '11') return `${dateStr}st`;
  if (last === '2' && lastTwo !== '12') return `${dateStr}nd`;
  if (last === '3' && lastTwo !== '13') return `${dateStr}rd`;
  return `${dateStr}th`;
};

export default function dateFormat(
  timestamp,
  { monthLength = 'short', dateSuffix = true } = {}
) {
  const monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthsLong = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dateObj = new Date(timestamp);
  const months = monthLength === 'short' ? monthsShort : monthsLong;
  const formattedMonth = months[dateObj.getMonth()];

  const day = dateObj.getDate();
  const dayOfMonth = dateSuffix ? addDateSuffix(day) : day;
  const year = dateObj.getFullYear();

  // Proper 12-hour conversion
  const hours24 = dateObj.getHours();
  const hour12 = hours24 % 12 || 12;

  // Zero-pad minutes
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');

  const periodOfDay = hours24 >= 12 ? 'pm' : 'am';

  return `${formattedMonth} ${dayOfMonth}, ${year} at ${hour12}:${minutes} ${periodOfDay}`;
}