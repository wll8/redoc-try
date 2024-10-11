import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'try.js'),
      name: 'initTry',
      fileName: 'try',
    },
  },
  plugins: [vue()],
})
