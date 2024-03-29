import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getUserResolver, RequestAuth } from "../types";
import dotenv from 'dotenv';
import { selectUserById, selectUserByUsername } from "../utils/databaseActions";
dotenv.config();

const users = [
    { username: 'poxen', name: 'Albin Kärvling', bio: 'I like to do things, especially watch things with my viewers!', banner: 'poxens-banner-id', bannerURL: `${process.env.IMAGE_ENDPOINT}/banners/poxens-banner-id.png`, avatar: 'poxens-avatar-id', avatarURL: `${process.env.IMAGE_ENDPOINT}/avatars/poxens-avatar-id.png` },
    { username: 'marre', name: 'Martin' }
];

// @ts-ignore
export const getUserByUsername: getUserResolver = async (_, args) => {
    const { username, includeInvisibleItems } = args;
    const user = await selectUserByUsername(username);
    return {...user, ...{ includeInvisibleItems }};
}

export const login = async (_:any, { username, password }: {username: string, password: string}) => {
    // Checking if user exists
    const user = await selectUserByUsername(username, true);
    if(!user) throw new Error('User not found.');

    // Comparing passwords
    const match = await bcrypt.compare(password, user.password || '');
    if(!match) throw new Error('Incorrect credentials');

    // Creating access token
    const token = jwt.sign(
        { userId: user.id }, 
        process.env.JSON_WEB_TOKEN_KEY as string,
        { expiresIn: '7d' }
    )
    return { token, userId: user.id, expiration: 7 };
}

export const getMe = async (_:any, args:any, { userId }: RequestAuth) => {
    // Checking if user is logged in
    if(!userId) throw new Error('Not logged in.');

    // Else select user and return
    const user = await selectUserById(userId);
    return {...user, ...{ includeInvisibleItems: args.includeInvisibleItems }};
}