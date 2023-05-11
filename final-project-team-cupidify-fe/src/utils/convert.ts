import { TypeTime } from '../types/enum';

const convertReason = (reason: string) => {
    switch (reason) {
        case 'DATE':
            return 'Muốn hẹn hò';
        case 'CHAT':
            return 'Muốn tâm sự';
        case 'FRIEND':
            return 'Kết bạn bốn phương';
        default:
            break;
    }
};

const convertEducation = (education: string) => {
    switch (education) {
        case 'HIGHER':
            return 'Đại học';
        case 'HIGH-SCHOOL':
            return 'Trung học';
        default:
            break;
    }
};

const convertGender = (gender: string) => {
    switch (gender) {
        case 'MALE':
            return 'Nam';
        case 'FEMALE':
            return 'Nữ';
        default:
            return 'Khác';
    }
};

const convertSubNotification = (type: string) => {
    switch (type) {
        case 'LIKED':
            return 'Ai đó đã thích bạn';
        case 'MATCHING':
            return 'và bạn này rất xứng đôi, hay bắt đầu chat ngay đi nào';
        case 'MESSAGE':
            return 'đã nhắn tin cho bạn';
        default:
            break;
    }
};

const formatAMPM = (date: Date): string => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    let minutesConvert = minutes < 10 ? '0' + minutes : minutes;
    const strTime = (hours <= 10 ? `0${hours}` : hours) + ':' + minutesConvert + ' ' + ampm;
    return strTime;
};

const formatMatchDate = (
    date: string,
): {
    type: string;
    value: number;
} => {
    const DateDiff = {
        inDays: function (d1: Date, d2: Date) {
            const t2 = d2.getTime();
            const t1 = d1.getTime();

            return Math.floor((t2 - t1) / (24 * 3600 * 1000));
        },

        inWeeks: function (d1: Date, d2: Date) {
            const t2 = d2.getTime();
            const t1 = d1.getTime();

            return Math.floor((t2 - t1) / (24 * 3600 * 1000 * 7));
        },

        inMonths: function (d1: Date, d2: Date) {
            var d1Y = d1.getFullYear();
            var d2Y = d2.getFullYear();
            var d1M = d1.getMonth();
            var d2M = d2.getMonth();

            return d2M + 12 * d2Y - (d1M + 12 * d1Y);
        },

        inYears: function (d1: Date, d2: Date) {
            return d2.getFullYear() - d1.getFullYear();
        },
    };

    const d1 = new Date(date);
    const d2 = new Date();

    const days = DateDiff.inDays(d1, d2);
    const weeks = DateDiff.inWeeks(d1, d2);
    const months = DateDiff.inMonths(d1, d2);
    const years = DateDiff.inYears(d1, d2);

    if (days < 7)
        return {
            value: days,
            type: 'DAY',
        };
    if (weeks < 4)
        return {
            value: weeks,
            type: 'WEEK',
        };

    if (months < 12)
        return {
            value: months,
            type: 'YEAR',
        };

    return {
        value: years,
        type: TypeTime.YEAR,
    };
};

export { convertEducation, convertGender, convertReason, convertSubNotification, formatAMPM, formatMatchDate };
