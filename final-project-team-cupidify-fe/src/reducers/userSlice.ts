import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { getProfile, handleBlockUser } from './userAction';

const initialState: IProfile = {
    userId: '',
    name: '',
    gender: '',
    birthday: '',
    description: '',
    reason: '',
    avatar: '',
    height: 0,
    religion: '',
    drinking: false,
    education: '',
    interests: [],
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetUser: () => {
            localStorage.removeItem('token');
            return initialState;
        },
        updateProfileUser: (state: IProfile, action: PayloadAction<Partial<IProfile>>) => {
            const updatedFields = action.payload;
            return { ...state, ...updatedFields };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getProfile.fulfilled, (state, { payload }) => {
            if (!payload) return;
            const { data } = payload;
            state.userId = data.userId;
            state.name = data.name;
            state.gender = data.gender;
            state.birthday = data.birthday;
            state.description = data.description;
            state.reason = data.reason;
            state.avatar = data.avatar;
            state.height = data.height;
            state.religion = data.religion;
            state.drinking = data.drinking;
            state.education = data.education;
            state.interests = data.interests;
        });
        builder.addCase(handleBlockUser.fulfilled, (state, { payload }) => {
            return state;
        });
    },
});

export const { resetUser, updateProfileUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
