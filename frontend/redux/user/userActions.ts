import { Item, User } from "../../utils/types";
import { REMOVE_USER_ITEM, SET_USER, SET_USER_DISPLAY, SET_USER_IS_ME, SET_USER_ITEM, SET_USER_ITEMS, UPDATE_USER } from "./userTypes";

export const setUser = (user: User) => ({
    type: SET_USER,
    payload: user
})
export const updateUser = (user: Partial<User>) => ({
    type: UPDATE_USER,
    payload: user
})
export const setUserDisplay = (type: 'name', value: string) => ({
    type: SET_USER_DISPLAY,
    payload: { type, value }
})
export const setUserItem = (item: Item) => ({
    type: SET_USER_ITEM,
    payload: item
})
export const setUserItems = (items: Item []) => ({
    type: SET_USER_ITEMS,
    payload: items
})
export const removeUserItem = (id: string) => ({
    type: REMOVE_USER_ITEM,
    payload: id
})
export const setUserIsMe = (isMe: boolean) => ({
    type: SET_USER_IS_ME,
    payload: isMe
})