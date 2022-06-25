import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import typescript from "@rollup/plugin-typescript";
import swc from "rollup-plugin-swc"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),swc({
    jsc: {
      parser: {
        syntax: "typescript",
        // tsx: true, // If you use react
        dynamicImport: true,
        decorators: true,
      },
      target: "es2021",
      transform: {
        decoratorMetadata: true,
      },
    },
  })],
  esbuild:false
})
