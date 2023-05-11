import profileAPI from '@/api/profileApi';
import { useAppDispatch } from '@/app/store';
import Button from '@/components/button/button';
import Dialog from '@/components/dialog';
import InputField from '@/components/forms/inputField/inputField';
import { updateProfileUser } from '@/reducers/userSlice';
import { bgColor } from '@/utils/color';
import { toastError, toastSuccess } from '@/utils/toast';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoMdClose } from 'react-icons/io';
import styles from './interests.module.scss';
import Interests from '../../../interests/interests';

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    interests: string[];
}

interface IFormData {
    interest: string;
}

export default function InterestsDiaLog({ isOpen, onClose, interests }: IProps) {
    const [interest, setInterest] = useState<string[]>(interests || []);

    if (!interest) {
        setInterest([]);
    }

    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<IFormData>({});

    const handleRemove = (i: number) => () => {
        const newInterests = [...interest];

        try {
            newInterests.splice(i, 1);
            profileAPI.updateProfile({ interests: newInterests });
            dispatch(updateProfileUser({ interests: newInterests }));
            setInterest(newInterests);

            toastSuccess('Cập nhật thông tin thành công!');
        } catch (err) {
            toastError('Cập nhật thông tin thất bại!');
        }
    };

    const submitHandle = async (data: IFormData) => {
        const newInterests = [...interest];
        const interestTrim = data.interest.trim();
        //  Add interest
        // check
        const isExist = interest.find((item) => item.toLowerCase() === interestTrim.toLowerCase());

        try {
            if (!isExist) {
                newInterests.push(interestTrim);
                profileAPI.updateProfile({ interests: newInterests });
                dispatch(updateProfileUser({ interests: newInterests }));
                setInterest(newInterests);
                reset();
                toastSuccess('Cập nhật thông tin thành công!');
            } else {
                toastError('Trùng');
            }
        } catch (err) {
            toastError('Cập nhật thông tin thất bại!');
        }
    };

    useEffect(() => {
        setInterest(interests);
    }, [interests]);

    return (
        <>
            <Dialog title="Sở thích" isOpen={isOpen} onClose={onClose}>
                <div className={styles.container}>
                    {interest?.length ? (
                        <div className={styles.container__have}>
                            {interest.map((item, i) => {
                                const index = item.length > 0 ? (item.length - 1) % bgColor.length : 0;
                                const color = bgColor[index];
                                return (
                                    <button
                                        key={i}
                                        style={{
                                            backgroundColor: color,
                                        }}
                                        className={styles.container__have__btn}
                                        onClick={handleRemove(i)}
                                    >
                                        <p className={styles.container__have__btn__title}>{item}</p>
                                        <IoMdClose />
                                    </button>
                                );
                            })}
                        </div>
                    ) : (
                        <div className={styles.container__boxEmpty}>
                            <Image src="/assets/images/empty.png" alt="empty" width={60} height={60} />
                        </div>
                    )}
                </div>
                <form className={styles.form} onSubmit={handleSubmit(submitHandle)}>
                    <InputField
                        label="Thêm sở thích"
                        placeholder="Nhập sở thích"
                        type="text"
                        name="interest"
                        register={register}
                        option={{
                            required: {
                                value: true,
                                message: 'Vui lòng nhập sở thích',
                            },
                            pattern: {
                                value: /^[\p{L}\s]+$/u,
                                message: 'Sở thích không được chứa số và ký tự đặc biệt',
                            },
                            validate: (value) => value.trim() !== '' || 'Sở thích không được để trống',
                        }}
                        error={errors.interest?.message}
                    />
                    <Button htmlType={'submit'} block title="Thêm" type="secondary" className={styles.form__btn} />
                </form>
            </Dialog>
        </>
    );
}
