import { IUserRegister } from '../types/interface';
import { mainAxios } from './axiosConfig';
const ENDPOINT = `auth`;

const authAPI = {
    register: (user: IUserRegister) =>
        mainAxios.post(`${ENDPOINT}/signup`, {
            ...user,
        }),

    login: (phone: string, tokenOtp: string) =>
        mainAxios.post(`${ENDPOINT}/login`, {
            phone,
            token: tokenOtp,
        }),

    loginNotOtp: (phone: string) =>
        mainAxios.post(`${ENDPOINT}/login-otp`, {
            phone,
        }),
};
export default authAPI;
