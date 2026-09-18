/** Fixture de integração com Astro, MDX, React e o CSS gerado pelo Astrofy. */
import {defineConfig} from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({integrations:[react(),mdx()],vite:{plugins:[tailwindcss()]}});
