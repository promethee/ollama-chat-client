import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../store'
import type { IOllamaModel, ISettings } from '../types'
import { useState } from 'react'
import {
    setModel,
    setUrl,
    setSendPreviousMessage,
    setStream,
} from '../modules/settingsSlice'

export const Settings = () => {
    const { url, stream, sendPreviousMessage, models, model }: ISettings =
        useSelector((state: RootState) => state.settings)
    const dispatch = useDispatch()

    const [ollamaUrl, setOllamaUrl] = useState(url)

    return (
        <div className="flex flex-row min-w-1/3 min-h-1/8 justify-center px-1 py-2 rounded overflow-hidden shadow-lg">
            <div className="flex flex-col w-100 justify-center">
                <div className="flex flex-row justify-center">
                    <div className="flex flex-col">
                        <div className="flex flex-row justify-between">
                            <label className="pr-2">model: </label>
                            <select
                                className="disabled:text-gray-400 text-gray-800"
                                disabled={models.length === 1}
                                onChange={(ev) => {
                                    const _model = models.find(
                                        (__model: IOllamaModel) =>
                                            __model.model === ev.target.value
                                    )
                                    if (_model) {
                                        dispatch(setModel(_model))
                                    }
                                }}
                            >
                                {models.map((_model: IOllamaModel) => (
                                    <option
                                        key={_model.digest}
                                        defaultValue={model?.model}
                                    >
                                        {_model.model}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-row justify-between">
                            <label className="pr-2">url: </label>
                            <input
                                className="px-2 border-slate-200 shadow-sm focus:shadow"
                                type="url"
                                value={ollamaUrl}
                                onChange={(ev) => setOllamaUrl(ev.target.value)}
                                onBlur={() => dispatch(setUrl(ollamaUrl))}
                                size={25}
                            />
                        </div>
                        <div className="flex flex-row">
                            <label className="pr-2">stream: </label>
                            <input
                                type="checkbox"
                                checked={stream}
                                onChange={(ev) =>
                                    dispatch(setStream(ev.target.checked))
                                }
                            />
                        </div>
                        <div className="flex flex-row">
                            <label className="pr-2">
                                send previous messages:{' '}
                            </label>
                            <input
                                type="checkbox"
                                checked={sendPreviousMessage}
                                onChange={(ev) =>
                                    dispatch(
                                        setSendPreviousMessage(
                                            ev.target.checked
                                        )
                                    )
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings
