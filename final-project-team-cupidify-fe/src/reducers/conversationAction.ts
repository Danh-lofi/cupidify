import { createAsyncThunk } from '@reduxjs/toolkit';
import conversationAPI from '../api/conversationApi';

export const getConversation = createAsyncThunk('conversation', async (data, thunkApi) => {
    try {
        const res = await conversationAPI.getConversations();
        return res;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});

export const createConversation = createAsyncThunk('conversation/create', async (userToId: string, thunkApi) => {
    try {
        const res = await conversationAPI.createConversation(userToId);
        return res;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});
