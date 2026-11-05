<script lang="ts">
  import useEmblaCarousel from 'embla-carousel-svelte';
  import tusongLight from '#lib/assets/tusong-light.webp';
  import tusongDark from '#lib/assets/tusong-dark.webp';
  import unaccessible from '#lib/assets/unaccessible.webp';
  import parkovskiLight from '#lib/assets/parkovski-light.webp';
  import parkovskiDark from '#lib/assets/parkovski-dark.webp';

  let emblaApi: any;
  let options = { loop: false };
  function onInit(event:any) {
    emblaApi = event.detail;
  }
</script>

<style>
  .embla__viewport {
    overflow: hidden;
  }

  .embla__container {
    display: flex;
    touch-action: pan-y pinch-zoom;
  }

  .embla__slide {
    flex: 0 0 100%;
    min-width: 0;
  }

  .embla__controls {
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    gap: 1.2rem;
    margin-top: 0;
  }

  .embla__buttons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.6rem;
    align-items: center;
  }

  .embla__button {
    -webkit-tap-highlight-color: rgba(var(--text-high-contrast-rgb-value), 0.5);
    -webkit-appearance: none;
    appearance: none;
    background-color: transparent;
    touch-action: manipulation;
    display: inline-flex;
    text-decoration: none;
    cursor: pointer;
    border: 0;
    padding: 0;
    margin: 0;
    border: 0.2rem solid var(--detail-medium-contrast);
    width: 3.6rem;
    height: 3.6rem;

    z-index: 1;
    border-radius: 50%;
    color: var(--text-body);
    display: flex;
    align-items: center;
    justify-content: center;
    transform: rotate(0deg);
  }

  .embla__button__svg {
    width: 35%;
    height: 35%;
  }
</style>

<div class="embla">
  <!-- svelte-ignore event_directive_deprecated -->
  <div class="embla__viewport" on:emblainit={onInit} use:useEmblaCarousel={{ options }}>
    <div class="embla__container">
      <div class="embla__slide">
        <picture>
          <source srcset={tusongLight} media="(prefers-color-scheme: light)"/>
          <source srcset={tusongDark} media="(prefers-color-scheme: dark)"/>
          <img src={tusongLight} alt="Tusong Band Website" class="rounded-xl"/>
        </picture>
      </div>
      <div class="embla__slide">
        <img src={unaccessible} alt="Unaccessible Film Website" class="rounded-xl">
      </div>
      <div class="embla__slide">
        <picture>
          <source srcset={parkovskiLight} media="(prefers-color-scheme: light)"/>
          <source srcset={parkovskiDark} media="(prefers-color-scheme: dark)"/>
          <img src={parkovskiLight} alt="Parker's Personal Website" class="rounded-xl"/>
        </picture>
      </div>
    </div>
  </div>
  <div class="embla__controls">
    <div class="embla__buttons">
      <!-- svelte-ignore event_directive_deprecated -->
      <button class="embla__button embla__prev" aria-label="Previous" on:click={() => emblaApi?.goToPrev()}>
        <svg class="embla__button__svg" viewBox="0 0 532 532">
          <path
            fill="currentColor"
            d="M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354Z"
          ></path>
        </svg>
      </button>
      <!-- svelte-ignore event_directive_deprecated -->
      <button class="embla__button embla__next" aria-label="Next" on:click={() => emblaApi?.goToNext()}>
        <svg class="embla__button__svg" viewBox="0 0 532 532">
          <path
            fill="currentColor"
            d="M176.34 520.646c-13.793 13.805-36.208 13.805-50.001 0-13.785-13.804-13.785-36.238 0-50.034L330.78 266 126.34 61.391c-13.785-13.805-13.785-36.239 0-50.044 13.793-13.796 36.208-13.796 50.002 0 22.928 22.947 206.395 206.507 229.332 229.454a35.065 35.065 0 0 1 10.326 25.126c0 9.2-3.393 18.26-10.326 25.2-45.865 45.901-206.404 206.564-229.332 229.52Z"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</div>
