import styles from './title.module.scss';

interface IProps {
    className?: string;
    content: React.ReactNode;
}

export default function Title({ className = '', content }: IProps) {
    return <div className={`${className} ${styles.container}`}>{content}</div>;
}
