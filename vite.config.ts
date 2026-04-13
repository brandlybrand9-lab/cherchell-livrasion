import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  
  const tgBot = process.env.VITE_TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN || env.VITE_TELEGRAM_BOT_TOKEN || env.TELEGRAM_BOT_TOKEN;
  const tgChat = process.env.VITE_TELEGRAM_CHAT_ID || process.env.TELEGRAM_CHAT_ID || env.VITE_TELEGRAM_CHAT_ID || env.TELEGRAM_CHAT_ID;
  
  const defines: Record<string, any> = {
    'process.env.GEMINI_API_KEY': JSON.stringify(process.env.GEMINI_API_KEY || env.GEMINI_API_KEY),
  };
  
  if (tgBot) defines['import.meta.env.VITE_TELEGRAM_BOT_TOKEN'] = JSON.stringify(tgBot);
  if (tgChat) defines['import.meta.env.VITE_TELEGRAM_CHAT_ID'] = JSON.stringify(tgChat);

  return {
    plugins: [react(), tailwindcss()],
    define: defines,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
