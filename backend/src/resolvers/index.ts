import { createUser, createUserItem, destroyUserItem, updateUser, updateUserItem } from "../mutations/user";
import { getUserByUsername, login } from "../queries/user";
import User from "./User";

export default {
    Query: {
        getUserByUsername,
        login
    },
    Mutation: {
        createUser,
        updateUser,
        createUserItem,
        destroyUserItem,
        updateUserItem
    },
    User
}