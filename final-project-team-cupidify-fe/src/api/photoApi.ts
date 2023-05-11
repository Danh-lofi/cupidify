import { mainAxios } from './axiosConfig';
const ENDPOINT = `photo`;
const photoAPI = {
    getMyPhotos: () => mainAxios.get(`${ENDPOINT}`),

    getTinderPhotos: (id: string) => mainAxios.get(`${ENDPOINT}/${id}`),

    uploadImages: (formData: any) =>
        mainAxios.post(`${ENDPOINT}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }),

    updateFavorite: (publicId: string) =>
        mainAxios.put(`${ENDPOINT}/favorite`, {
            publicId,
        }),

    removeImage: (publicId: string) => mainAxios.delete(`${ENDPOINT}/${publicId}`),

    updateAvatar: (publicId: string) =>
        mainAxios.put(`${ENDPOINT}/set-avatar`, {
            publicId,
        }),
};
export default photoAPI;
