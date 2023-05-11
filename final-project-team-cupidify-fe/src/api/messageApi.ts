import { mainAxios } from './axiosConfig';
const ENDPOINT = `message`;

const messageAPI = {
    getAllMessage: (conversationId: string | string[] | undefined, lastMessageId: string | null) =>
        mainAxios.get(`${ENDPOINT}`, {
            params: {
                conversationId,
                lastMessageId,
            },
        }),

    sendPhoto: (formData: any) =>
        mainAxios.post(`${ENDPOINT}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }),
};
export default messageAPI;
