import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ["./build/tests/**/*.test.js"]
  },
})
