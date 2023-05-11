enum etype {
    LARGE = 'large',
    MEDIUM = 'medium',
    SMALL = 'small',
}

interface IProps {
    isLeft: boolean;
    type: etype;
}
const HearthMatchIcon = (props: IProps) => {
    const { isLeft, type } = props;
    let width: number = 33;
    let height: number = 28;
    switch (type) {
        case etype.LARGE:
            width = 33;
            height = 28;
            break;
        case etype.MEDIUM:
            width = 18;
            height = 16;
            break;
        case etype.SMALL:
            width = 10;
            height = 9;
            break;
        default:
            break;
    }
    return isLeft ? (
        <svg width={width} height={height} viewBox="0 0 33 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.259887 13.5332C0.259251 9.43581 3.08218 5.59442 7.39001 4.31414C9.75904 3.61007 12.1151 3.94529 14.1789 4.82748C15.4263 2.96079 17.2167 1.39367 19.5854 0.689696C24.0957 -0.65075 28.7775 1.25111 30.8954 5.01529C31.2504 5.58395 31.5059 6.19038 31.6779 6.81165C32.0413 8.12091 32.0641 9.47978 31.9408 10.7088C31.5858 14.2642 30.0495 17.8298 27.997 20.7347C25.9444 23.6396 23.4042 25.9236 20.6862 26.7314C17.9802 27.5356 14.63 27.0142 11.3411 25.7123C8.06314 24.4146 4.85196 22.2893 2.59377 19.543C1.09118 17.8909 0.259808 15.7537 0.259887 13.5332Z"
                fill="url(#paint0_linear_67_1712)"
            />
            <defs>
                <linearGradient
                    id="paint0_linear_67_1712"
                    x1="22.0513"
                    y1="-8.41702"
                    x2="10.7946"
                    y2="25.7525"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#FD79AF" />
                    <stop offset="1" stopColor="#FD65B7" />
                </linearGradient>
            </defs>
            S
        </svg>
    ) : (
        <svg width={width} height={height} viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.69228 3.73578C3.35174 1.2939 6.59005 0.148387 9.67571 1.13057C11.3726 1.6707 12.6408 2.82488 13.5132 4.18661C15.0127 3.57957 16.7145 3.37104 18.4112 3.91111C21.6419 4.93945 23.6613 7.96932 23.3985 11.0704C23.3797 11.553 23.2862 12.0179 23.137 12.4578C22.8232 13.3852 22.2864 14.2042 21.715 14.8866C20.0632 16.8614 17.7033 18.3638 15.3034 19.2633C12.9035 20.1629 10.4646 20.4949 8.51773 19.8752C6.57945 19.2582 4.79423 17.5904 3.36183 15.4822C1.93418 13.3811 0.881588 10.8138 0.648492 8.26243C0.422357 6.66926 0.792729 5.05891 1.69228 3.73578Z"
                fill="url(#paint0_linear_67_1715)"
            />
            <defs>
                <linearGradient
                    id="paint0_linear_67_1715"
                    x1="23.5697"
                    y1="-0.51665"
                    x2="3.01989"
                    y2="15.2848"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#FD79AF" />
                    <stop offset="1" stopColor="#FD65B7" />
                </linearGradient>
            </defs>
        </svg>
    );
};

export default HearthMatchIcon;
