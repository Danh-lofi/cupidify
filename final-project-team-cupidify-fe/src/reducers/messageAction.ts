import { limitMessageResult } from '@/utils/data';
import { createAsyncThunk } from '@reduxjs/toolkit';
import messageAPI from '../api/messageApi';

export const setInitialMessages = createAsyncThunk(
    'message/setInitialMessages',
    async (conversationId: string, thunkApi) => {
        try {
            const res = await messageAPI.getAllMessage(conversationId, null);
            return res;
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    },
);

export const getListMessage = createAsyncThunk('getListMessage', async (data: IMessageQuery, thunkApi) => {
    try {
        const { conversationId, lastMessageId } = data;
        const res = await messageAPI.getAllMessage(conversationId, lastMessageId);
        return res;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});

export const sendPhotoMessage = createAsyncThunk('message/send', async (formData: any, thunkApi) => {
    try {
        const res = await messageAPI.sendPhoto(formData);
        return res;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});
