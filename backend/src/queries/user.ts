import { getUserResolver } from "../types";

const users = [
    { username: 'poxen', name: 'Albin Kärvling' },
    { username: 'marre', name: 'Martin' }
];

export const getUserByUsername: getUserResolver = (_, args) => {
    const { username } = args;
    return users.find(user => user.username === username);
}