import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import { viteSingleFile } from "vite-plugin-singlefile"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [solid(), viteSingleFile()],
  build: {
    outDir: 'dist-inline',
  },
})