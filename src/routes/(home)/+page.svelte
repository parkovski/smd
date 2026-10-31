<script lang="ts">
  import '../layout.css';
  import favicon from '#lib/assets/favicon.svg';
  import saguaro from '#lib/assets/saguaro-circle.svg';
  import pianoRoad from '#lib/assets/piano-road-sm.webp';
</script>

<svelte:head>
  <link rel="icon" href={favicon}/>
</svelte:head>

<style>
  @media (max-height: 550px) {
    #title-text {
      top: -7.5rem !important;
    }
  }
</style>

<div
  class="hero min-h-screen"
  style="background-image: url({pianoRoad})"
>
  <div class="hero-content text-center">
    <div id="title-text" class="max-w-md relative -top-40 2xl:-top-50 header-text text-gray-200">
      <h1 class="text-4xl font-bold pb-2" style="text-shadow: 2px 2px 2px black">Shadow Mountain Digital</h1>
      <h2 class="text-2xl" style="text-shadow: 2px 2px 2px black">Creative Technology Solutions</h2>
    </div>
  </div>
</div>
<div class="max-md:collapse bg-primary/30 text-black shadow-sm w-full rounded-xl border-b border-primary/50 absolute top-0">
  <input id="navbar-1-toggle" class="peer hidden" type="checkbox"/>
  <label for="navbar-1-toggle" class="fixed inset-0 hidden max-md:peer-checked:block"></label>
  <div class="collapse-title navbar py-0 cursor-default">
    <div class="navbar-start">
      <label for="navbar-1-toggle" class="btn btn-ghost hover:bg-base-200/50 text-black border-0 md:hidden">
        <svg aria-label="Menu" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <a class="pl-2" href="/"><img src={saguaro} style="height: 64px;" alt="Logo"></a>
    </div>
    <div class="navbar-center hidden md:flex">
      <ul class="menu menu-horizontal px-1 text-lg font-bold">
        <li><a class="link link-hover" href="/">Home</a></li>
        <li><a class="link link-hover" href="/portfolio">Portfolio</a></li>
        <li><a class="link link-hover" href="/calendar">Calendar</a></li>
        <li><a class="link link-hover" href="/contact">Contact</a></li>
      </ul>
    </div>
    <div class="navbar-end">
      <ul class="menu menu-horizontal text-lg font-bold pr-0">
        <li><a class="link link-hover" href="/about">About</a></li>
      </ul>
    </div>
  </div>
  <div class="collapse-content bg-primary/75 md:hidden z-1 rounded-b-xl">
    <ul class="menu text-lg font-bold">
      <li><a class="link link-hover" href="/">Home</a></li>
      <li><a class="link link-hover" href="/portfolio">Portfolio</a></li>
      <li><a class="link link-hover" href="/calendar">Calendar</a></li>
      <li><a class="link link-hover" href="/contact">Contact</a></li>
    </ul>
  </div>
</div>
<footer class="footer sm:footer-horizontal footer-center bg-neutral text-neutral-content p-4">
  <aside>
    <p>Copyright &copy; 2026 Shadow Mountain Digital</p>
  </aside>
</footer>
