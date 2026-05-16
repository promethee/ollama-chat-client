import { combineReducers, configureStore } from '@reduxjs/toolkit'
import settingsReducer from './modules/settingsSlice'
import logReducer from './modules/logSlice'

const rootReducer = combineReducers({
    log: logReducer,
    settings: settingsReducer,
})

export function setupStore(preloadedState?: PreloadedState) {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
    })
}

export type PreloadedState = Parameters<typeof rootReducer>[0]
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
