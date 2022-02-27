import { User } from "../types";
import { createUserAction } from "../utils/databaseActions";

export type CreateUserArgs = Partial<User> & {
    username: string;
}
export const createUser = async (_: any, userArgs: CreateUserArgs) => {
    const user = createUserAction(userArgs);
    return user;
}