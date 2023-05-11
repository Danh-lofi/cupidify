import { RootState } from '@/app/store';
import { createSlice } from '@reduxjs/toolkit';

interface IRange {
    range: number;
}

const initialState: IRange = {
    range: 500,
};

const rangeSlice = createSlice({
    name: 'range',
    initialState: initialState,
    reducers: {
        setRange: (state, action) => {
            state.range = action.payload.range;
        },
    },
});

export const selectRange = (state: RootState) => state.range;
export const { setRange } = rangeSlice.actions;
export default rangeSlice.reducer;
