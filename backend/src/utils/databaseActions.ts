import bcrypt from 'bcrypt';
import { Snowflake } from 'nodejs-snowflake';
import { CreateUserArgs, CreateUserItemArgs, UpdateUserArgs, UpdateUserItemArgs } from "../mutations/user";
import { connection } from '../index';
import { DELETE_USER_ITEM_BY_ID, SELECT_USER_BY_ID, SELECT_USER_BY_USERNAME, SELECT_USER_ITEMS_BY_USER_ID, SELECT_USER_ITEM_BY_ID, SELECT_USER_ITEM_COUNT } from "./queries";
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
    const keys = Object.keys(object).map(key => `\`${key}\``).join(', ');
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
 * Converts object with keys to an update query
 * @param object required, the object of keys to map
 * @param table required, the table of insertion
 * @param where required, defines the where query
 * @returns object with query (string) and values (array of values) as properties
*/
const keysToUpdateQuery = (object: Object, table: string, where: string) => {
    // Defining what properties should be updated
    let query = `UPDATE ${table} SET `;
    const keys = Object.keys(object).map(key => `\`${key}\` = ?`).join(', ');
    query += keys;

    // Adding where this update should take place
    query += ` ${where}`;

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
 * Updates a user
 * @param userArgs a partial user object, with property id being required
 * @returns a user object
 */
export const updateUserAction = async (userArgs: UpdateUserArgs) => {
    const id = userArgs.id;
    
    // Checking if user updates username, and if it already exists
    if(userArgs.username && (await selectUserByUsername(userArgs.username))) throw new Error('Username already taken.'); 

    // Getting query and values
    const { query, values } = keysToUpdateQuery(userArgs, 'users', `WHERE id = ?`);
    
    // Pushing id to values since we added our own question mark as WHERE query
    values.push(id as any);

    // Updating user
    await request(query, values);

    // Returning new user object
    const user = await selectUserById(id);
    return user;
}

/**
 * Select a user by username
 @param username required
 @param withPassword optional
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
 * Select a user by id
 @param id required
 @param withPassword optional 
 @returns a user object or undefined if no user is found
*/
export const selectUserById = async (id: string, withPassword?: boolean) => {
    const data = await request(SELECT_USER_BY_ID, [id]) as (User & {password?: string})[];
    let user = data[0];

    // If should not return password, prevent it from being sent
    if(!withPassword) delete user?.password;

    // Returning user
    return user;
}

/**
 * Selects items by userId
 * @param userId required
 * @returns an array of item objects
*/
export const selectItemsByUserId = async (userId: string) => {
    const items = await request(SELECT_USER_ITEMS_BY_USER_ID, [userId]);
    return items;
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
 * Get the count of a user's items
 * @param userId required
 * @returns user item count
*/
export const selectUserItemCount = async (userId: string) => {
    const data = await request(SELECT_USER_ITEM_COUNT, [ userId ]) as [{ count: number }];
    if(!data || !data[0]) return 0;

    const count = data[0].count;
    return count;
}

/**
 * Create a user item
 @param partialItem required
 @returns an Item object
*/
export const createUserItemAction = async (itemArgs: CreateUserItemArgs) => {
    // Creating item ID
    itemArgs.id = generateUniqueId();

    // Determining order of item
    const order = await selectUserItemCount(itemArgs.userId);
    itemArgs.order = order;

    // If icon propertty is present, update iconURL
    if(itemArgs.icon) {
        itemArgs.iconURL = `${process.env.IMAGE_ENDPOINT}/icons/${itemArgs.icon}.png`;
    }

    // Creating query and values
    const { query, values } = keysToInsertQuery(itemArgs, 'items');
    console.log(query, values);
    
    // Inserting item
    await request(query, values);

    // Retrieving created item
    const item = await selectUserItemById(itemArgs.id);
    return item;
}

/** 
 * Destorys a user item
 * @param id required, the ID of the item
 * @returns true
*/
export const destroyUserItemAction = async (id: string) => {
    await request(DELETE_USER_ITEM_BY_ID, [id]);
    return true;
}

/** 
 * Updates a user item
 * @param partialItem required, with id being required, other properties optional
 * @returns an item object
*/
export const updateUserItemAction = async (item: UpdateUserItemArgs) => {
    // Creating query and values
    const { query, values } = keysToUpdateQuery(item, 'items', 'WHERE id = ?');

    // Pushing values since we manually added question mark in where clause
    values.push(item.id as any);

    // Updating item
    await request(query, values);

    // Retrieving new item
    const newItem = await selectUserItemById(item.id);
    return newItem;
}