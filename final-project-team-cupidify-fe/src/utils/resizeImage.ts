import { maxHeight, maxWidth } from '@/constant/value';

export const resizeImage = async (file: File): Promise<File | undefined> => {
    let img = new Image();
    return await new Promise((resolve, reject) => {
        img.src = URL.createObjectURL(file);
        img.onerror = reject;
        img.onload = () => resolve({ width: img.width, height: img.height });
    }).then(async (data: any) => {
        const originalWidth = data.width;
        const originalHeight = data.height;
        const { width, height } = resizeDimensions(originalWidth, originalHeight, maxWidth, maxHeight);

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            return undefined;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.7));

        if (!blob) {
            return undefined;
        }

        return new File([blob], file.name, {
            type: 'image/jpeg',
            lastModified: Date.now(),
        });
    });
};

const resizeDimensions = (width: number, height: number, maxWidth: number, maxHeight: number) => {
    let newWidth = width;
    let newHeight = height;

    if (width > height && width > maxWidth) {
        newHeight = height * (maxWidth / width);
        newWidth = maxWidth;
    } else if (height > maxHeight) {
        newWidth = width * (maxHeight / height);
        newHeight = maxHeight;
    }

    return { width: newWidth, height: newHeight };
};
