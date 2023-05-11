import profileAPI from '@/api/profileApi';
import { useAppDispatch } from '@/app/store';
import Button from '@/components/button/button';
import Dialog from '@/components/dialog';
import InputField from '@/components/forms/inputField/inputField';
import { updateProfileUser } from '@/reducers/userSlice';
import { toastError, toastSuccess } from '@/utils/toast';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './height.module.scss';

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    height: number;
}

interface IHeightProps {
    height: number;
}

export default function HeightDialog({ isOpen, onClose, height }: IProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IHeightProps>();

    const dispatch = useAppDispatch();

    const onSubmit: SubmitHandler<IHeightProps> = async (data) => {
        const { height } = data;
        const profileUpdates = {
            height,
        };

        try {
            profileAPI.updateProfile(profileUpdates);
            dispatch(updateProfileUser(profileUpdates));
            onClose();

            toastSuccess('Cập nhật thông tin thành công!');
        } catch (err) {
            toastError('Cập nhật thông tin thất bại!');
        }
    };

    return (
        <>
            <Dialog title="Nhập chiều cao của bạn" isOpen={isOpen} onClose={onClose}>
                <form id="update-height" className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <InputField
                        label="Chiều cao (cm)"
                        placeholder="Ví dụ: 180"
                        name="height"
                        defaultValue={height}
                        register={register}
                        option={{
                            pattern: {
                                value: /^(?!0\d)\d*(\.\d+)?$/,
                                message: 'Vui lòng chỉ nhập số',
                            },
                            required: {
                                value: true,
                                message: 'Vui lòng chiều cao',
                            },
                            validate: (value) => {
                                if (value >= 100 && value <= 250) return true;
                                return 'Chiều cao không hợp lệ';
                            },
                        }}
                        error={errors.height?.message}
                    />
                </form>
                <Button form="update-height" title="Lưu" block htmlType="submit" />
            </Dialog>
        </>
    );
}
