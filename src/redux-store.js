import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './reducers/authreducer'
import { shareReducer } from './reducers/shareReducer'
import { getTimelinePostReducer } from './reducers/getPostReducer'
import { updateDataReducer } from './reducers/updateDataReducer'
import { chatReducer } from './reducers/chatReducer'
import { deletePostReducer } from './reducers/deletePostReducer'

export const store = configureStore({
    reducer: {
        authReducer,
        shareReducer,
        getTimelinePostReducer,
        updateDataReducer,
        chatReducer,
        deletePostReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})