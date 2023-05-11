import { mainAxios } from './axiosConfig';
const ENDPOINT = `black-list`;
const blockAPI = {
    getBlackList: (phone: string) => mainAxios.post(`${ENDPOINT}/check-phone`, { phone }),

    blockUser: (blockedId: string) => mainAxios.post(`${ENDPOINT}`, { blockedId }),

    blockedMatches: (blockedId: string) => mainAxios.post(`${ENDPOINT}/block-user`, { blockedId }),
};
export default blockAPI;
