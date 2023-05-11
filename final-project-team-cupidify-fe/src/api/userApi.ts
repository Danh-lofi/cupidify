import { mainAxios } from './axiosConfig';
const ENDPOINT = `user`;

const userAPI = {
    checkPhone: (phone: string) => mainAxios.post(`${ENDPOINT}/check-phone`, { phone }),

    checkSocial: (socialId: string) => mainAxios.post(`${ENDPOINT}/check-social`, { socialId }),
};
export default userAPI;
