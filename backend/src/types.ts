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
    bannerColor?: string;
    backgroundColor?: string;
    headerColor?: string;
    itemColor?: string;
}
export type UserItem = {
    id: string;
    userId: string;
    content: string;
    url: string;
    order: number;
    icon?: string;
    iconURL?: string;
}

export type getUserResolver = (_: any, args: { username: string }) => User | undefined;

export type RequestAuth = {
    userId?: string;
    isAuth: boolean;
}
export type ExtendedRequest = Request & RequestAuth;