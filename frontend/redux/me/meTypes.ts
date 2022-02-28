import { User } from "../../utils/types";
import meInitialState from "./meInitialState";

export type MeAction = {
    type: 'SET_ME',
    payload: any
}
export type MeState = {user: User | null, loading: boolean};

export const SET_ME = 'SET_ME';