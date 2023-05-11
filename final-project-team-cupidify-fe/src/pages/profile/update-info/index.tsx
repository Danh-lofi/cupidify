import profileAPI from '@/api/profileApi';
import { useAppDispatch, useAppSelector } from '@/app/store';
import Button from '@/components/button/button';
import DateField from '@/components/forms/dateField/dateField';
import InputField from '@/components/forms/inputField/inputField';
import { ArrowLeft } from '@/components/icons';
import Title from '@/components/title';
import APP_PATH from '@/constant/appPath';
import { selectUser, updateProfileUser } from '@/reducers/userSlice';
import { toastError, toastSuccess } from '@/utils/toast';
import router from 'next/router';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './update-info.module.scss';

interface FormData {
    name: string;
    birthday: string;
}

export default function UpdateInfo() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const sUser = useAppSelector(selectUser);

    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            name: sUser.name,
            birthday: sUser.birthday,
        },
    });

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        const updatedFields = {
            name: data.name,
            birthday: data.birthday,
        };
        try {
            dispatch(updateProfileUser(updatedFields));
            profileAPI.updateProfile(updatedFields);
            toastSuccess('Cập nhật thông tin thành công');
            router.push(APP_PATH.PROFILE);
        } catch (error) {
            console.log((error as IResponseError).error);
        }
    };

    return (
        <section className={`${styles.container} container`}>
            <div className={styles.container__content}>
                <Title
                    className={styles.container__content__title}
                    content={
                        <button
                            className={styles.container__content__title__btn}
                            onClick={() => router.push(APP_PATH.PROFILE)}
                        >
                            <ArrowLeft />
                        </button>
                    }
                />
                <form className={styles.container__content__form} id="first-update" onSubmit={handleSubmit(onSubmit)}>
                    <InputField
                        label="Họ tên"
                        placeholder="Ví dụ: Trần Ngọc Tâm"
                        name="name"
                        register={register}
                        option={{
                            required: {
                                value: true,
                                message: 'Vui lòng nhập họ tên',
                            },
                            minLength: {
                                value: 2,
                                message: 'Họ tên không được ít hơn 2 ký tự',
                            },
                            pattern: {
                                value: /^[\p{L}\s]+$/u,
                                message: 'Họ tên chỉ được chứa chữ cái và khoảng trắng',
                            },
                        }}
                        error={errors.name?.message}
                    />
                    <DateField
                        name="birthday"
                        label="Năm sinh"
                        placeholder="20/11/1980"
                        register={register}
                        option={{
                            required: {
                                value: true,
                                message: 'Vui lòng nhập ngày sinh',
                            },
                            validate: {
                                notFutureDate: (value) => {
                                    const date = new Date(value);
                                    const currentDate = new Date();
                                    return date <= currentDate || 'Ngày sinh không thể là tương lai';
                                },
                                validDay: (value) => {
                                    const date = new Date(value);
                                    const currentDate = new Date();
                                    const diff = currentDate.getFullYear() - date.getFullYear();
                                    if (diff > 120) {
                                        return 'Ngày sinh không hợp lệ';
                                    }
                                    if (diff < 8) {
                                        return 'Bạn phải trên 8 tuổi';
                                    }
                                },
                            },
                        }}
                        error={errors.birthday?.message}
                    />
                </form>
                <Button form="first-update" title="Cập nhật" block htmlType="submit" loading={isLoading} />
            </div>
        </section>
    );
}

UpdateInfo.protected = true;
