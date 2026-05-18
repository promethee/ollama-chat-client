import type { IMessage, IIncomingMessage } from '../types'
import Markdown from 'react-markdown'

export const Message = ({
    message,
}: {
    message: IMessage | IIncomingMessage
}) => {
    return (
        <div className="flex flex-row p-4 rounded shadow-lg">
            <div className="flex flex-col">
                <small className="text-gray-300">
                    {(message as IMessage).role ?? 'assistant'}
                </small>
                <Markdown>{message.content}</Markdown>
                <div className="message-bottom"></div>
            </div>
        </div>
    )
}

export default Message
