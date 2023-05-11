const genderOptions: IGenderOption[] = [
    {
        id: 1,
        value: 'MALE',
        label: 'Nam',
    },
    {
        id: 2,
        value: 'FEMALE',
        label: 'Nữ',
    },
    {
        id: 3,
        value: 'OTHER',
        label: 'Khác',
    },
];

const educationOptions: IEducation[] = [
    {
        id: 1,
        value: 'HIGH-SCHOOL',
        label: 'Trung học',
    },
    {
        id: 2,
        value: 'HIGHER',
        label: 'Đại học',
    },
];

const drinkingOptions: IDrinkingOption[] = [
    {
        id: 1,
        value: 'YES',
        label: 'Có',
    },
    {
        id: 2,
        value: 'NO',
        label: 'Không',
    },
];

const religionOptions: IReligionOption[] = [
    {
        id: 1,
        value: 'CHRISTIAN',
        label: 'Công giáo',
    },
    {
        id: 2,
        value: 'BUDDHISM',
        label: 'Phật giáo',
    },
    {
        id: 3,
        value: 'OTHER',
        label: 'Khác',
    },
];

const limitNotiResult = 7;
const limitMessageResult = 20;

export { drinkingOptions, educationOptions, genderOptions, religionOptions, limitNotiResult, limitMessageResult };
