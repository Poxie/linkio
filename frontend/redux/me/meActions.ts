import { Item, User } from "../../utils/types";
import { REMOVE_ME_ITEM, SET_ME, SET_ME_ITEMS } from "./meTypes";

export const setMe = (me: User | null) => ({
    type: SET_ME,
    payload: me
})
export const setMeItems = (items: Item[]) => ({
    type: SET_ME_ITEMS,
    payload: items
})
export const removeMeItem = (id: string) => ({
    type: REMOVE_ME_ITEM,
    payload: id
})