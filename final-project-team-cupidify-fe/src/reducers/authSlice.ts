import { RootState } from '@/app/store';
import { createSlice } from '@reduxjs/toolkit';

enum IType {
    Login = 'login',
    Register = 'register',
    SocialLogin = 'social_login',
    SocialRegister = 'social_register',
}

interface IInfoUser {
    phone: string;
    name: string;
    email: string;
    birthday: string;
    gender: string;
    socialId?: string;
}
interface IInitialState {
    type: IType;
    infoUser: IInfoUser;
    isLogin: boolean;
}
const initialState: IInitialState = {
    type: IType.Login,
    infoUser: {
        phone: '',
        name: '',
        email: '',
        birthday: '',
        gender: '',
        socialId: undefined,
    },
    isLogin: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setRegister: (state, action) => {
            state.type = IType.Register;
            state.infoUser.phone = action.payload;
        },
        setAuthUser: (state, action) => {
            state.type = IType.SocialRegister;
            state.infoUser = action.payload;
        },
        setSocialLogin: (state, action) => {
            state.type = IType.SocialLogin;
            state.infoUser = action.payload;
        },
        setPhones: (state, action) => {
            state.infoUser.phone = action.payload;
        },
        setLogin: (state, action) => {
            if (!action) return;
            state.isLogin = action.payload;
        },
    },
});

export const selectAuth = (state: RootState) => state.auth;
export const { setRegister, setPhones, setAuthUser, setSocialLogin, setLogin } = authSlice.actions;
export default authSlice.reducer;
