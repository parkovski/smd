<script lang="ts">
  import { browser } from '$app/env';

  // TODO: Send to booking status page.
  const redirect = (() => {
    if (browser) {
      return encodeURIComponent(window.location.origin + '/appointments/status');
    } else {
      return '/';
    }
  })();

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  function validateDate(date: string) {
    return /202[67]-(?:0[1-9]|10|11|12)-(?:[0-2][0-9]|30|31)/.test(date);
  }

  function validateTime(time: string) {
    return /(?:[01][0-9])|(?:2[0-3])-[0-5][0-9]/.test(time);
  }

  let emailError = $state(true);
  function validateEmail() {
    const email = (document.getElementById('email') as HTMLInputElement).value;
    emailError = !/[a-zA-Z0-9_.-]+@[a-zA-Z0-9_-]+(?:\.[a-zA-Z0-9_-])+/.test(email);
  }

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

  let dateError: string | null = $state(null);
  let timeError: string | null = $state(null);

  // These are essentially constants, they just have to be set in the
  // 'if (browser)' section, so just shut up svelte here.
  // svelte-ignore non_reactive_update
  let date: string | null = null;
  // svelte-ignore non_reactive_update
  let time: string | null = null;
  // svelte-ignore non_reactive_update
  let humanDate = 'unspecified';
  // svelte-ignore non_reactive_update
  let humanTime = 'unspecified';
  if (browser) {
    const params = new URLSearchParams(window.location.search ?? '');
    date = params.get('d');
    time = params.get('t');

    if (date && validateDate(date)) {
      humanDate = dateToHumanDate(date);
    } else {
      dateError = 'Invalid date';
    }

    if (time && validateTime(time)) {
      humanTime = timeToHumanTime(time);
    } else {
      timeError = 'Invalid time';
    }
  }
</script>

<div class="flex flex-row justify-center mb-4">
  <div class="flex flex-col">
    <div class="my-2">
      <h1 class="text-3xl">Book Appointment</h1>
      <hr class="h-px my-2 text-primary"/>
    </div>
    <div id="form-outer">
      <form action="https://api.shadowmtndigital.com/appointment?r={redirect}"
        enctype="application/x-www-form-urlencoded"
        method="post">
        <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend class="fieldset-legend">Book an Appointment</legend>
          {#if dateError}
            <p>Date: <span class="text-error">{dateError}</span></p>
          {:else}
            <p>Date: {humanDate}</p>
          {/if}
          {#if timeError}
            <p>Time: <span class="text-error">{timeError}</span></p>
          {:else}
            <p>Time: {humanTime}</p>
          {/if}
          <input type="hidden" name="date" value={date}/>
          <input type="hidden" name="time" value={time}/>
          <label class="label" for="email">Email</label>
          <input type="text" class="input" name="email" id="email"
            placeholder="Enter your email here"
            oninput={validateEmail}/>
          <label class="label" for="message">Message</label>
          <textarea class="textarea" name="message" id="message"
            placeholder="What is the purpose of your appointment?"
          ></textarea>
          {#if dateError || timeError}
            <div class="mt-2">
              <p class="text-error">
                Please go back and choose a valid date and time.
              </p>
            </div>
          {:else if emailError}
            <div class="mt-2">
              <p class="text-error">Please enter a valid email.</p>
            </div>
          {:else}
            <button class="btn btn-primary mt-2" type="submit">Submit</button>
          {/if}
        </fieldset>
      </form>
    </div>
  </div>
</div>
