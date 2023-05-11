import { RegisterOptions, UseFormRegister } from 'react-hook-form';
import styles from './input-field.module.scss';

interface IProps {
    label: string;
    placeholder: string;
    type?: 'text' | 'email';
    disabled?: boolean;
    name: string;
    register: UseFormRegister<any>;
    option?: RegisterOptions;
    error?: string;
    defaultValue?: string | number;
    className?: string;
}

export default function InputField({
    name,
    label,
    placeholder,
    type = 'text',
    register,
    option,
    disabled,
    error,
    defaultValue,
    className,
}: IProps) {
    return (
        <div className={`${styles.container} `}>
            <div className={`${styles.content} ${className}`}>
                <label htmlFor={label}>
                    <span className={styles.content__title}>{label}</span>
                    <span className={option?.required ? styles.content__danger : 'hidden'}>*</span>
                </label>
                <input
                    id={label}
                    className={styles.content__input}
                    type={type}
                    placeholder={placeholder}
                    disabled={disabled}
                    defaultValue={defaultValue}
                    {...register(name, { ...option })}
                />
            </div>
            <p className={error ? styles.container__error : 'hidden'}>{error}</p>
        </div>
    );
}
