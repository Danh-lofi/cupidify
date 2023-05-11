import { RootState } from '@/app/store';
import { createSlice } from '@reduxjs/toolkit';
import { Socket } from 'socket.io-client';

interface ISocket {
    socketChat: Socket | null;
    socketNotify: Socket | null;
}

const initialState: ISocket = {
    socketChat: null,
    socketNotify: null,
};

export const socketSlice = createSlice({
    name: 'socket',
    initialState: initialState,
    reducers: {
        setSocketChat: (state, action) => {
            if (!action.payload) return;
            state.socketChat = action.payload;
        },
        setSocketNotify: (state, action) => {
            if (!action.payload) return;
            state.socketNotify = action.payload;
        },
    },
});

export const { setSocketChat, setSocketNotify } = socketSlice.actions;
export const selectSocket = (state: RootState) => state.socket;

export default socketSlice.reducer;
