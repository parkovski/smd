const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export function validateDate(date: string) {
  return /202[67]-(?:0[1-9]|10|11|12)-(?:[0-2][0-9]|30|31)/.test(date);
}

export function validateTime(time: string) {
  return /(?:[01][0-9])|(?:2[0-3])-[0-5][0-9]/.test(time);
}

export function getLocalDateString(date: Date) {
  const offset = date.getTimezoneOffset() * 60000;
  const newDate = new Date(date.getTime() + offset);
  const format =
    `${weekdays[newDate.getDay()]} ${months[newDate.getMonth()]} ` +
    `${newDate.getDate()}, ${newDate.getFullYear()}`;
  return format;
}

export function isoDateToReadableDate(isoDate: string) {
  let date = new Date(isoDate);
  const offset = date.getTimezoneOffset() * 60000;
  date = new Date(date.getTime() + offset);
  return `${weekdays[date.getDay()]} ${months[date.getMonth()]} ` +
         `${date.getDate()}, ${date.getFullYear()}`;
}

export function timeToAmPmTime(time: string) {
  const match = /(\d+):(\d+)/.exec(time);
  if (match === null) {
    return time;
  }

  const hr = parseInt(match[1]);
  const min = parseInt(match[2]);
  let ampm: string;
  let r: string;

  if (hr < 12) {
    ampm = 'am';
    if (hr === 0) {
      r = '12';
    } else {
      r = '' + hr;
    }
  } else {
    ampm = 'pm';
    if (hr == 12) {
      r = '12';
    } else {
      r = '' + (hr - 12);
    }
  }

  r += ':';
  if (min === 0) {
    r += '00';
  } else if (min < 10) {
    r += '0' + min;
  } else {
    r += min;
  }

  r += ' ' + ampm;

  return r;
}
