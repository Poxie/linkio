import { Request } from "express";

export type User = {
    id: string;
    username: string;
    name: string;
    bio?: string;
    avatar?: string;
    avatarURL?: string;
    banner?: string;
    bannerURL?: string;
    avatarColor?: string;
    bannerColor?: string;
    primaryColor?: string;
    headerColor?: string;
    itemColor?: string;
}
export type UserItem = {
    id: string;
    userId: string;
    content: string;
    isValid: boolean;
    url: string;
    order: number;
    icon?: string;
    iconURL?: string;
}

export type getUserResolver = (_: any, args: { username: string, includeInvisibleItems?: string }) => User | undefined;

export type RequestAuth = {
    userId?: string;
    isAuth: boolean;
}
export type ExtendedRequest = Request & RequestAuth;