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
                    .querySelector(`#chat-message-${_id} .message-bottom`)
                    ?.scrollIntoView()
            }
        }, 300)
        return () => {
            clearTimeout(id)
        }
    }, [messages, incomingMessage])

    if (messages.length === 0 && incomingMessage.length === 0) return null

    return (
        <div className="flex flex-row w-full h-4/5 justify-center">
            <div className="flex flex-col w-full max-w-7/10 justify-center overflow-y-scroll">
                {messages.map((message: IMessage) => (
                    <div
                        key={message._id}
                        id={`chat-message-${message._id}`}
                        className={`flex flex-row justify-${message.role === 'user' ? 'end' : 'start'}`}
                    >
                        <Message message={message} />
                    </div>
                ))}
                <div
                    id="incoming-message"
                    className={`flex flex-row mt-2${userMessageSent ? ' waiting-for-response' : ''}`}
                >
                    <div className="flex flex-col">
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
