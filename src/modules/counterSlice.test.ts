import { expect, test } from 'vitest'
import {
    counterSlice,
    decrement,
    increment,
    incrementByAmount,
} from './counterSlice'
import { configureStore } from '@reduxjs/toolkit'

test('counterSlice.decrement', async () => {
    const store = configureStore({ reducer: counterSlice.reducer })
    await store.dispatch(decrement())
    expect(store.getState()).toEqual({ value: -1 })
})

test('counterSlice.increment', async () => {
    const store = configureStore({ reducer: counterSlice.reducer })
    await store.dispatch(increment())
    expect(store.getState()).toEqual({ value: 1 })
})

test('counterSlice.incrementByAmount', async () => {
    const store = configureStore({ reducer: counterSlice.reducer })
    await store.dispatch(incrementByAmount(5))
    expect(store.getState()).toEqual({ value: 5 })
})
