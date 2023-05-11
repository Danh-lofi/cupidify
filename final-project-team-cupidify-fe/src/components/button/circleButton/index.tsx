import styles from './circle-button.module.scss';

interface IProps {
    icon: JSX.Element;
    iconLoading: JSX.Element;
    onClick: () => void;
    disabled?: boolean;
}

export default function CircleButton({ icon, iconLoading, onClick, disabled }: IProps) {
    return (
        <button className={styles.container} onClick={onClick} disabled={disabled}>
            {disabled ? iconLoading : icon}
        </button>
    );
}
