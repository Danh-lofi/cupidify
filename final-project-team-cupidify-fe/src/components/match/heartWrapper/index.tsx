import { useAppSelector } from '@/app/store';
import { selectMatch } from '@/reducers/matchSlice';
import { selectUser } from '@/reducers/userSlice';
import { littleHearts } from '@/utils/littleHeart';
import BigHeart from '../bigHeart';
import SmallHeart from '../smallHeart';
import styles from './heart-wrapper.module.scss';

interface IProps {
    user: IUserMatch;
}

const HeartContainer = ({ user }: IProps) => {
    const sUser = useAppSelector(selectUser);
    const sMatch = useAppSelector(selectMatch).data;
    const leftAvatar = sUser.avatar;
    const rightAvatar = sUser.userId === sMatch.userFromId ? sMatch.toAvatar : sMatch.fromAvatar;

    return (
        <div className={`${styles.container} heart-container `}>
            <div className={`${styles.container__boxImg} icon left`}>
                {user && <BigHeart imgUrl={leftAvatar ? leftAvatar : '/assets/images/avatar.png'} />}
            </div>

            <div className={`${styles.container__boxImg} icon right`}>
                {user && <BigHeart imgUrl={rightAvatar ? rightAvatar : '/assets/images/avatar.png'} />}
            </div>
            {/* note: something went wrong */}
            {littleHearts?.map((littleHeart, index) => {
                return <SmallHeart key={`heart-${index} `} data={littleHeart} />;
            })}
        </div>
    );
};

export default HeartContainer;
