import { GraphQLClient } from 'graphql-request';
import { API_ENDPOINT } from './constants';
import { CREATE_USER, CREATE_USER_ITEM, DESTROY_USER_ITEM, UPDATE_USER, UPDATE_USER_ITEM, UPDATE_USER_ITEMS } from './mutation';
import { GET_ME, GET_USER_BY_USERNAME, LOGIN } from './queries';
import { Item, User } from './types';

const sanitizeData = (data: any) => {
    const query = Object.keys(data) as any;
    const sanitized = data[query];
    return sanitized;
}

// Createing GraphQL client
export const client = new GraphQLClient(API_ENDPOINT, {
    headers: {
        // Adding authorization header if not ssr
        Authorization: typeof window !== 'undefined' ? `Bearer ${localStorage.accessToken}` : ''
    }
});

// General request function
const request = async (query: string, variables?: Object) => {
    // Making request to endpoint
    const response = await client.request(query, variables);

    // Sanitizing data - returning pure data
    const data = sanitizeData(response);

    // Returning data
    return data;
}

// Get user by username
type GetUserByUsername = (username: string, options?: { includeInvisibleItems?: boolean }) => Promise<User | undefined>;
export const getUserByUsername: GetUserByUsername = async (username, options) => {
    const user = await request(GET_USER_BY_USERNAME, { username, ...options }).catch(console.error);
    return user;
}

// Creating user
type CreateUser = (username: string, password: string) => Promise<User | undefined>;
export const createUser: CreateUser = async (username, password) => {
    const user = await request(CREATE_USER, { username, password }).catch(console.error);
    if(!user) return;

    // Loggin user in
    await login(username, password);

    // Returning created user
    return user;
}

// Login
type Login = (username: string, password: string) => Promise<string | undefined>;
export const login: Login = async (username, password) => {
    const data = await request(LOGIN, { username, password }).catch(console.error);
    if(!data) return;
    
    const token = data.token;
    localStorage.accessToken = token;
    return token;
}
// Logout
export const logout = () => {
    localStorage.accessToken = '';
}
// Get me
export const getMe = async () => {
    const me = await request(GET_ME, { includeInvisibleItems: true });
    return me;
}


// Updating user
type UpdateUserArgs = Omit<Partial<User>, 'banner' | 'avatar'> & {
    bannerColor?: string;
    banner?: File | null;
    avatar?: File | null;
}
export const updateUser = async (id: string, user: UpdateUserArgs) => {
    const response = await request(UPDATE_USER, { id, user });
    return response;
}
// Updating user item
export const updateUserItem = async (item: Partial<Item> & {id: string}) => {
    const response = await request(UPDATE_USER_ITEM, item);
    return response;
}
// Updating user items
export const updateUserItems = async (userId: string, items: Item[]) => {
    const response = await request(UPDATE_USER_ITEMS, { userId, items });
    return response;
}
// Creating user item
export const createUserItem = async (item: Partial<Item> & {userId: string}) => {
    const newItem = await request(CREATE_USER_ITEM, item);
    return newItem;
}
// Destroying user item
export const destroyUserItem = async (id: string) => {
    const response = await request(DESTROY_USER_ITEM, { id });
    return response;
}