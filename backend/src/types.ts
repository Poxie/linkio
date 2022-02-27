import { Request } from "express";

export type User = {
    username: string;
    name: string;
    bio?: string;
}

export type getUserResolver = (_: any, args: { username: string }) => User | undefined;

export type RequestAuth = {
    username?: string;
    isAuth: boolean;
}
export type ExtendedRequest = Request & RequestAuth;