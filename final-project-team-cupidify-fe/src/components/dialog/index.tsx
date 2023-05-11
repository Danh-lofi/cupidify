import React, { useEffect, useState } from 'react';
import { CloseIcon } from '../icons';
import styles from './dialog.module.scss';

interface IProps {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export default function Dialog({ title, isOpen, onClose, children }: IProps) {
    const [show, setShow] = useState<boolean>(isOpen);

    const handleClose = () => {
        setShow(false);
        onClose();
    };

    useEffect(() => {
        setShow(isOpen);
    }, [isOpen]);

    return (
        <>
            {show && (
                <div className={styles.container}>
                    <div className={styles.container__content}>
                        <div className={styles.container__content__block} onClick = {onClose}/>
                        <div
                            className={styles.container__content__dialog}
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="modal-headline"
                        >
                            <h2 className={styles.container__content__dialog__title} id="modal-headline">
                                {title}
                            </h2>
                            {children}
                            <button className={styles.container__content__dialog__btn} onClick={handleClose}>
                                <CloseIcon />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
