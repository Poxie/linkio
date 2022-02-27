import { RequestAuth, User, UserItem } from "../types";
import { createUserAction, createUserItemAction } from "../utils/databaseActions";

export type CreateUserArgs = Partial<User> & {
    username: string;
    password: string;
}
export const createUser = async (_: any, userArgs: CreateUserArgs) => {
    const user = createUserAction(userArgs);
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