import { RootState } from '@/app/store';
import { createSlice } from '@reduxjs/toolkit';
import { getNotification, markAllNotiRead, markReadNoti, setInitialNotis } from './notificationAction';

declare enum MatchType {
    LIKED = 'LIKED',
    MATCHING = 'MATCHING',
    MESSAGE = 'MESSAGE',
}

interface IInitialState {
    notis: IUserNoti[];
    totalPages: number;
    unreadNotis: number;
}

const initialState: IInitialState = {
    notis: [],
    totalPages: 0,
    unreadNotis: 0,
};

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotis: (state, action) => {
            state.notis = action.payload;
        },
        pushNoti: (state, action) => {
            state.notis.unshift(action.payload);
            state.unreadNotis++;
        },
        markRead: (state, action) => {
            const noti = state.notis.find((noti) => noti.id === action.payload);
            if (!noti) return;
            noti.isSeen = true;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(setInitialNotis.fulfilled, (state, { payload }) => {
            if (!payload) return;
            const { data } = payload;
            state.notis = data.noti;
            state.totalPages = data.totalPages;
            state.unreadNotis = data.unreadNotis;
        });
        builder.addCase(getNotification.fulfilled, (state, { payload }) => {
            if (!payload) return;
            const { data } = payload;
            data.noti.forEach((noti: IUserNoti) => state.notis.push(noti));
            state.totalPages = data.totalPages;
            state.unreadNotis = data.unreadNotis;
        });
        builder.addCase(markReadNoti.fulfilled, (state, { payload }) => {
            if (!payload) return;
            const { data } = payload;
            const noti = state.notis.find((noti) => noti.id === data.notiId);
            if (!noti || noti.isSeen) return;
            noti.isSeen = true;
            state.unreadNotis--;
        });
        builder.addCase(markAllNotiRead.fulfilled, (state, { payload }) => {
            state.notis.forEach((noti) => (noti.isSeen = true));
            state.unreadNotis = 0;
        });
    },
});

export const selectNotification = (state: RootState) => state.notification;
export const { setNotis, pushNoti, markRead } = notificationSlice.actions;
export default notificationSlice.reducer;
