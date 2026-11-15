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

  async function getEnabledDates() {
    return Promise.resolve([
      '2026-11-16:2026-11-20',
      '2026-11-23:2026-11-27',
      '2026-11-30:2026-12-04',
    ]);
  }

  async function getTimeSlots(date: string | null) {
    if (date == null) {
      return Promise.resolve([]);
    }
    return Promise.resolve(['9:00 am', '11:00 am', '2:00 pm', '4:00 pm']);
  }

  let selectedDate: string | null = $state(null);

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
        } else {
          selectedDate = null;
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

  onMount(() => createAndDestroyCalendar());
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
        {#await getTimeSlots(selectedDate)}
          Loading...
        {:then slots}
          <ol class="list" role="list">
            {#each slots as slot}
              <li class="my-1"><button class="btn w-full">{slot}</button></li>
            {/each}
          </ol>
        {/await}
      </div>
    </div>
  </div>
</div>
