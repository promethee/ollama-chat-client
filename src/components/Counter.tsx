import React from 'react'
import type { RootState } from '../store'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../modules/counterSlice'

export const Counter = () => {
    const count = useSelector((state: RootState) => state.counter.value)
    const dispatch = useDispatch()

    return (
        <div>
            <div>
                <button
                    aria-label="Increment value"
                    className="increment"
                    data-testid="decrement-button"
                    onClick={() => dispatch(decrement())}
                >
                    -
                </button>
                <span data-testid="counter" className="mx-2">
                    Count is {count}
                </span>
                <button
                    aria-label="Decrement value"
                    className="decrement"
                    data-testid="increment-button"
                    onClick={() => dispatch(increment())}
                >
                    +
                </button>
            </div>
        </div>
    )
}
