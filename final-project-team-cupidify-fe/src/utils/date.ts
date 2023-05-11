export const compareDateToMinutes = (date1: Date, date2: Date) => {
    return (
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear() &&
        date1.getHours() === date2.getHours() &&
        date1.getMinutes() === date2.getMinutes()
    );
};

export const formatDateTime = (date: Date) => {
    return `${date.getHours().toString().padStart(2, '0')}:${date
        .getMinutes()
        .toString()
        .padStart(2, '0')}, ${date.getDate()} tháng ${date.getMonth() + 1} năm ${date.getFullYear()}`;
};

export const otpToday = new Date()
    .toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })
    .replace(/\//g, '');
