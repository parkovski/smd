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

<navbar class="navbar bg-primary pb-0 pt-0 border-b border-b-neutral">
  <div class="navbar-start">
    <img src={saguaro} style="height: 64px;" class="pr-2" alt="Logo">
    <h1 class="text-primary-content text-lg font-bold">SMD</h1>
  </div>
  <div class="navbar-end">
    Hello
  </div>
</navbar>
{@render children()}
<footer class="footer sm:footer-horizontal footer-center bg-neutral text-neutral-content p-4">
  <aside>
    <p>Copyright &copy; 2026 Shadow Mountain Digital</p>
  </aside>
</footer>
