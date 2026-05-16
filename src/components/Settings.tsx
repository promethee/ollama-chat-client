import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../store'
import type { ISettings } from '../types'
import { useState } from 'react'
import { set } from '../modules/settingsSlice'

export const Settings = () => {
    const { url, stream, sendPreviousMessage }: ISettings = useSelector(
        (state: RootState) => state.settings
    )
    const dispatch = useDispatch()

    const [ollamaUrl, setOllamaUrl] = useState(url)
    const [ollamaStream, setOllamaStream] = useState(stream)
    const [ollamaPreviousMessage, setOllamaPreviousMessage] = useState(stream)

    return (
        <div className="flex flex-row min-w-1/3 min-h-1/8 justify-center px-1 py-2 rounded overflow-hidden shadow-lg">
            <div className="flex flex-col w-100 justify-center">
                <div className="flex flex-row justify-center">
                    <div className="flex flex-col">
                        <div className="flex flex-row justify-between">
                            <label className="pr-2">url: </label>
                            <input
                                className="px-2 border-slate-200 shadow-sm focus:shadow"
                                type="url"
                                value={ollamaUrl}
                                onChange={(ev) => setOllamaUrl(ev.target.value)}
                                size={25}
                            />
                        </div>
                        <div className="flex flex-row">
                            <label className="pr-2">stream: </label>
                            <input
                                type="checkbox"
                                checked={ollamaStream}
                                onChange={(ev) =>
                                    setOllamaStream(ev.target.checked)
                                }
                            />
                        </div>
                        <div className="flex flex-row">
                            <label className="pr-2">
                                send previous messages:{' '}
                            </label>
                            <input
                                type="checkbox"
                                checked={ollamaPreviousMessage}
                                onChange={(ev) =>
                                    setOllamaPreviousMessage(ev.target.checked)
                                }
                            />
                        </div>
                        <div className="flex flex-row justify-end">
                            <button
                                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-0 px-1 border border-gray-400 rounded shadow"
                                onClick={() => {
                                    dispatch(
                                        set({
                                            url: ollamaUrl,
                                            stream: ollamaStream,
                                            sendPreviousMessage:
                                                ollamaPreviousMessage,
                                        })
                                    )
                                }}
                            >
                                save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings
