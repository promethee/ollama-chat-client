import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Counter } from './Counter'
import { Provider } from 'react-redux'
import { setupStore } from '../store'
import userEvent from '@testing-library/user-event'

test('renders the counter span with initial count of 0', () => {
    render(
        <Provider store={setupStore()}>
            <Counter />
        </Provider>
    )
    expect(screen.queryByTestId('counter')).toBeInTheDocument()
})

test('renders the increment button', () => {
    render(
        <Provider store={setupStore()}>
            <Counter />
        </Provider>
    )
    expect(screen.queryByTestId('increment-button')).toBeInTheDocument()
})

test('renders the decrement button', () => {
    render(
        <Provider store={setupStore()}>
            <Counter />
        </Provider>
    )
    expect(screen.queryByTestId('decrement-button')).toBeInTheDocument()
})

test('clicking the increment button will increment the count', async () => {
    const user = userEvent.setup()

    render(
        <Provider store={setupStore()}>
            <Counter />
        </Provider>
    )
    expect(screen.queryByText(/Count is 0/i)).toBeInTheDocument()
    const button = screen.getByTestId('increment-button')
    await user.click(button)
    expect(screen.queryByText(/Count is 1/i)).toBeInTheDocument()
})

test('clicking the decrement button will decrement the count', async () => {
    const user = userEvent.setup()

    render(
        <Provider store={setupStore()}>
            <Counter />
        </Provider>
    )
    expect(screen.queryByText(/Count is 0/i)).toBeInTheDocument()
    const button = screen.getByTestId('decrement-button')
    await user.click(button)
    expect(screen.queryByText(/Count is -1/i)).toBeInTheDocument()
})
