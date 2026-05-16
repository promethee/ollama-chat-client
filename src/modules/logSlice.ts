import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { IMessage, TLog } from '../types'

const initialState: TLog = JSON.parse(localStorage.getItem('log') ?? '[]')

export const logSlice = createSlice({
    name: 'log',
    initialState,
    reducers: {
        addUserMessage: (state, action: PayloadAction<string>) => {
            const date = Date.now()
            const _id = crypto.randomUUID()
            const message: IMessage = {
                _id,
                role: 'user',
                content: action.payload,
                date,
                isSummary: false,
            }
            state = [...state, message]
            localStorage.setItem('log', JSON.stringify(state))
            return state
        },
        addIncomingMessage: (state, action: PayloadAction<string>) => {
            const date = Date.now()
            const _id = crypto.randomUUID()
            const message: IMessage = {
                _id,
                role: 'assistant',
                content: action.payload,
                date,
                isSummary: false,
            }
            state = [...state, message]
            localStorage.setItem('log', JSON.stringify(state))
            return state
        },
        replaceMessageWithSummary: (state, action: PayloadAction<IMessage>) => {
            state = state.map((message: IMessage) =>
                message._id === action.payload._id
                    ? {
                          ...action.payload,
                          isSummary: true,
                      }
                    : message
            )
            localStorage.setItem('log', JSON.stringify(state))
            return state
        },
        clearHistory: (state) => {
            state = []
            localStorage.setItem('log', JSON.stringify(state))
            return state
        },
    },
})

export const {
    addUserMessage,
    addIncomingMessage,
    replaceMessageWithSummary,
    clearHistory,
} = logSlice.actions

export default logSlice.reducer
