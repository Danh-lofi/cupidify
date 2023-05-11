import photoAPI from '@/api/photoApi';
import profileAPI from '@/api/profileApi';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { ArrowLeft } from '@/components/icons';
import AlbumsImage from '@/components/profile/albumImage';
import Title from '@/components/title';
import { deletePhoto, selectPhoto, updateStateFavorite } from '@/reducers/photoSlice';
import { selectUser, updateProfileUser } from '@/reducers/userSlice';
import { toastError, toastSuccess } from '@/utils/toast';
import { useRouter } from 'next/router';
import styles from './albums.module.scss';

export default function Albums() {
    const router = useRouter();
    const sPhoto = useAppSelector(selectPhoto);
    const sUser = useAppSelector(selectUser);
    const dispatch = useAppDispatch();

    const handleFavorite = (url: string) => async () => {
        try {
            photoAPI.updateFavorite(url);
            const updatedPhoto = sPhoto.find((p) => p.publicId === url);
            if (updatedPhoto) {
                const newIsFavorite = !updatedPhoto.isFavorite;

                dispatch(
                    updateStateFavorite({
                        id: updatedPhoto.id,
                        isFavorite: newIsFavorite,
                    }),
                );
            }
            toastSuccess('Cập nhật ảnh yêu thích thành công!');
        } catch (error) {
            console.log((error as IResponseError).error);
        }
    };

    const handleSetAvatar = (photo: IPhoto) => async () => {
        const updatedFields = {
            avatar: `${photo.photoUrl}`,
        };

        try {
            await dispatch(updateProfileUser(updatedFields));
            await photoAPI.updateAvatar(photo.publicId);
            toastSuccess('Avatar đã được cập nhật');
            router.push('/profile');
        } catch (error) {
            console.log((error as IResponseError).error);
        }
    };

    const handleDelete = (photo: IPhoto) => async () => {
        const updatedFields = {
            avatar: null,
        };
        try {
            if (sUser.avatar === photo.photoUrl) {
                profileAPI.updateProfile({ avatar: null });
                await dispatch(updateProfileUser(updatedFields as unknown as IProfile));
            }
            await photoAPI.removeImage(photo.publicId);
            dispatch(deletePhoto(photo.publicId));
            toastSuccess('Ảnh đã được xóa');
        } catch (error) {
            console.log((error as IResponseError).error);
        }
    };

    return (
        <section className={`${styles.container}`}>
            <Title
                className={styles.container__title}
                content={
                    <button className={styles.container__title__btn} onClick={() => router.back()}>
                        <ArrowLeft />
                    </button>
                }
            />

            <div className={styles.container__content}>
                {sPhoto.map((item) => (
                    <AlbumsImage
                        key={item.photoUrl}
                        url={item.photoUrl}
                        isFavorite={item.isFavorite}
                        onAvatar={handleSetAvatar(item)}
                        onDelete={handleDelete(item)}
                        onFavorite={handleFavorite(item.publicId)}
                    />
                ))}
            </div>
        </section>
    );
}

Albums.protected = true;
