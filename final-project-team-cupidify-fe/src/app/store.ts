import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import auth from '../reducers/authSlice';
import chat from '../reducers/chatSlice';
import loading from '../reducers/loadingSlice';
import map from '../reducers/mapSlice';
import match from '../reducers/matchSlice';
import notification from '../reducers/notificationSlice';
import photo from '../reducers/photoSlice';
import range from '../reducers/rangeSlice';
import socket from '../reducers/socketSlice';
import user from '../reducers/userSlice';

export const store = configureStore({
    reducer: {
        auth,
        map,
        user,
        photo,
        range,
        match,
        socket,
        chat,
        notification,
        loading,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
