import mapAPI from '@/api/mapApi';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createLocation = createAsyncThunk(
    'map/createLocation',
    async (data: { long: number; lat: number }, thunkApi) => {
        try {
            const mapLocation = await mapAPI.createLogin(data);
            return mapLocation;
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    },
);
