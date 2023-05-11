import { RootState } from '@/app/store';
import { createSlice } from '@reduxjs/toolkit';
interface IInitialState {
    isLoading: boolean;
}
const initialState: IInitialState = {
    isLoading: false,
};

const loadingSlice = createSlice({
    name: 'loading',
    initialState: initialState,
    reducers: {
        setLoading: (state, action) => {
            if (action) {
                state.isLoading = action.payload;
            }
        },
    },
});

export const selectLoading = (state: RootState) => state.loading.isLoading;
export const { setLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
