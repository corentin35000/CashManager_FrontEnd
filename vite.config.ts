import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { internalIpV4 } from 'internal-ip'
import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vitest/config'

// @ts-expect-error process is a nodejs global
const mobile: boolean = !!/android|ios/.exec(process.env.TAURI_ENV_PLATFORM)

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [vue()],
  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    host: '0.0.0.0',
    port: 1420,
    strictPort: true,
    hmr: mobile
      ? {
          protocol: 'ws',
          host: await internalIpV4(),
          port: 1421
        }
      : {
          clientPort: 1420
        },
    watch: {
      usePolling: true
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
}))
