import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['lib/index.ts', 'types/index.ts', 'configs/*.ts'],
  clean: true,
  dts: true,
  outDir: 'dist',
  format: ['cjs', 'esm']
})
