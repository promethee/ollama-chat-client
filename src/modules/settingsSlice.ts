import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { IOllamaModel, ISettings } from '../types'

const initialState: ISettings = ((settings: string) => {
    if (settings === '{}') {
        return {
            url: 'http://localhost:11434/api',
            stream: false,
            sendPreviousMessage: true,
            models: [],
            show: false,
            compactionInProgress: false,
        }
    }

    const previousSettings = JSON.parse(settings)
    return {
        ...previousSettings,
        url: previousSettings.url ?? 'http://localhost:11434/api',
        stream: previousSettings.stream ?? false,
        sendPreviousMessage: previousSettings.sendPreviousMessage ?? true,
        models: previousSettings.models ?? [],
        show: previousSettings.show ?? false,
        compactionInProgress: previousSettings.compactionInProgress ?? false,
    }
})(localStorage.getItem('settings') ?? '{}')

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setUrl: (state, action: PayloadAction<string>) => {
            state.url = action.payload
            localStorage.setItem('settings', JSON.stringify(state))
            return state
        },
        setStream: (state, action: PayloadAction<boolean>) => {
            state.stream = action.payload
            localStorage.setItem('settings', JSON.stringify(state))
            return state
        },
        setSendPreviousMessage: (state, action: PayloadAction<boolean>) => {
            state.sendPreviousMessage = action.payload
            localStorage.setItem('settings', JSON.stringify(state))
            return state
        },
        setModel: (state, action: PayloadAction<IOllamaModel>) => {
            state.model = action.payload
            localStorage.setItem('settings', JSON.stringify(state))
            return state
        },
        setModels: (state, action: PayloadAction<IOllamaModel[]>) => {
            state.models = action.payload
            localStorage.setItem('settings', JSON.stringify(state))
            return state
        },
        setShow: (state, action: PayloadAction<boolean>) => {
            state.show = action.payload
            localStorage.setItem('settings', JSON.stringify(state))
            return state
        },
        setCompactionInProgress: (state, action: PayloadAction<boolean>) => {
            state.compactionInProgress = action.payload
            localStorage.setItem('settings', JSON.stringify(state))
            return state
        },
        set: (
            state,
            action: PayloadAction<{
                url: string
                stream: boolean
                sendPreviousMessage: boolean
                models: IOllamaModel[]
            }>
        ) => {
            state.url = action.payload.url
            state.stream = action.payload.stream
            state.sendPreviousMessage = action.payload.sendPreviousMessage
            localStorage.setItem('settings', JSON.stringify(state))
            return state
        },
    },
})

export const {
    setUrl,
    setStream,
    setSendPreviousMessage,
    setModel,
    setModels,
    setShow,
    setCompactionInProgress,
    set,
} = settingsSlice.actions

export default settingsSlice.reducer
