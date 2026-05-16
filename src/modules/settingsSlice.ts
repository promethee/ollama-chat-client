import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { ISettings } from '../types'

const initialState: ISettings = ((settings: string) => {
    if (settings === '{}') {
        return {
            url: 'http://localhost:11434/api',
            stream: false,
            sendPreviousMessage: true,
        }
    }
    return JSON.parse(settings)
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
        set: (
            state,
            action: PayloadAction<{
                url: string
                stream: boolean
                sendPreviousMessage: boolean
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

export const { setUrl, setStream, setSendPreviousMessage, set } =
    settingsSlice.actions

export default settingsSlice.reducer
