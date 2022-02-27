import { createUser } from "../mutations/user";
import { getUserByUsername } from "../queries/user";
import User from "./User";


export default {
    Query: {
        getUserByUsername
    },
    Mutation: {
        createUser
    },
    User
}