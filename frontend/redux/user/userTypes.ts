import { User } from "../../utils/types";
import userInitialState from "./userInitialState";

export type UserAction = {
    type: 'SET_USER' | 'UPDATE_USER' | 'SET_USER_ITEM' | 'SET_USER_ITEMS' | 'REMOVE_USER_ITEM' | 'SET_USER_IS_ME',
    payload: any
}
export type UserState = {user: (User & {isMe?: boolean}) | null, loading: boolean};

export const SET_USER = 'SET_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const SET_USER_ITEM = 'SET_USER_ITEM';
export const SET_USER_ITEMS = 'SET_USER_ITEMS';
export const REMOVE_USER_ITEM = 'REMOVE_USER_ITEM';
export const SET_USER_IS_ME = 'SET_USER_IS_ME';