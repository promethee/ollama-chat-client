import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'
import { Provider } from 'react-redux'
import { setupStore } from './store'

describe.skip('App', () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })

    it('renders the heading', () => {
        render(
            <Provider store={setupStore()}>
                <App />
            </Provider>
        )
        expect(screen.getByTestId('heading')).toBeInTheDocument()
    })

    it('renders the description paragraph', () => {
        render(
            <Provider store={setupStore()}>
                <App />
            </Provider>
        )
        expect(screen.getByTestId('description')).toBeInTheDocument()
    })

    it('renders documentation section', () => {
        render(
            <Provider store={setupStore()}>
                <App />
            </Provider>
        )
        expect(screen.getByTestId('documentation')).toBeInTheDocument()
    })

    it('renders social section', () => {
        render(
            <Provider store={setupStore()}>
                <App />
            </Provider>
        )
        expect(screen.getByTestId('social')).toBeInTheDocument()
    })
})
