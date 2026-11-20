<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { type Calendar } from 'vanilla-calendar-pro';
  import { getLocalDateString, timeToAmPmTime } from '#lib/datetime.ts';

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
  let calendarPromise: Promise<void> | null = $state(null);
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
    calendarPromise = createCalendar();
    return () => {
      calendar?.destroy();
      calendar = null;
    };
  }

  onMount(createAndDestroyCalendar);

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

  @media (max-width: 32rem) {
    #calendar-outer {
      flex-direction: column;
    }

    #time-picker {
      border-top: 2px solid var(--color-primary);
      align-self: stretch;
    }
  }
</style>

<div class="flex flex-row justify-center mb-4 max-w-lg m-auto">
  <div class="flex flex-col">
    <div class="mt-2">
      <h1 class="text-3xl">Appointments</h1>
      <hr class="h-px my-2 text-primary"/>
    </div>
    <div class="mb-4">
      <p>
        * If you want to meet at a time not listed, pick the time closest to
        your desired time and clarify in your message.
      </p>
      <p class="mt-2">
        * The highlighted day is today and not necessarily available for
        meetings. Please choose a different day.
      </p>
    </div>
    <div id="calendar-outer">
      <div id="calendar" class="vc" style="border-width: 0">
        {#await calendarPromise}
          <p class="text-center">Loading calendar...</p>
        {/await}
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
                <button class="btn w-full" onclick={() => bookApt(slot)}>{timeToAmPmTime(slot)}</button>
              </li>
            {/each}
          </ol>
        {/await}
      </div>
    </div>
  </div>
</div>
