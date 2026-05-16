import { combineReducers, configureStore } from '@reduxjs/toolkit'
import settingsReducer from './modules/settingsSlice'
import logReducer from './modules/logSlice'
import messageToApi from './middlewares/messageToApi'

const rootReducer = combineReducers({
    log: logReducer,
    settings: settingsReducer,
})

export function setupStore(preloadedState?: PreloadedState) {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(messageToApi),
    })
}

export type PreloadedState = Parameters<typeof rootReducer>[0]
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
