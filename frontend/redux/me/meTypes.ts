import { User } from "../../utils/types";
import meInitialState from "./meInitialState";

export type MeAction = {
    type: 'SET_ME' | 'SET_ME_ITEMS' | 'REMOVE_ME_ITEM' | 'SET_ME_COLOR',
    payload: any
}
export type MeState = {user: User | null, loading: boolean};

export const SET_ME = 'SET_ME';
export const SET_ME_ITEMS = 'SET_ME_ITEMS';
export const REMOVE_ME_ITEM = 'REMOVE_ME_ITEM';
export const SET_ME_COLOR = 'SET_ME_COLOR';