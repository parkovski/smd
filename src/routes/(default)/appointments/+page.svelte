<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { type Calendar } from 'vanilla-calendar-pro';

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  function getLocalDateString(date: Date) {
    const offset = date.getTimezoneOffset() * 60000;
    const newDate = new Date(date.getTime() + offset);
    const format =
      `${weekdays[newDate.getDay()]} ${months[newDate.getMonth()]} ` +
      `${newDate.getDate()}, ${newDate.getFullYear()}`;
    return format;
  }

  async function getEnabledDates(): Promise<string[]> {
    const ranges: (string | [string, string])[] =
      await (
        await fetch('https://api.shadowmtndigital.com/appointment/ranges')
      ).json();
    return ranges.map(r => {
      if (Array.isArray(r)) {
        return `${r[0]}:${r[1]}`;
      }
      return r;
    });
  }

  async function getTimeSlots(date: string | null) {
    if (date == null) {
      return Promise.resolve([]);
    }
    return await (
      await fetch(`https://api.shadowmtndigital.com/appointment/${date}`)
    ).json();
  }

  let selectedDate: string | null = $state(null);
  let isoDate: string | null = $state(null);

  let calendar: Calendar | null;
  async function createCalendar() {
    const { Calendar } = await import('vanilla-calendar-pro');

    if (calendar) {
      return;
    }
    calendar = new Calendar('#calendar', {
      firstWeekday: 0,
      disableAllDates: true,
      enableDates: await getEnabledDates(),
      onClickDate(self) {
        if (self.context.selectedDates?.[0]) {
          selectedDate = getLocalDateString(new Date(self.context.selectedDates[0]));
          isoDate = self.context.selectedDates[0];
        } else {
          selectedDate = null;
          isoDate = null;
        }
      }
    });
    calendar.init();
  }

  function createAndDestroyCalendar() {
    createCalendar();
    return () => {
      calendar?.destroy();
      calendar = null;
    };
  }

  onMount(createAndDestroyCalendar);

  function toAmPm(time: string) {
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

  function bookApt(timeslot: string) {
    goto('/appointments/book?d=' + isoDate + '&t=' + timeslot);
  }
</script>

<style>
  #calendar-outer {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    border: 2px solid var(--color-primary);
    border-radius: 1rem;
    margin: 0 auto;
  }

  #time-picker {
    padding: 1rem;
  }

  #time-picker > h2, #time-picker > h3 {
    text-align: center;
  }

  @media (max-width: 768px) {
    #calendar-outer {
      flex-direction: column;
    }

    #time-picker {
      border-top: 2px solid var(--color-primary);
      align-self: stretch;
    }
  }
</style>

<div class="flex flex-row justify-center mb-4">
  <div class="flex flex-col">
    <div class="my-2">
      <h1 class="text-3xl">Appointments</h1>
      <hr class="h-px my-2 text-primary"/>
    </div>
    <div id="calendar-outer">
      <div id="calendar" class="vc" style="border-width: 0">
      </div>
      <div class="divider divider-horizontal divider-primary m-0"></div>
      <div id="time-picker" style="flex: 1 0 auto">
        <h2 class="text-md font-bold">Available times</h2>
        <h3 class="text-sm">
          {selectedDate == null ? 'No date selected' : selectedDate}
        </h3>
        <div class="divider divider-primary m-0 p-px"></div>
        {#await getTimeSlots(isoDate)}
          <p class="text-center">Loading...</p>
        {:then slots}
          <ol class="list" role="list">
            {#each slots as slot}
              <li class="my-1">
                <button class="btn w-full" onclick={() => bookApt(slot)}>{toAmPm(slot)}</button>
              </li>
            {/each}
          </ol>
        {/await}
      </div>
    </div>
  </div>
</div>
