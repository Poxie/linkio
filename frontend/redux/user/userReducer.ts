import userInitialState from "./userInitialState";
import { SET_USER, UserAction, UserState } from "./userTypes";

export const userReducer: (state: UserState, action: UserAction) => any = (state=userInitialState, action: UserAction) => {
    switch(action.type) {
        case SET_USER: {
            return {
                user: action.payload,
                loading: false
            }
        }
        default:
            return state;
    }
}