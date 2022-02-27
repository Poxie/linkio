import { User, UserItem } from "../types";
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
export const createUserItem = async (_: any, itemArgs: CreateUserItemArgs)  => {
    const item = await createUserItemAction(itemArgs);
    return item;
}