import { ReactElement } from 'react';

export interface IUserGender {
    name: string;
}

export interface IUserInterests {
    name: string;
}
export interface IUserRegister {
    phone?: string;
    name: string;
    email: string;
    birthday: string;
    gender: string;
    socialId: string | null;
}

export interface ISocialLoginData {
    name: string | null;
    email: string | null;
    socialId: string | null;
    checkData: {
        checked: boolean;
        phone?: string;
    } | null;
}

export interface IProfileUpdateData {
    name?: string;
    gender?: string;
    reason?: string;
    description?: string;
    height?: number;
    religion?: string;
    drinking?: boolean;
    education?: string;
    interests?: string[];
    avatar?: string | null;
}

export interface IWhyOptions {
    id: number;
    label: string;
    value: string;
    sub: string;
    icon: ReactElement;
}

export interface IOptions {
    id: number;
    value: string;
    label: string;
}
