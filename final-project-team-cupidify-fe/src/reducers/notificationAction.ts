import notiApi from '@/api/notiApi';
import { limitNotiResult } from '@/utils/data';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getNotification = createAsyncThunk(
    'notification/getNotification',
    async (lastNotiId: string, thunkApi) => {
        try {
            const res = await notiApi.getAllNoti(lastNotiId);
            return res;
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    },
);

export const markReadNoti = createAsyncThunk(
    'notification/markRead',
    async (
        data: {
            notiId: string;
        },
        thunkApi,
    ) => {
        const { notiId } = data;
        try {
            const res = await notiApi.updateSeen(notiId);
            return res;
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    },
);

export const markAllNotiRead = createAsyncThunk('notification/markAllRead', async (data, thunkApi) => {
    try {
        const res = await notiApi.markAllRead();
        return res;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});

export const setInitialNotis = createAsyncThunk('notification/setInitialNotis', async (data, thunkApi) => {
    try {
        const res = await notiApi.getAllNoti(null);
        return res;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});
