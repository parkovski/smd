<script lang="ts">
  import { browser } from '$app/env';

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  function dateToHumanDate(dateStr: string) {
    let date = new Date(dateStr);
    const offset = date.getTimezoneOffset() * 60000;
    date = new Date(date.getTime() + offset);
    return `${weekdays[date.getDay()]} ${months[date.getMonth()]} ` +
           `${date.getDate()}, ${date.getFullYear()}`;
  }

  function timeToHumanTime(timeStr: string) {
    const colon = timeStr.indexOf(':');
    let hr, min: number;
    if (colon === -1) {
      hr = Number(timeStr);
      min = 0;
    } else {
      hr = Number(timeStr.substring(0, colon));
      min = Number(timeStr.substring(colon + 1));
    }

    let time: string;
    let ampm: string;
    if (hr >= 12) {
      ampm = 'pm';
      if (hr > 12) {
        hr -= 12;
      }
    } else if (hr === 0) {
      hr = 12;
      ampm = 'am';
    } else {
      ampm = 'am';
    }
    time = hr + ':' + String(min).padStart(2, '0') + ' ' + ampm;
    return time;
  }

  const [statusHeader, message] = (() => {
    if (browser) {
      const params = new URLSearchParams(window.location.search);
      const status = params.get('status');
      if (status === 'ok') {
        return [
          'Appointment booked',
          'Your appointment is confirmed for '
          + dateToHumanDate(params.get('date')!)
          + ' at ' + timeToHumanTime(params.get('time')!)
        ];
      } else if (status === 'error') {
        return [
          'Error',
          'The server returned: ' + params.get('message') + '.'
        ];
      } else {
        return [
          status ?? 'Unknown error',
          params.get('message') ?? 'No message specified.'
        ];
      }
    } else {
      return ['', ''];
    }
  })();
</script>

<div>
  <h2 class="text-lg font-bold">{statusHeader}</h2>
  <p>{message}</p>
</div>
