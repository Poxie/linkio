import { createUser, createUserItem, destroyUserItem, setUserItems, updateUser, updateUserItem } from "../mutations/user";
import { getMe, getUserByUsername, login } from "../queries/user";
import User from "./User";

export default {
    Query: {
        getUserByUsername,
        login,
        getMe
    },
    Mutation: {
        createUser,
        updateUser,
        createUserItem,
        destroyUserItem,
        updateUserItem,
        setUserItems
    },
    User
}