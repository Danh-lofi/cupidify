import styles from './info.module.scss';

interface IProps {
    title: string;
    Icon: JSX.Element;
}

export default function Info({ title, Icon }: IProps) {
    return (
        <div className={styles.container}>
            {Icon}
            <span>{title}</span>
        </div>
    );
}
