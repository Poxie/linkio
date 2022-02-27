import { createUser, createUserItem } from "../mutations/user";
import { getUserByUsername, login } from "../queries/user";
import User from "./User";

export default {
    Query: {
        getUserByUsername,
        login
    },
    Mutation: {
        createUser,
        createUserItem
    },
    User
}