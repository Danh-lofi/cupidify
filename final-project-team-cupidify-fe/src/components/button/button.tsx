import { MouseEventHandler } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';

interface IProps {
    title?: string;
    size?: 'small' | 'medium';
    type?: 'primary' | 'secondary';
    icon?: JSX.Element;
    block?: boolean;
    htmlType?: 'button' | 'submit';
    className?: string;
    name?: string;
    form?: string;
    disabled?: boolean;
    loading?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function Button({
    className = '',
    title,
    size = 'medium',
    type = 'primary',
    icon,
    block,
    htmlType = 'button',
    name,
    loading,
    form,
    disabled = false,
    onClick,
}: IProps) {
    const sizeClass = () => {
        switch (size) {
            case 'small':
                return 'btn-sm';
            case 'medium':
                return 'btn-md button-1';
            default:
                return 'btn-md button-1';
        }
    };
    const typeClass = () => {
        switch (type) {
            case 'primary':
                return 'btn-primary';
            case 'secondary':
                return 'btn-secondary';
            default:
                return 'btn-primary';
        }
    };

    return (
        <button
            type={htmlType}
            className={`btn ${className} ${block && 'w-full'} ${sizeClass()} ${typeClass()}`}
            name={name}
            form={form}
            onClick={onClick}
            disabled={disabled || loading}
        >
            <p className={`${icon ? '' : 'btn__icon'}`}>{title}</p>
            {loading ? <BiLoaderAlt className="animate-spin" /> : icon && icon}
        </button>
    );
}
