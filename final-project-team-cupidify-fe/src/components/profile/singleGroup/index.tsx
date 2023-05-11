import { ArrowRightIcon } from '@/components/icons';
import { IOptions } from '@/types/interface';
import { Select } from 'antd';
import { useEffect, useState } from 'react';
import styles from './single-group.module.scss';

interface IProps {
    className?: string;
    title: string;
    desc: string;
    icon: React.ReactNode;
    isHeight?: boolean;
    onClick?: () => void;
    options?: IOptions[];
    onChange?: (value: string) => void;
}

export default function SingleGroup({
    icon,
    className = '',
    title,
    desc,
    onClick,
    onChange,
    options,
    isHeight,
}: IProps) {
    const [description, setDescription] = useState<string>(desc);

    useEffect(() => {
        setDescription(desc);
    }, [desc]);

    const handleChange = (value: string) => {
        setDescription(value);
        onChange && onChange(value);
    };

    return (
        <button className={`${className} ${styles.container}`} onClick={onClick}>
            <div className={styles.container__boxTitle}>
                {icon}
                <span className={styles.container__boxTitle__title}>{title}</span>
            </div>
            {isHeight ? (
                <div className={styles.container__boxSub}>
                    <span className={styles.container__boxSub__sub}>{description}</span>
                    <ArrowRightIcon className="scale-75" />
                </div>
            ) : (
                <Select
                    onChange={handleChange}
                    value={description}
                    suffixIcon={<ArrowRightIcon className="scale-75" />}
                    bordered={false}
                    className={styles.container__boxTitle__select}
                >
                    {options?.map((option) => (
                        <option key={option.id} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </Select>
            )}
        </button>
    );
}
