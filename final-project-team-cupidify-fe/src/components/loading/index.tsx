import styles from './loading.module.scss';

export default function Loading() {
    return (
        <section className={styles.container}>
            <div className={styles.container__content}>
                <p className={styles.container__content__title}>Cupidify</p>
            </div>
        </section>
    );
}
