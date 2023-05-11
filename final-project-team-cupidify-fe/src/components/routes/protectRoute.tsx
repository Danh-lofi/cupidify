import { useAppSelector } from '@/app/store';
import { selectMatch } from '@/reducers/matchSlice';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Matching from '../match';

interface IProps {
    children: React.ReactNode;
    isToken?: boolean;
}

export default function ProtectRoute({ children, isToken }: IProps) {
    const router = useRouter();
    const sMatch = useAppSelector(selectMatch).isShow;
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            router.push('/');
        } else if (isToken) {
            router.push('/swipe');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="fixTapHighLight">
            {sMatch && <Matching />}
            {children}
        </div>
    );
}
