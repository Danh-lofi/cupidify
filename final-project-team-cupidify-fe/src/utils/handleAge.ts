export const handleAge = (birthday: string | undefined) => {
    if (!birthday) return 0;
    const newBirthday = new Date(birthday);
    const now = new Date();
    return now.getFullYear() - newBirthday.getFullYear();
};
