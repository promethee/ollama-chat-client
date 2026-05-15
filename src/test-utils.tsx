import React from 'react'
import type { PropsWithChildren } from 'react'
import { render } from 'vitest-browser-react'
import type { RenderOptions } from 'vitest-browser-react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'

import { type AppStore, type PreloadedState, setupStore } from './store'

interface ExtendedRendedOptions extends Omit<
    RenderOptions,
    'queries' | 'wrapper'
> {
    preloadedState?: PreloadedState
    store?: AppStore
}

export function renderWithProviders(
    ui: React.ReactElement,
    extendedRenderOptions: ExtendedRendedOptions = {}
) {
    const {
        preloadedState = {},
        store = setupStore(preloadedState),
        ...renderOptions
    } = extendedRenderOptions

    const Wrapper = ({ children }: PropsWithChildren) => (
        <Provider store={store}>{children}</Provider>
    )

    return {
        store,
        user: userEvent.setup(),
        ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    }
}
