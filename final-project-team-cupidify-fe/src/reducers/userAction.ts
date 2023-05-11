import blockAPI from '@/api/blockApi';
import profileAPI from '@/api/profileApi';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { resetUser } from './userSlice';

export const getProfile = createAsyncThunk('user/getProfile', async (data, thunkApi) => {
    try {
        const user = await profileAPI.getProfile();
        return user;
    } catch (error) {
        thunkApi.dispatch(resetUser());
        return thunkApi.rejectWithValue(error);
    }
});

export const handleBlockUser = createAsyncThunk('user/handleBlockUser', async (blockedId: string, thunkApi) => {
    try {
        const res = await blockAPI.blockUser(blockedId);
        return res;
    } catch (error) {
        thunkApi.dispatch(resetUser());
        return thunkApi.rejectWithValue(error);
    }
});
