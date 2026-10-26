<script lang="ts">
  import './layout.css';
  import favicon from '#lib/assets/favicon.svg';
  import saguaro from '#lib/assets/saguaro.svg';
  import type { LayoutProps } from './$types';
  import { dev } from '$app/env';

  let { children }: LayoutProps = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div class="max-md:collapse bg-primary shadow-sm w-full rounded-xs">
  <input id="navbar-1-toggle" class="peer hidden" type="checkbox"/>
  <label for="navbar-1-toggle" class="fixed inset-0 hidden max-md:peer-checked:block"></label>
  <div class="collapse-title navbar py-0 cursor-default">
    <div class="navbar-start">
      <label for="navbar-1-toggle" class="btn btn-ghost hover:bg-base-200/50 border-0 md:hidden text-primary-content">
        <svg aria-label="Menu" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <a class="pl-2" href="/"><img src={saguaro} style="height: 64px;" alt="Logo"></a>
    </div>
    <div class="navbar-center hidden md:flex">
      <ul class="menu menu-horizontal px-1 text-primary-content text-lg font-bold">
        <li><a class="link link-hover" href="/">Home</a></li>
        <li><a class="link link-hover" href="/portfolio">Portfolio</a></li>
        <li><a class="link link-hover" href="/calendar">Calendar</a></li>
        <li><a class="link link-hover" href="/contact">Contact</a></li>
      </ul>
    </div>
    <div class="navbar-end">
      <ul class="menu menu-horizontal text-primary-content text-lg font-bold pr-0">
        <li><a class="link link-hover" href="/about">About</a></li>
      </ul>
    </div>
  </div>
  <div class="collapse-content md:hidden z-1">
    <ul class="menu text-primary-content text-lg font-bold">
      <li><a class="link link-hover" href="/">Home</a></li>
      <li><a class="link link-hover" href="/portfolio">Portfolio</a></li>
      <li><a class="link link-hover" href="/calendar">Calendar</a></li>
      <li><a class="link link-hover" href="/contact">Contact</a></li>
    </ul>
  </div>
</div>
{@render children()}
<footer class="footer sm:footer-horizontal footer-center bg-neutral text-neutral-content p-4">
  <aside>
    <p>Copyright &copy; 2026 Shadow Mountain Digital</p>
  </aside>
</footer>
