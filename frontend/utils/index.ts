import { GraphQLClient } from 'graphql-request';
import { API_ENDPOINT } from './constants';
import { UPDATE_USER, UPDATE_USER_ITEM } from './mutation';
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
export const getUserByUsername: (username: string) => Promise<User | undefined> = async username => {
    const user = await request(GET_USER_BY_USERNAME, { username }).catch(console.error);
    return user;
}

// Login
export const login = async (username: string, password: string) => {
    const { token } = await request(LOGIN, { username, password }).catch(console.error);
    localStorage.accessToken = token;
    return token;
}
// Get me
export const getMe = async () => {
    const me = await request(GET_ME);
    return me;
}


// Updating user
export const updateUser = async (user: Partial<User> & {id: string}) => {
    const response = await request(UPDATE_USER, user);
    return user;
}
// Updating user item
export const updateUserItem = async (item: Partial<Item> & {id: string}) => {
    const response = await request(UPDATE_USER_ITEM, item);
    return response;
}