import { User } from "../../utils/types";
import userInitialState from "./userInitialState";

export type UserAction = {
    type: 'SET_USER',
    payload: any
}
export type UserState = {user: User | null, loading: boolean};

export const SET_USER = 'SET_USER';