import { defineConfig } from 'vite';
import dotenv from 'dotenv';
import react from '@vitejs/plugin-react';

// Load environment variables from .env
dotenv.config();

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
  },
  base: process.env.VITE_PUBLIC_URL || '/', // Use process.env for Vite config
});
