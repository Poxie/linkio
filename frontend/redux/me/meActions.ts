import { Item, User } from "../../utils/types";
import { REMOVE_ME_ITEM, SET_ME, SET_ME_AVATAR, SET_ME_BANNER, SET_ME_COLOR, SET_ME_ITEM, SET_ME_ITEMS, SET_ME_UPDATING } from "./meTypes";

export const setMe = (me: User | null) => ({
    type: SET_ME,
    payload: me
})
export const setMeUpdating = (state: boolean) => ({
    type: SET_ME_UPDATING,
    payload: state
})
export const setMeItem = (item: Item) => ({
    type: SET_ME_ITEM,
    payload: item
})
export const setMeItems = (items: Item[]) => ({
    type: SET_ME_ITEMS,
    payload: items
})
export const removeMeItem = (id: string) => ({
    type: REMOVE_ME_ITEM,
    payload: id
})
export const setMeColor = (type: keyof User['colorScheme'], property: keyof User['colorScheme'][keyof User['colorScheme']], value: string | null) => ({
    type: SET_ME_COLOR,
    payload: { type, property, value }
})
export const setMeBanner = (bannerURL: string) => ({
    type: SET_ME_BANNER,
    payload: bannerURL
})
export const setMeAvatar = (avatarURL: string) => ({
    type: SET_ME_AVATAR,
    payload: avatarURL
})