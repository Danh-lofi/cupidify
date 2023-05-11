import { useEffect, useState } from 'react';
import NotSupport from '../noSupport';

interface IProps {
    children: React.ReactNode;
}

export default function ScreenRoute({ children }: IProps) {
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.screen) {
            if (window.screen.width >= 768) {
                setIsValid(true);
            }
        }
    }, []);
    return <>{isValid ? <NotSupport /> : children} </>;
}
