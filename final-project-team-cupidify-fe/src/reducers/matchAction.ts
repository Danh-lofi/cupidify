import blockAPI from '@/api/blockApi';
import matchAPI from '@/api/matchApi';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const userMatch = createAsyncThunk('user/likeUser', async (id: string, thunkAPI) => {
    try {
        const res = await matchAPI.addMatch(id);
        return res;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getUserMatch = createAsyncThunk('user/getUserMatch', async (data, thunkAPI) => {
    try {
        const res = await matchAPI.getMyMatch();
        return res;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const handleBlockMatchUser = createAsyncThunk(
    'user/handleBlockMatchUser',
    async (blockedId: string, thunkApi) => {
        try {
            await blockAPI.blockedMatches(blockedId);
            return blockedId;
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    },
);
