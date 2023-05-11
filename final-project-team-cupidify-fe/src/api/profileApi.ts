import { IProfileUpdateData } from '@/types/interface';
import { mainAxios } from './axiosConfig';
const ENDPOINT = `profile`;
const profileAPI = {
    getProfile: () => mainAxios.get(`${ENDPOINT}`),

    updateProfile: (profile: IProfileUpdateData) => mainAxios.put(`${ENDPOINT}`, profile),
};
export default profileAPI;
