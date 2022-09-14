import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './reducers/authreducer'
import { shareReducer } from './reducers/shareReducer'
import { getTimelinePostReducer } from './reducers/getPostReducer'
import { updateDataReducer } from './reducers/updateDataReducer'
import { chatReducer } from './reducers/chatReducer'

export const store = configureStore({
    reducer: {
        authReducer,
        shareReducer,
        getTimelinePostReducer,
        updateDataReducer,
        chatReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})