import { defineConfig } from 'vitest/config'
import { preview } from '@vitest/browser-preview'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    test: {
        include: ['HelloWorld.test.tsx'],
        exclude: ['node_modules/*', 'HelloWorld.test.tsx', '**/*.test.tsx'],
        browser: {
            enabled: true,
            provider: preview(),
            instances: [
                // { browser: 'chrome' },
                { browser: 'firefox' },
                // { browser: 'safari' },
            ],
        },
    },
})
