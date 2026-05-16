import type { IMessage, IIncomingMessage } from '../types'
import Markdown from 'react-markdown'

export const Message = ({
    message,
}: {
    message: IMessage | IIncomingMessage
}) => {
    const isUser = (message as IMessage).role === 'user'
    return (
        <div className="flex flex-row p-4 rounded overflow-hidden shadow-lg">
            <div className="flex flex-col">
                <div className="flex flex-row justify-center text-gray-300">
                    <small>{(message as IMessage).role ?? 'assistant'}</small>
                </div>
                <div
                    className={`flex flex-row justify-${isUser ? 'end' : 'start'}`}
                >
                    <div className="flex flex-col">
                        <Markdown>{message.content}</Markdown>
                    </div>
                </div>
                <div className="message-bottom"></div>
            </div>
        </div>
    )
}

export default Message
