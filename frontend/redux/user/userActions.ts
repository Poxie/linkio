import { Item, User } from "../../utils/types";
import { SET_USER, SET_USER_IS_ME, SET_USER_ITEM } from "./userTypes";

export const setUser = (user: User) => ({
    type: SET_USER,
    payload: user
})
export const setUserItem = (item: Item) => ({
    type: SET_USER_ITEM,
    payload: item
})
export const setUserIsMe = (isMe: boolean) => ({
    type: SET_USER_IS_ME,
    payload: isMe
})