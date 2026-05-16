import './App.css'
import Settings from './components/Settings'
import MessageBox from './components/MessagesBox'
import UserMessageInput from './components/UserMessageInput'
import { Ollama } from 'ollama'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import type { RootState } from './store'
import { useState } from 'react'
import type { IMessage } from './types'
import {
    addIncomingMessage,
    addUserMessage,
    clearHistory,
    replaceMessageWithSummary,
} from './modules/logSlice'

function App() {
    const { messages, stream, url } = useSelector(
        (state: RootState) => ({
            messages: state.log,
            stream: state.settings.stream,
            url: state.settings.url,
        }),
        shallowEqual
    )
    const dispatch = useDispatch()

    const [ollamaInstance] = useState<InstanceType<typeof Ollama>>(
        new Ollama({ host: url })
    )

    const [incomingMessage, setIncomingMessage] = useState('')
    const [showSettings, setShowSettings] = useState(false)
    const [userMessageSent, setUserMessageSent] = useState(false)
    const [compactionInProgress, setCompactionInProgress] = useState(false)

    const onSend = async (text: string) => {
        if (compactionInProgress || text.length === 0) return
        dispatch(addUserMessage(text))
        const model = 'llama3.1'
        const filteredMessages = messages.map(({ role, content }) => ({
            role,
            content,
        }))
        const response = await ollamaInstance.chat({
            model,
            messages: filteredMessages.concat({ role: 'user', content: text }),
            stream,
        })
        if (stream) {
            let incomingMessage = ''
            for await (const part of response) {
                const { done, message } = part
                if (done) {
                    dispatch(addIncomingMessage(incomingMessage))
                    onIncomingMessage('')
                } else {
                    incomingMessage += message.content
                    onIncomingMessage(incomingMessage)
                }
            }
        } else {
            dispatch(addIncomingMessage(response.message.content))
        }
    }

    const onIncomingMessage = (content: string) => {
        setUserMessageSent(false)
        setIncomingMessage(content)
    }

    const onCompacting = async () => {
        setCompactionInProgress(true)

        const model = 'llama3.1'
        messages
            .filter(
                (message: IMessage) =>
                    message.role !== 'user' && message.isSummary === false
            )
            .forEach(async (message: IMessage) => {
                const { response: content } = await ollamaInstance.generate({
                    model,
                    prompt: `summarize the following sentence: "${message.content}" into a single precise and concise sentence, do not reflect on your task, just do it.`,
                })
                dispatch(
                    replaceMessageWithSummary({
                        ...message,
                        content,
                    })
                )
            })
        setCompactionInProgress(false)
    }

    const canCompact = messages.some(
        (message: IMessage) =>
            message.role !== 'user' && message.isSummary === false
    )

    return (
        <div className="flex flex-col p-4 h-screen justify-center">
            <MessageBox messages={messages} incomingMessage={incomingMessage} />
            <div className="flex flex-row h-1/5 justify-center">
                <div className="flex flex-col justify-center">
                    <div className="flex flex-row justify-evenly">
                        <button
                            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-0 px-1 border border-gray-400 rounded shadow"
                            onClick={() => {
                                setShowSettings((_show) => !_show)
                            }}
                        >
                            <small>{showSettings ? 'chat' : 'settings'}</small>
                        </button>
                        {messages.length > 0 && (
                            <button
                                className="bg-white disabled:text-gray-200 hover:bg-gray-100 text-gray-800 font-semibold py-0 px-1 border border-gray-400 rounded shadow"
                                onClick={onCompacting}
                                disabled={compactionInProgress || !canCompact}
                            >
                                <small>
                                    {compactionInProgress
                                        ? 'compacting'
                                        : 'compact chat history'}
                                </small>
                            </button>
                        )}
                        {messages.length > 0 && (
                            <button
                                className="bg-white disabled:text-gray-200 hover:bg-gray-100 text-gray-800 font-semibold py-0 px-1 border border-gray-400 rounded shadow"
                                onClick={() => dispatch(clearHistory())}
                                disabled={
                                    compactionInProgress ||
                                    messages.length === 0
                                }
                            >
                                <small>clear history</small>
                            </button>
                        )}
                    </div>

                    <div className="flex flex-row">
                        {showSettings ? (
                            <div className="flex flex-col">
                                <Settings />
                            </div>
                        ) : (
                            <div className="flex flex-col">
                                <UserMessageInput
                                    messagesCount={messages.length}
                                    contextLength={
                                        (localStorage.getItem('log')?.length ||
                                            2) - 2
                                    }
                                    disabled={
                                        compactionInProgress || userMessageSent
                                    }
                                    onSend={onSend}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
