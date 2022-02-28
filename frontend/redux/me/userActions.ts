import { User } from "../../utils/types";
import { SET_ME } from "./meTypes";

export const setMe = (me: User) => ({
    type: SET_ME,
    payload: me
})