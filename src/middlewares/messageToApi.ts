export const messageToApi = (store) => (next) => (action) => {
    // console.info('messageToApi', { action })
    if (action.type === 'log/addUserMessage') {
        // (async () => {
        // })()
    }
    return next(action)
}

export default messageToApi
