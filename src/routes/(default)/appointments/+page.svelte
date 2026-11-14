<script lang="ts">
  import { onMount } from 'svelte';
  import 'vanilla-calendar-pro/styles/index.css';

  onMount(async () => {
    const { Calendar } = await import('vanilla-calendar-pro');
    const calendar = new Calendar('#calendar', {
      firstWeekday: 0,
      disableAllDates: true,
      enableDates: [
        '2026-11-16:2026-11-20',
        '2026-11-23:2026-11-27',
        '2026-11-30:2026-12-04',
      ]
    });
    calendar.init();
  });
</script>

<style>
  #calendar-outer-outer {
    display: flex;
  }

  #calendar-outer {
    display: flex;
    flex-grow: 0;
    flex-direction: row;
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

<div id="calendar-outer-outer">
  <div id="calendar-outer">
    <div id="calendar">
    </div>
    <div class="divider divider-horizontal divider-primary m-0"></div>
    <div id="time-picker">
      <h2 class="text-md font-bold">Available times</h2>
      <h3 class="text-sm">Tue Nov 17, 2026</h3>
      <!--<hr class="text-primary b-0" style="height: 2px"/>-->
      <div class="divider divider-primary m-0 p-px"></div>
      <ul class="list">
        <li class="my-1"><button class="btn w-full">9:00 am</button></li>
        <li class="my-1"><button class="btn w-full">11:00 am</button></li>
        <li class="my-1"><button class="btn w-full">2:00 pm</button></li>
      </ul>
    </div>
  </div>
</div>
