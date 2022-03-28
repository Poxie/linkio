import { Item, User } from "../../utils/types";
import { SET_ME, SET_ME_ITEMS } from "./meTypes";

export const setMe = (me: User | null) => ({
    type: SET_ME,
    payload: me
})
export const setMeItems = (items: Item[]) => ({
    type: SET_ME_ITEMS,
    payload: items
})