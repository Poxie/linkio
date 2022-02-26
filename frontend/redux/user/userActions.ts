import { User } from "../../utils/types";
import { SET_USER } from "./userTypes";

export const setUser = (user: User) => ({
    type: SET_USER,
    payload: user
})