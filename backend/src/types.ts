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
}

export type getUserResolver = (_: any, args: { username: string }) => User | undefined;

export type RequestAuth = {
    username?: string;
    isAuth: boolean;
}
export type ExtendedRequest = Request & RequestAuth;