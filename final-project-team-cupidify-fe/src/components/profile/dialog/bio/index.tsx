import profileAPI from '@/api/profileApi';
import { useAppDispatch } from '@/app/store';
import Button from '@/components/button/button';
import Dialog from '@/components/dialog';
import { updateProfileUser } from '@/reducers/userSlice';
import { toastError, toastSuccess } from '@/utils/toast';
import React from 'react';
import { useState } from 'react';
import styles from './bio.module.scss';

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    bio: string;
}

export default function BioDialog({ isOpen, onClose, bio }: IProps) {
    const [value, setValue] = useState<string>(bio || '');
    const dispatch = useAppDispatch();
    const maxLength = 150;

    const charLimit = React.useMemo(() => {
        if (value.length >= maxLength) {
            return `Vui lòng nhập dưới ${maxLength} kí tự!`;
        }
    }, [value]);

    const handleUpdateBio = () => {
        const updatedFields = {
            description: value,
        };

        try {
            profileAPI.updateProfile(updatedFields);
            dispatch(updateProfileUser(updatedFields));
            onClose();

            toastSuccess('Cập nhật thông tin thành công!');
        } catch (err) {
            toastError('Cập nhật thông tin thất bại!');
        }
    };

    return (
        <>
            <Dialog title="Giới thiệu bản thân" isOpen={isOpen} onClose={onClose}>
                <textarea
                    className={styles.textarea}
                    rows={4}
                    placeholder="Ví dụ: Quan trọng là important"
                    maxLength={maxLength}
                    defaultValue={value}
                    onChange={(e) => setValue(e.target.value)}
                ></textarea>
                {charLimit && <span className={styles['limit-label']}>{charLimit}</span>}
                <Button block title="Lưu" type="secondary" className={styles.btn} onClick={handleUpdateBio} />
            </Dialog>
        </>
    );
}
