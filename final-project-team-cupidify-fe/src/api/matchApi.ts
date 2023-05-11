import { mainAxios } from './axiosConfig';
const ENDPOINT = `match`;

const matchAPI = {
    getMyMatch: () => mainAxios.get(`${ENDPOINT}`),

    addMatch: (matchedId: string) => mainAxios.post(`${ENDPOINT}`, { matchedId }),
};
export default matchAPI;
