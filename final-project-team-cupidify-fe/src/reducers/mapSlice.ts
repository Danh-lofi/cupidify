import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { createLocation } from './mapAction';

const initialState: IUpdateLocation = {
    latitude: 0,
    longitude: 0,
};

const mapSlice = createSlice({
    name: 'map',
    initialState: initialState,
    reducers: {
        updateLocation: (state, action) => {
            state.latitude = action.payload.lat;
            state.longitude = action.payload.long;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createLocation.fulfilled, (state, { payload }) => {
            if (!payload) return;
            const { data } = payload;
            state.latitude = data.lat;
            state.longitude = data.long;
        });
    },
});

export const selectMap = (state: RootState) => state.map;
export const { updateLocation } = mapSlice.actions;
export default mapSlice.reducer;
