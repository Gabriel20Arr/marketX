import { configureStore } from "@reduxjs/toolkit";
import counterSlice from '../features/countSlice';
import { userApi } from "../services/userApi";
import { setupListeners} from '@reduxjs/toolkit/dist/query'

export const store = configureStore({
    reducer:{
        counterSlice,
        [userApi.reducerPath]: userApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([userApi.middleware])
});

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;