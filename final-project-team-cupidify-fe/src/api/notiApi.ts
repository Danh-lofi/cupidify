import { mainAxios } from './axiosConfig';
const ENDPOINT = 'notification';

const notiApi = {
    getAllNoti: (lastNotiId: string | null) =>
        mainAxios.get(`${ENDPOINT}`, {
            params: {
                lastNotiId,
            },
        }),

    updateSeen: (notiId: string) => mainAxios.put(`${ENDPOINT}`, { notiId }),

    markAllRead: () => mainAxios.put(`${ENDPOINT}/markAllRead`),
};
export default notiApi;
