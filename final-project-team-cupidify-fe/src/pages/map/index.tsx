import mapAPI from '@/api/mapApi';
import { useAppSelector } from '@/app/store';
import HeartLoading from '@/components/loading/heartLoading';
import { selectMap } from '@/reducers/mapSlice';
import { selectRange } from '@/reducers/rangeSlice';
import { selectUser } from '@/reducers/userSlice';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const Map = dynamic(() => import('@/components/map'), { ssr: false });

interface IFriends {
    user: IProfile;
    lat: number;
    long: number;
    distance: number;
}
export default function MapContainer() {
    const sRange = useAppSelector(selectRange);
    const sUser = useAppSelector(selectUser);
    const sMap = useAppSelector(selectMap);
    const [isFocus, setIsFocus] = useState<boolean>(false);
    const [friends, setFriends] = useState<IFriends[]>([]);

    const handleFocus = (): void => setIsFocus((pre) => !pre);

    useEffect(() => {
        async function fetchLocation() {
            try {
                const res = await mapAPI.getLocation(sRange.range);
                setFriends(res.data);
            } catch (error) {
                console.log((error as Error).message);
            }
        }

        fetchLocation();
    }, [sRange.range]);
    if (sMap.latitude === 0) return <HeartLoading />;
    return (
        <>
            {location && friends ? (
                <Map
                    info={sUser}
                    isFocus={isFocus}
                    me={sMap}
                    handleFocus={handleFocus}
                    friends={friends}
                    setFriends={setFriends}
                />
            ) : (
                <HeartLoading />
            )}
        </>
    );
}

MapContainer.protected = true;
