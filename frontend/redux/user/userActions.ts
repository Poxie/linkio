import { User } from "../../utils/types";
import { SET_USER, SET_USER_IS_ME } from "./userTypes";

export const setUser = (user: User) => ({
    type: SET_USER,
    payload: user
})
export const setUserIsMe = (isMe: boolean) => ({
    type: SET_USER_IS_ME,
    payload: isMe
})