import { useAppDispatch, useAppSelector } from '@/app/store';
import { valueEarthCircum } from '@/constant/value';
import { updateLocation } from '@/reducers/mapSlice';
import { selectRange } from '@/reducers/rangeSlice';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { memo, useEffect } from 'react';
import { Marker, useMapEvents } from 'react-leaflet';
import styles from './map-maker.module.scss';

interface IProps {
    location: IUpdateLocation;
    info: IProfile;
    isFocus?: boolean;
}

function getIconMarker(imageUrl: string) {
    return L.icon({
        iconUrl: imageUrl,
        iconSize: [50, 50],
        className: `${styles.iconMarker}`,
    });
}

function MapMaker({ location, info, isFocus }: IProps) {
    const sRange = useAppSelector(selectRange);
    const dispatch = useAppDispatch();
    const userAvatar = info.avatar ? info.avatar : '/assets/images/avatar.png';

    const handlePermission = async () => {
        if (global.navigator && global.navigator.geolocation) {
            global.navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const data = {
                        long: position.coords.longitude,
                        lat: position.coords.latitude,
                    };
                    dispatch(updateLocation(data));
                },
                () => {},
            );
        } else {
            console.log('Bạn chưa cấp quyền vị trí vì vậy không thể tìm bạn bè xung quanh');
        }
    };
    const map = useMapEvents({});
    useEffect(() => {
        if (location.latitude === 0 && location.longitude === 0) {
            handlePermission();
        }

        const flyTo = 16 - (sRange.range / valueEarthCircum) * 360;
        if (location) {
            map.flyTo([location.latitude, location.longitude], flyTo);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sRange.range, isFocus]);

    return (
        <>
            <Marker position={[location.latitude, location.longitude]} icon={getIconMarker(userAvatar)}></Marker>
        </>
    );
}
export default memo(MapMaker);
