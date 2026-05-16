export interface IOllamaModel {
    name: string
    model: string
    digest: string
}

export interface ISettings {
    url: string
    stream: boolean
    sendPreviousMessage: boolean
    models: IOllamaModel[]
    model?: IOllamaModel
    show: boolean
    compactionInProgress: boolean
}

export interface IIncomingMessage {
    content: string
}

export interface IMessage extends IIncomingMessage {
    _id: string
    date: number
    role: string
    isSummary: boolean
}

export type TLog = IMessage[]
