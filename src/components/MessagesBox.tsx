import Message from './Message'
import type { IMessage, TLog } from '../types'
import { useEffect } from 'react'

export const MessageBox = ({
    incomingMessage,
    messages,
    userMessageSent,
}: {
    incomingMessage: string
    messages: TLog
    userMessageSent: boolean
}) => {
    useEffect(() => {
        const id = setTimeout(() => {
            document.getElementById('incoming-message-bottom')?.scrollIntoView()
            if (messages.length > 0) {
                const { _id } = messages[messages.length - 1]
                document
                    .querySelector(
                        `#chat-message-${_id} .message-bottom::after`
                    )
                    ?.scrollIntoView()
            }
        }, 100)
        return () => {
            clearTimeout(id)
        }
    }, [messages, incomingMessage])

    if (messages.length === 0 && incomingMessage.length === 0) return null
    return (
        <div className="flex flex-row h-4/5 justify-center">
            <div className="flex flex-col h-auto max-w-7/10 justify-center overflow-y-auto p-8">
                {messages.map((message: IMessage) => (
                    <div
                        key={message._id}
                        id={`chat-message-${message._id}`}
                        className={`flex flex-row chat-message ${message.role}-message`}
                    >
                        <Message message={message} />
                    </div>
                ))}
                <div
                    id="incoming-message"
                    className={`flex flex-row mt-2${userMessageSent ? ' waiting-for-response' : ''}`}
                >
                    <div className="flex flex-col mt-2">
                        {incomingMessage.length > 0 && (
                            <Message message={{ content: incomingMessage }} />
                        )}
                        <span id="incoming-message-bottom">&nbsp;</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MessageBox
