import { mainAxios } from './axiosConfig';
const ENDPOINT = `conversation`;

const conversationAPI = {
    createConversation: (userToId: string) => mainAxios.post(ENDPOINT, { userToId }),

    getConversations: () => mainAxios.get(ENDPOINT),
};
export default conversationAPI;
