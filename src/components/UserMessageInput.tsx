import { createRef, useState } from 'react'
import { ArrowUpIcon } from '@heroicons/react/24/outline'
import Button from './Button'

export const UserMessageInput = function ({
    messagesCount,
    contextLength,
    disabled,
    onSend,
    userMessageSent,
}: {
    messagesCount: number
    contextLength: number
    disabled: boolean
    onSend: (text: string) => void
    userMessageSent: boolean
}) {
    const ref = createRef<HTMLTextAreaElement>()

    const [text, setText] = useState<string>('')

    const _onSend = () => {
        const _text = text.trim()
        if (disabled || _text.length === 0) return
        onSend(_text)
        setText('')
        if (ref.current) {
            ref.current.value = ''
            ref.current.focus()
        }
    }

    return (
        <div className="flex flex-row min-w-1/3 min-h-1/8 justify-center px-1 py-2 rounded overflow-hidden shadow-lg">
            <div className="flex flex-col w-100 justify-center">
                <div className="flex flex-row pb-2 justify-center">
                    {messagesCount === 0 ? (
                        <small>&nbsp;</small>
                    ) : (
                        <small className="text-gray-400">
                            conversation size: {messagesCount} message
                            {messagesCount > 1 ? 's' : ''}, context length:{' '}
                            {contextLength} character
                            {contextLength > 1 ? 's' : ''}
                        </small>
                    )}
                </div>
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col">
                        <textarea
                            defaultValue={text}
                            tabIndex={1}
                            className="bg-gray-100"
                            ref={ref}
                            onKeyDown={(ev) => {
                                if (ev.key === 'Enter') {
                                    ev.preventDefault()
                                    _onSend()
                                    setText('')
                                }
                            }}
                            onChange={(ev) => setText(ev.target.value)}
                            cols={38}
                            rows={2}
                            disabled={disabled}
                        />
                    </div>
                    <div className="flex flex-col justify-center">
                        <div className="flex flex-row">
                            <Button
                                icon={<ArrowUpIcon className="size-3" />}
                                text={userMessageSent ? 'sent' : 'send'}
                                tabIndex={2}
                                onClick={_onSend}
                                disabled={disabled || text.length === 0}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserMessageInput
