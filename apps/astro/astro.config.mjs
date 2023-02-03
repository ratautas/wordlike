import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import vercel from "@astrojs/vercel/edge";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), tailwind()],
  // output: 'static',
  output: 'server',
  adapter: vercel()
});