import { CreateUserArgs } from "../mutations/user";
import { connection } from '../index';
import { SELECT_USER_BY_USERNAME } from "./queries";
import { User } from "../types";

const request = async (query: string, values?: any[]) => {
    const [response] = await connection.promise().query(query, values);
    return response;
}

/** 
 ** Intreracts with the database and creates a new user.
 @param user username required, other user properties are optional.
 @returns a user object
**/
export const createUserAction = async (user: CreateUserArgs) => {
    // Checking if user with username already exists
    const prevUser = await selectUserByUsername(user.username);
    if(prevUser) throw new Error('Username unavailable.');

    // Definiing what properties should be inserted
    let query = 'INSERT INTO users (';
    const keys = Object.keys(user).join(', ');
    query += `${keys}) `;

    // Creating array string of question markes, placeholders for values
    query += 'VALUES (';
    const questionMarks = Object.keys(user).map(key => '?').join(', ');
    query += `${questionMarks})`;

    // Creating array of values
    const values = Object.keys(user).map(key => user[key as keyof typeof user]);

    // Inserting values
    await request(query, values);

    // Retrieving created user
    const _user = await selectUserByUsername(user.username);
    return _user;
}

/**
 * Select a user by the username
 @param username required
 @returns a user object or undefined if no user is found
*/
export const selectUserByUsername = async (username: string) => {
    const data = await request(SELECT_USER_BY_USERNAME, [username]) as User[];
    return data[0];
}