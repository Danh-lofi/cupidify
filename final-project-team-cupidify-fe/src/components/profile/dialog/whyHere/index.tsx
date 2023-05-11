import profileAPI from '@/api/profileApi';
import { useAppDispatch } from '@/app/store';
import Dialog from '@/components/dialog';
import { ChatOptionIcon, CupIcon, KissFaceIcon } from '@/components/icons';
import { updateProfileUser } from '@/reducers/userSlice';
import { IWhyOptions } from '@/types/interface';
import { toastError, toastSuccess } from '@/utils/toast';
import type { RadioChangeEvent } from 'antd';
import { Radio } from 'antd';
import { useEffect, useState } from 'react';
import styles from './why-here.module.scss';

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    reason: string;
}

const whyOptions: IWhyOptions[] = [
    {
        id: 1,
        label: 'Muốn hẹn hò',
        value: 'DATE',
        sub: 'Tôi muốn tìm mấy em/anh ghệ.',
        icon: <KissFaceIcon />,
    },
    {
        id: 2,
        label: 'Muốn tâm sự',
        value: 'CHAT',
        sub: 'Tìm một người để trò chuyện.',
        icon: <ChatOptionIcon />,
    },
    {
        id: 3,
        label: 'Kết bạn bốn phương',
        value: 'FRIEND',
        sub: 'Tôi muốn kết thật nhiều bạn.',
        icon: <CupIcon />,
    },
];

export default function WhyDialog({ isOpen, onClose, reason }: IProps) {
    const [value, setValue] = useState<string>(reason || '');

    const dispatch = useAppDispatch();

    const handleChangeOption = (str: string) => {
        const updatedFields = {
            reason: str,
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

    useEffect(() => {
        setValue(reason);
    }, [reason]);

    return (
        <>
            <Dialog title="Cho mọi người biết lý do bạn ở đây?" isOpen={isOpen} onClose={onClose}>
                <p className={styles.subDialog}>
                    Chúng tôi sẽ chia sẻ điều này trên hồ sơ của bạn. Bạn có thể thay đổi bất kỳ lúc nào
                </p>
                <Radio.Group className="w-full" defaultValue={value}>
                    {whyOptions.map((item) => (
                        <div key={item.id} className={styles.container} onClick={() => handleChangeOption(item.value)}>
                            <div className={styles.container__content}>
                                <div>{item.icon}</div>
                                <div className={styles.container__content__title}>
                                    <span className={styles.container__content__title__name}>{item.label}</span>
                                    <span className={styles.container__content__title__sub}>{item.sub}</span>
                                </div>
                            </div>
                            <Radio key={item.id} value={item.value} defaultChecked={item.value === value} />
                        </div>
                    ))}
                </Radio.Group>
            </Dialog>
        </>
    );
}
