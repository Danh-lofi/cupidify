import authAPI from '@/api/authApi';
import { useAppDispatch } from '@/app/store';
import Button from '@/components/button/button';
import DateField from '@/components/forms/dateField/dateField';
import InputField from '@/components/forms/inputField/inputField';
import InputSelect from '@/components/forms/selectField/selectField';
import { ArrowLeftIcon, ProfileIcon } from '@/components/icons';
import Title from '@/components/title';
import APP_PATH from '@/constant/appPath';
import { selectAuth, setLogin } from '@/reducers/authSlice';
import { IUserRegister } from '@/types/interface';
import { genderOptions } from '@/utils/data';
import { toastError, toastSuccess } from '@/utils/toast';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import styles from './update-Info.module.scss';
export default function UpdateInfo() {
    const router = useRouter();
    const authState = useSelector(selectAuth);
    const dispatch = useAppDispatch();

    const { name, email } = authState.infoUser;

    const handleClickBack = (): void => {
        router.push(APP_PATH.AUTH_OTP);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IUserRegister>({});

    const onSubmit: SubmitHandler<IUserRegister> = async (data: IUserRegister) => {
        const updatedData = {
            ...data,
            phone: authState.infoUser.phone,
            socialId: authState.infoUser.socialId,
        };
        localStorage.setItem('tempUser', JSON.stringify(updatedData));

        try {
            const response = await authAPI.register(updatedData as IUserRegister);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                toastSuccess('Đăng kí thành công');
                dispatch(setLogin(true));
                router.push(APP_PATH.SWIPE);
            }
        } catch (error) {
            toastError('Tài khoản đã đăng kí');
        }
    };

    return (
        <section className="container bg-white">
            <div className={styles.content}>
                <Title
                    className={styles.content__arrow}
                    content={
                        <button onClick={handleClickBack} className={styles.content__btn}>
                            <ArrowLeftIcon />
                        </button>
                    }
                />
                <div className={styles.content__body}>
                    <div className={`${styles.content__body__profile} image-container`}>
                        <ProfileIcon />
                    </div>
                    <div className={styles.content__body__wrap}>
                        <h4>Thông tin cá nhân</h4>
                        <p>Vui lòng cập nhật thông tin cá nhân của bạn để hoàn thành đăng ký tài khoản.</p>
                    </div>
                    <form className="flex flex-col gap-4" id="first-update" onSubmit={handleSubmit(onSubmit)}>
                        <InputField
                            label="Họ tên"
                            placeholder="Ví dụ: Trần Ngọc Tâm"
                            name="name"
                            defaultValue={name}
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
                        <InputField
                            name="email"
                            label="Email"
                            placeholder="Ví dụ: tamtn@hehe.com"
                            defaultValue={email}
                            register={register}
                            option={{
                                pattern: {
                                    value: /^[\w-\.]+@([\w-]+\.)+[^1-9]{2,4}$/g,
                                    message: 'Email không hợp lệ',
                                },
                                required: {
                                    value: true,
                                    message: 'Vui lòng nhập email',
                                },
                            }}
                            error={errors.email?.message}
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
                        <InputSelect
                            name="gender"
                            label="Giới tính"
                            genders={genderOptions}
                            register={register}
                            option={{
                                required: {
                                    value: true,
                                    message: 'Vui lòng chọn giới tính',
                                },
                                validate: (value) => {
                                    if (value !== '0') return true;
                                    return 'Vui lòng chọn giới tính ';
                                },
                            }}
                            error={errors.gender?.message}
                        />
                    </form>
                </div>
                <Button className={styles.content__update} form="first-update" title="Xong" block htmlType="submit" />
            </div>
        </section>
    );
}

UpdateInfo.getLayout = function getLayout(page: ReactElement) {
    return <>{page}</>;
};

// UpdateInfo.protected = { isToken: true };
