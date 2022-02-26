import { getUserResolver } from "../types";
import dotenv from 'dotenv';
dotenv.config();

const users = [
    { username: 'poxen', name: 'Albin Kärvling', bio: 'I like to do things, especially watch things with my viewers!', banner: 'poxens-banner-id', bannerURL: `${process.env.IMAGE_ENDPOINT}/banners/poxens-banner-id.png`, avatar: 'poxens-avatar-id', avatarURL: `${process.env.IMAGE_ENDPOINT}/avatars/poxens-avatar-id.png` },
    { username: 'marre', name: 'Martin' }
];

export const getUserByUsername: getUserResolver = (_, args) => {
    const { username } = args;
    return users.find(user => user.username === username);
}