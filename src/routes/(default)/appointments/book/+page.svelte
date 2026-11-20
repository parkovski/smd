<script lang="ts">
  import { browser } from '$app/env';
  import {
    validateDate, validateTime, isoDateToReadableDate, timeToAmPmTime
  } from '#lib/datetime.ts';

  const redirect = (() => {
    if (browser) {
      return encodeURIComponent(window.location.origin + '/appointments/status');
    } else {
      return '/';
    }
  })();

  let nameError = $state(true);
  let emailError = $state(true);

  function validateName() {
    const name = (document.getElementById('name') as HTMLInputElement).value;
    nameError = name.length === 0;
  }

  function validateEmail() {
    const email = (document.getElementById('email') as HTMLInputElement).value;
    emailError = !/[a-zA-Z0-9_.-]+@[a-zA-Z0-9_-]+(?:\.[a-zA-Z0-9_-])+/.test(email);
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
      humanDate = isoDateToReadableDate(date);
    } else {
      dateError = 'Invalid date';
    }

    if (time && validateTime(time)) {
      humanTime = timeToAmPmTime(time);
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
          <label class="label" for="name">Name</label>
          <input type="text" class="input" name="name" id="name"
            placeholder="Enter your name here"
            oninput={validateName}/>
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
          {:else if nameError}
            <div class="mt-2">
              <p class="text-error">Please enter your name.</p>
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
