import { RequestAuth, User, UserItem } from "../types";
import { createUserAction, createUserItemAction, destroyUserItemAction, selectUserItemById, updateUserAction, updateUserItemAction } from "../utils/databaseActions";

export type CreateUserArgs = Partial<User> & {
    username: string;
    password: string;
}
export const createUser = async (_: any, userArgs: CreateUserArgs) => {
    const user = createUserAction(userArgs);
    return user;
}

export type UpdateUserArgs = Partial<User> & {
    id: string;
};
export const updateUser = async (_: any, userArgs: UpdateUserArgs, { userId }: RequestAuth) => {
    // Checking for authorization
    if(userId !== userArgs.id) throw new Error('Unauthorized.');

    // Updating user
    const user = await updateUserAction(userArgs);
    return user;
}

export type CreateUserItemArgs = UserItem;
export const createUserItem = async (_: any, itemArgs: CreateUserItemArgs, context: RequestAuth)  => {
    // Checking if user is authorized
    const { userId } = context;
    if(userId !== itemArgs.userId) throw new Error('Unauthorized.');

    // If authorized, create item
    const item = await createUserItemAction(itemArgs);
    return item;
}

export const destroyUserItem = async (_: any, { id }: {id: string}, { userId }: RequestAuth) => {
    // Fetching item
    const item = await selectUserItemById(id);
    if(!item) throw new Error('Item does not exist.');

    // Checking if user is authorized
    if(userId !== item.userId) throw new Error('Unauthorized.');

    // Destroying item
    const response = await destroyUserItemAction(item.id);
    return response;
}

export type UpdateUserItemArgs = Partial<UserItem> & {
    id: string;
};
export const updateUserItem = async (_: any, item: UpdateUserItemArgs, { userId }: RequestAuth) => {
    // Fetching item
    const currentItem = await selectUserItemById(item.id)
    if(!currentItem) throw new Error('Item does not exist.');

    // Checking if user is authorized
    if(userId !== currentItem.userId) throw new Error('Unauthorized.');

    // Updating item
    const response = await updateUserItemAction(item);
    return response;
}