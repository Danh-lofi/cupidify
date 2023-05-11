import photoAPI from '@/api/photoApi';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { resetUser } from './userSlice';

export const getListPhoto = createAsyncThunk('photo/getListPhoto', async (data, thunkApi) => {
    try {
        const res = await photoAPI.getMyPhotos();
        return res;
    } catch (error) {
        thunkApi.dispatch(resetUser());
        return thunkApi.rejectWithValue(error);
    }
});

export const updateFavorite = createAsyncThunk(
    'photo/updateFavorite',
    async (
        data: {
            publicId: string;
        },
        thunkApi,
    ) => {
        try {
            const res = await photoAPI.updateFavorite(data.publicId);
            return res;
        } catch (error) {
            thunkApi.dispatch(resetUser());
            return thunkApi.rejectWithValue(error);
        }
    },
);

export const updateAvatar = createAsyncThunk(
    'photo/updateAvatar',
    async (
        data: {
            publicId: string;
        },
        thunkApi,
    ) => {
        try {
            const res = await photoAPI.updateAvatar(data.publicId);
            return res;
        } catch (error) {
            thunkApi.dispatch(resetUser());
            return thunkApi.rejectWithValue(error);
        }
    },
);
