import { getUserResolver } from "../types";

const users = [
    { username: 'poxen', name: 'Albin Kärvling', bio: 'I like to do things, especially watch things with my viewers!' },
    { username: 'marre', name: 'Martin' }
];

export const getUserByUsername: getUserResolver = (_, args) => {
    const { username } = args;
    return users.find(user => user.username === username);
}