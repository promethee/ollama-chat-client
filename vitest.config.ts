import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        globals: true,
        setupFiles: ['./src/setupTests.ts'],
        environment: 'jsdom',
        exclude: ['node_modules/*', '**/HelloWorld.test.tsx'],
        coverage: {
            provider: 'v8',
            include: ['src/**/*.{ts,tsx}'],
            exclude: ['node_modules/*', '**/main.tsx', '**/test-utils.tsx'],
        },
    },
})
