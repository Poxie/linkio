import { GraphQLClient } from 'graphql-request';
import { API_ENDPOINT } from './constants';
import { GET_USER_BY_USERNAME } from './queries';
import { User } from './types';

const sanitizeData = (data: any) => {
    const query = Object.keys(data) as any;
    const sanitized = data[query];
    return sanitized;
}

// Createing GraphQL client
export const client = new GraphQLClient(API_ENDPOINT);

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