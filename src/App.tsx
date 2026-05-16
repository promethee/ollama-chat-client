import './App.css'
import Settings from './components/Settings'
import MessageBox from './components/MessagesBox'
import UserMessageInput from './components/UserMessageInput'
import { Ollama } from 'ollama'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import type { RootState } from './store'
import { useEffect, useState } from 'react'
import type { IMessage } from './types'
import {
    addIncomingMessage,
    addUserMessage,
    clearHistory,
    replaceMessageWithSummary,
} from './modules/logSlice'
import {
    setCompactionInProgress,
    setModel,
    setModels,
    setShow,
} from './modules/settingsSlice'

function App() {
    const {
        messages,
        stream,
        url,
        models,
        model,
        show: showSettings,
        compactionInProgress,
    } = useSelector(
        (state: RootState) => ({
            messages: state.log,
            stream: state.settings.stream,
            url: state.settings.url,
            models: state.settings.models,
            model: state.settings.model,
            show: state.settings.show,
            compactionInProgress: state.settings.compactionInProgress,
        }),
        shallowEqual
    )
    const dispatch = useDispatch()

    const hasModel = model !== undefined
    const hasModels = models.length > 0

    const noModel = model === undefined
    const noModels = models.length === 0
    const noMessages = messages.length === 0

    const [ollamaInstance] = useState<InstanceType<typeof Ollama>>(
        new Ollama({ host: url })
    )

    const [incomingMessage, setIncomingMessage] = useState('')
    const [userMessageSent, setUserMessageSent] = useState(false)

    useEffect(() => {
        ;(async () => {
            if (models.length > 0) {
                if (model === undefined && models.length === 1) {
                    dispatch(setModel(models[0]))
                }
                return
            }
            const response = await ollamaInstance.list()
            console.info(response)
            dispatch(setModels(response.models))
        })()
    }, [model, models, dispatch, ollamaInstance])

    const onSend = async (text: string) => {
        if (model === undefined || compactionInProgress || text.length === 0)
            return
        dispatch(addUserMessage(text))
        const filteredMessages = messages.map(({ role, content }) => ({
            role,
            content,
        }))
        const response = await ollamaInstance.chat({
            model: model.name,
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
        if (model === undefined) return
        dispatch(setCompactionInProgress(true))

        messages
            .filter(
                (message: IMessage) =>
                    message.role !== 'user' && message.isSummary === false
            )
            .forEach(async (message: IMessage) => {
                const { response: content } = await ollamaInstance.generate({
                    model: model.name,
                    prompt: `summarize the following sentence: "${message.content}" into a single precise and concise sentence, do not reflect on your task, just do it.`,
                })
                dispatch(
                    replaceMessageWithSummary({
                        ...message,
                        content,
                    })
                )
            })
        dispatch(setCompactionInProgress(false))
    }

    const cantCompact =
        noModel ||
        !messages.some(
            (message: IMessage) =>
                message.role !== 'user' && message.isSummary === false
        )

    const contextLength = (localStorage.getItem('log')?.length || 2) - 2
    const chatOrSettingsButtonText = showSettings ? 'chat' : 'settings'
    const compactionButtonText = compactionInProgress
        ? 'compacting'
        : 'compact chat history'

    const clearHistoryDisabled = compactionInProgress || noMessages
    const userInputDisabled =
        noModel || noModels || compactionInProgress || userMessageSent

    return (
        <div className="flex flex-col p-4 h-screen justify-center">
            <MessageBox messages={messages} incomingMessage={incomingMessage} />
            <div className="flex flex-row h-1/5 justify-center">
                <div className="flex flex-col justify-center">
                    <div className="flex flex-row justify-between">
                        <button
                            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-0 px-1 border border-gray-400 rounded shadow"
                            onClick={() => {
                                dispatch(setShow(!showSettings))
                            }}
                        >
                            <small>{chatOrSettingsButtonText}</small>
                        </button>
                        <button
                            className="bg-white disabled:text-gray-200 hover:bg-gray-100 text-gray-800 font-semibold py-0 px-1 border border-gray-400 rounded shadow"
                            onClick={onCompacting}
                            disabled={cantCompact}
                        >
                            <small>{compactionButtonText}</small>
                        </button>
                        <button
                            className="bg-white disabled:text-gray-200 hover:bg-gray-100 text-gray-800 font-semibold py-0 px-1 border border-gray-400 rounded shadow"
                            onClick={() => dispatch(clearHistory())}
                            disabled={clearHistoryDisabled}
                        >
                            <small>clear history</small>
                        </button>
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
                                    contextLength={contextLength}
                                    disabled={userInputDisabled}
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
