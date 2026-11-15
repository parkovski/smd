<script lang="ts">
  import { onMount } from 'svelte';
  import { afterNavigate } from '$app/navigation';
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
      `${weekdays[newDate.getDay()]} ${months[newDate.getMonth()]} ${newDate.getDate()}, ${newDate.getFullYear()}`;
    return format;
  }

  const today = new Date();
  let selectedDate: string = $state(getLocalDateString(
    new Date(today.getTime() - today.getTimezoneOffset() * 60000)
  ));

  let calendar: Calendar | null;
  async function createCalendar(always: boolean) {
    const { Calendar } = await import('vanilla-calendar-pro');

    if (calendar && !always) {
      return;
    }
    calendar = new Calendar('#calendar', {
      firstWeekday: 0,
      disableAllDates: true,
      enableDates: [
        '2026-11-16:2026-11-20',
        '2026-11-23:2026-11-27',
        '2026-11-30:2026-12-04',
      ],
      onClickDate(self) {
        selectedDate = getLocalDateString(new Date(self.context.selectedDates[0]));
      }
    });
    calendar.init();
  }

  function createAndDestroyCalendar(always: boolean) {
    createCalendar(always);
    return () => {
      calendar?.destroy();
      calendar = null;
    };
  }

  onMount(() => createAndDestroyCalendar(true));
  afterNavigate(() => createAndDestroyCalendar(false));
</script>

<style>
  #calendar-outer {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    border: 2px solid var(--color-primary);
    border-radius: 8px;
    margin: 0 auto;
  }

  #time-picker {
    padding: 1rem;
  }

  @media (max-width: 800px) {
    #calendar-outer {
      flex-direction: column;
    }

    #time-picker {
      border-top: 2px solid var(--color-primary);
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
      <div id="time-picker">
        <h2 class="text-md font-bold">Available times</h2>
        <h3 class="text-sm">{selectedDate}</h3>
        <div class="divider divider-primary m-0 p-px"></div>
        <ol class="list" role="list">
          <li class="my-1"><button class="btn w-full">9:00 am</button></li>
          <li class="my-1"><button class="btn w-full">11:00 am</button></li>
          <li class="my-1"><button class="btn w-full">2:00 pm</button></li>
          <li class="my-1"><button class="btn w-full">4:00 pm</button></li>
        </ol>
      </div>
    </div>
  </div>
</div>
