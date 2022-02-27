import bcrypt from 'bcrypt';
import { Snowflake } from 'nodejs-snowflake';
import { CreateUserArgs, CreateUserItemArgs } from "../mutations/user";
import { connection } from '../index';
import { SELECT_USER_BY_USERNAME, SELECT_USER_ITEM_BY_ID } from "./queries";
import { User, UserItem } from "../types";

const request = async (query: string, values?: any[]) => {
    const [response] = await connection.promise().query(query, values);
    return response;
}

/**
 * Converts object with keys to an insert query
 * @param object required, the object of keys to map
 * @param table required, the table of insertion
 * @returns object with query (string) and values (array of values) as properties
 * @example
 * const { query, values } = keysToInsertQuery({ username: 'Poxen', 'password': '123' }); // returns query and values
 * await request(query, values); // simply insert query and values into request function
*/
const keysToInsertQuery = (object: Object, table: string) => {
    // Definiing what properties should be inserted
    let query = `INSERT INTO ${table} (`;
    const keys = Object.keys(object).join(', ');
    query += `${keys}) `;

    // Creating array string of question markes, placeholders for values
    query += 'VALUES (';
    const questionMarks = Object.keys(object).map(key => '?').join(', ');
    query += `${questionMarks})`;

    // Creating array of values
    const values = Object.keys(object).map(key => object[key as keyof typeof object]);

    return { query, values };
}

/**
 * Generats a unique ID
 * @returns a unique ID
*/
const generateUniqueId = () => {
    const snowflake = new Snowflake();
    const id = snowflake.getUniqueID().toString();
    return id;
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

    // Creating new id
    user.id = generateUniqueId();

    // Encrypting password
    const hashedPassword = await bcrypt.hash(user.password, parseInt(process.env.BCRYPT_SALT_ROUNDS as string));
    user.password = hashedPassword;

    // Creating query and values
    const { query, values } = keysToInsertQuery(user, 'users');

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
export const selectUserByUsername = async (username: string, withPassword?: boolean) => {
    const data = await request(SELECT_USER_BY_USERNAME, [username]) as (User & {password?: string})[];
    let user = data[0];

    // If should not return password, prevent it from being sent
    if(!withPassword) delete user?.password;

    // Returning user
    return user;
}

/**
 * Selects user item by ID
 * @param itemId required, a snowflake ID
 * @returns an item object or undefined if it doesn't exist
*/
export const selectUserItemById = async (itemId: string) => {
    const data = await request(SELECT_USER_ITEM_BY_ID, [itemId]) as UserItem[];
    const item = data[0];
    return item;
}

/**
 * Create a user item
 @param partialItem required
 @returns an Item object
*/
export const createUserItemAction = async (itemArgs: CreateUserItemArgs) => {
    // Creating item ID
    itemArgs.id = generateUniqueId();

    // Creating query and values
    const { query, values } = keysToInsertQuery(itemArgs, 'items');

    // Inserting item
    await request(query, values);

    // Retrieving created item
    const item = await selectUserItemById(itemArgs.id);
    return item;
}