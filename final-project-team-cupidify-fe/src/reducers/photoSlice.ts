import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { getListPhoto, updateFavorite } from './photoAction';

const initialState: IPhoto[] = [
    {
        id: '',
        isFavorite: false,
        photoUrl: '',
        publicId: '',
    },
];

export const photoSlice = createSlice({
    name: 'photo',
    initialState,
    reducers: {
        updateStateFavorite(
            state,
            { payload: { id, isFavorite } }: PayloadAction<{ id: string; isFavorite: boolean }>,
        ) {
            const photo = state.find((photo) => photo.id === id);
            if (photo) {
                photo.isFavorite = isFavorite;
            }
        },
        deletePhoto(state, action: PayloadAction<string>) {
            const index = state.findIndex((p) => p.publicId === action.payload);
            if (index !== -1) {
                state.splice(index, 1);
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getListPhoto.fulfilled, (state, { payload }) => {
            const { data } = payload;
            return data;
        });
        builder.addCase(updateFavorite.fulfilled, (state, { payload }) => {
            const { data } = payload;
            const photo = state.find((photo) => photo.id === data.id);
            if (photo) {
                photo.isFavorite = data.isFavorite;
            }
        });
    },
});

export const { updateStateFavorite, deletePhoto } = photoSlice.actions;
export const selectPhoto = (state: RootState) => state.photo;

export default photoSlice.reducer;
