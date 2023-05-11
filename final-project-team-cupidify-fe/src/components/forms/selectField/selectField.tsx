import ArrowDownIcon from '@/components/icons/arrowDownIcon';
import { RegisterOptions, UseFormRegister } from 'react-hook-form';
import styles from './select-field.module.scss';

interface Option {
    value: string;
    label: string;
}

interface IProps {
    name: string;
    label: string;
    required?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    genders: Option[];
    option?: RegisterOptions;
    error?: string;
    register: UseFormRegister<any>;
}

export default function SelectField({ onChange, name, label, option, genders, error, register }: IProps) {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.content}>
                    {label && (
                        <label htmlFor={label}>
                            <span className={styles.content__title}>{label}</span>
                            <span className={option?.required ? styles.content__danger : 'hidden'}>*</span>
                        </label>
                    )}
                    <ArrowDownIcon className={styles.content__icon} />
                    <select
                        id={label}
                        className="inputSelectForm"
                        {...register(name, {
                            ...option,
                        })}
                        onChange={onChange}
                    >
                        <option value="0">{label}</option>
                        {genders &&
                            genders.map((item: Option) => (
                                <option key={item.value} value={item.value}>
                                    {item.label}
                                </option>
                            ))}
                    </select>
                </div>
            </div>
            <p className={error ? styles.error : 'hidden'}>{error}</p>
        </>
    );
}
