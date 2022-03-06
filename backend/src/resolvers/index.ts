import { GraphQLUpload } from 'graphql-upload';
import { createUser, createUserItem, destroyUserItem, setUserItems, updateUser, updateUserItem } from "../mutations/user";
import { getMe, getUserByUsername, login } from "../queries/user";
import User from "./User";

export default {
    Upload: GraphQLUpload,
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