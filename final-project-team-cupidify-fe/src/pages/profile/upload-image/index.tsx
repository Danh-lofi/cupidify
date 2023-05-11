import photoAPI from '@/api/photoApi';
import { useAppSelector } from '@/app/store';
import Button from '@/components/button/button';
import { ArrowLeft, UploadImageIcon } from '@/components/icons';
import AlbumsItem from '@/components/profile/albumItem';
import Title from '@/components/title';
import APP_PATH from '@/constant/appPath';
import { maxSizeImage } from '@/constant/value';
import { selectPhoto } from '@/reducers/photoSlice';
import { resizeImage } from '@/utils/resizeImage';
import { toastError, toastSuccess } from '@/utils/toast';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { VscLoading } from 'react-icons/vsc';
import styles from './upload-img.module.scss';

export default function UploadImage() {
    const router = useRouter();
    const sPhoto = useAppSelector(selectPhoto);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [albums, setAlbums] = useState<File[]>([]);

    const uploadBtnRef = useRef<HTMLInputElement>(null);

    const [remainingImages, setRemainingImages] = useState<number>(
        sPhoto ? +(process.env.MAX_IMAGES_ALBUMS as string) - sPhoto.length : 0,
    );

    const handleClick = () => uploadBtnRef.current && uploadBtnRef.current.click();

    const handleRemove = (index: number): void => {
        const newAlbums = [...albums];
        newAlbums.splice(index, 1);
        setAlbums(newAlbums);
        setRemainingImages(remainingImages + 1);
    };
    const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
        if (!e.target.files) {
            return;
        }

        const newAlbums: File[] = [];
        const filesLength = e.target.files.length;

        for (let index = 0; index < filesLength && index < remainingImages; index++) {
            const file: File = e.target.files[index];

            if (file.type !== 'image/png' && file.type !== 'image/jpeg' && file.type !== 'image/jpg') {
                toastError(file.name + ' không phải kiểu ảnh được phép tải lên.');
            } else if (file.size > maxSizeImage) {
                const resizedImage = await resizeImage(file);

                resizedImage && newAlbums.push(resizedImage);
            } else {
                newAlbums.push(file);
            }
        }

        setAlbums((list) => [...list, ...newAlbums]);
        setRemainingImages((prev) => prev - newAlbums.length);
    };

    const handleSubmit = async () => {
        if (albums.length === 0) {
            toastError('Vui lòng chọn ảnh để tải lên');
            return;
        }

        setIsLoading(true);
        const formData = new FormData();

        for (let image of albums) {
            formData.append('files', image);
        }
        try {
            await photoAPI.uploadImages(formData);
            toastSuccess('Cập nhật ảnh thành công!');
            router.push(APP_PATH.PROFILE);
        } catch (error) {
            console.log((error as IResponseError).error);
        }
    };

    return (
        <section className={`${styles.container} container`}>
            <Title
                className={styles.container__title}
                content={
                    <button className={styles.container__title__btn} onClick={() => router.back()}>
                        <ArrowLeft />
                    </button>
                }
            />

            {remainingImages > 0 ? <p>Bạn có thể tải thêm {remainingImages} ảnh</p> : <p>Albums của bạn đã đầy</p>}
            <div className={styles.container__content}>
                {albums &&
                    albums.map((image, index) => {
                        const url = URL.createObjectURL(image);

                        return (
                            <AlbumsItem
                                key={image.lastModified + index}
                                url={url}
                                upLoad
                                onClick={() => handleRemove(index)}
                            />
                        );
                    })}

                {remainingImages > 0 && (
                    <div onClick={handleClick} className={styles.container__content__boxImage}>
                        <UploadImageIcon />
                        <span>Tải ảnh lên</span>
                        <input
                            type="file"
                            name="albums"
                            id="albums"
                            multiple
                            hidden
                            accept="image/png, image/jpg, image/jpeg"
                            ref={uploadBtnRef}
                            onChange={handleFileInput}
                        />
                    </div>
                )}
            </div>
            {!isLoading && sPhoto && sPhoto.length < +(process.env.MAX_IMAGES_ALBUMS as string) && (
                <Button
                    onClick={handleSubmit}
                    block
                    disabled={sPhoto && sPhoto.length === 10}
                    title="Lưu"
                    type="secondary"
                    className={styles.container__btn}
                />
            )}
            {isLoading && (
                <button className={`${styles.container__btn} button-1 btn-md`}>
                    <VscLoading className="animate-spin" />
                </button>
            )}
        </section>
    );
}

UploadImage.protected = true;
