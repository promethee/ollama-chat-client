import { createRef, useState } from 'react'

export const UserMessageInput = function ({
    messagesCount,
    contextLength,
    disabled,
    onSend,
}: {
    messagesCount: number
    contextLength: number
    disabled: boolean
    onSend: (text: string) => void
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
                <div className="flex flex-row pb-2">
                    <small className="text-gray-400">
                        conversation size: {messagesCount} messages, context
                        length: {contextLength} tokens
                    </small>
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
                            <button
                                tabIndex={2}
                                className="bg-white disabled:text-gray-200 hover:bg-gray-100 text-gray-800 font-semibold py-0 px-1 border border-gray-400 rounded shadow"
                                onClick={_onSend}
                                disabled={disabled || text.length === 0}
                            >
                                send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserMessageInput
