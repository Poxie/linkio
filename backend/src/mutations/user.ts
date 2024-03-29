import { RequestAuth, User, UserItem } from "../types";
import { reorderItems } from "../utils";
import { createUserAction, createUserItemAction, destroyUserItemAction, selectItemsByUserId, selectUserItemById, updateUserAction, updateUserItemAction, updateUserItemsAction } from "../utils/databaseActions";
const presetIcons = ['youtube', 'snapchat', 'instagram', 'twitch'];

export type CreateUserArgs = Partial<User> & {
    username: string;
    password: string;
}
export const createUser = async (_: any, userArgs: CreateUserArgs) => {
    const user = createUserAction(userArgs);
    return user;
}

export type UpdateUserArgs = {
    id: string;
    user: Partial<User>;
}
export const updateUser = async (_: any, { user: userArgs, id }: UpdateUserArgs, { userId }: RequestAuth) => {
    // Checking for authorization
    if(userId !== id) throw new Error('Unauthorized.');

    // Updating user
    const user = await updateUserAction(id, userArgs);
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

    // Updating order properties of other items
    const items = await selectItemsByUserId(userId, true);
    const newItems = reorderItems(items, item.order);
    updateUserItemsAction(userId, newItems);
    
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

    // If icon property is present, check for preset of icons
    if(item.icon && presetIcons.includes(item.icon)) {
        item.iconURL = `${process.env.IMAGE_ENDPOINT}/icons/${item.icon}.png`
    }

    // Updating item
    const response = await updateUserItemAction(item);
    return response;
}

export type UpdateItemsArgs = {
    items: UserItem[];
    userId: string;
}
export const setUserItems = async (_: any, { items, userId }: UpdateItemsArgs, { userId: _userId }: RequestAuth) => {
    if(userId !== _userId) throw new Error('Unauthorized.');

    items.forEach(item => {
        // Makes sure you can't set user items for others
        item.userId = userId;

        // If icon property is present, check for preset of icons
        if(item.icon && presetIcons.includes(item.icon)) {
            item.iconURL = `${process.env.IMAGE_ENDPOINT}/icons/${item.icon}.png`
        }
    });

    const response = await updateUserItemsAction(userId, items);
    return response;
}