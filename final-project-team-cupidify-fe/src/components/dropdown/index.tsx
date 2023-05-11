import { useAppDispatch } from '@/app/store';
import { handleBlockMatchUser } from '@/reducers/matchAction';
import { toastError, toastSuccess } from '@/utils/toast';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import { NextRouter, useRouter } from 'next/router';
import { FaBan, FaUsersSlash } from 'react-icons/fa';
import ThreeDotIcon from '../icons/threeDotIcon';
import styles from './dropdown.module.scss';

interface IProps {
    userId: string;
}

export default function Drop({ userId }: IProps) {
    const dispatch = useAppDispatch();
    const router: NextRouter = useRouter();

    const handleUnfriend = (): void => toastError('Chức năng đang phát triển');
    const handleBlock = () => {
        if (window.confirm('Bạn có chắc chắn muốn chặn người này?')) {
            try {
                dispatch(handleBlockMatchUser(userId));
                toastSuccess(`Đã chặn người này! `);
                router.push('/chat');
            } catch (error) {
                console.log((error as Error).message);
            }
        }
    };

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <button onClick={handleUnfriend} className={styles.btn__container}>
                    <FaUsersSlash className={styles.btn__container__icon} />
                    <p>Huỷ kết bạn</p>
                </button>
            ),
        },
        {
            key: '2',
            label: (
                <button onClick={handleBlock} className={styles.btn__container}>
                    <FaBan className={styles.btn__container__icon} />
                    <p>Chặn</p>
                </button>
            ),
        },
    ];

    return (
        <Dropdown menu={{ items }} placement="bottomRight" arrow={{ pointAtCenter: true }} trigger={['click']}>
            <button className={styles.btn__dot}>
                <ThreeDotIcon />
            </button>
        </Dropdown>
    );
}
