<script lang="ts">
  import { browser } from '$app/env';
  import { isoDateToReadableDate, timeToAmPmTime } from '#lib/datetime.ts';

  const [statusHeader, message] = (() => {
    if (browser) {
      const params = new URLSearchParams(window.location.search);
      const status = params.get('status');
      if (status === 'ok') {
        return [
          'Appointment booked',
          'Your appointment is confirmed for '
          + isoDateToReadableDate(params.get('date')!)
          + ' at ' + timeToAmPmTime(params.get('time')!)
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
