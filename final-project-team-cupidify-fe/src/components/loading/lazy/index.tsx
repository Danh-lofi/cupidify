import { LazyLoadComponent, LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import styles from './lazy.module.scss';

interface IProps {
    key: string | number;
    src: string;
    alt: string;
    className: string;
    width: string | number;
    height: string | number;
}
interface IPropsComponents {
    children: React.ReactNode;
}

const LazyLoadingImage = ({ src, alt, className, width, key, height }: IProps) => {
    return (
        <LazyLoadImage
            key={key}
            src={src}
            alt={alt}
            className={`${styles.container} ${className} `}
            width={width}
            height={height}
            effect="blur"
        />
    );
};

const LazyLoadingComponent = ({ children }: IPropsComponents) => {
    return (
        <LazyLoadComponent delayMethod="debounce" delayTime={3000}>
            {children}
        </LazyLoadComponent>
    );
};

export { LazyLoadingComponent, LazyLoadingImage };
