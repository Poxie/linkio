import userInitialState from "./userInitialState";
import { SET_USER, SET_USER_IS_ME, UserAction, UserState } from "./userTypes";

export const userReducer: (state: UserState, action: UserAction) => any = (state=userInitialState, action: UserAction) => {
    switch(action.type) {
        case SET_USER: {
            return {
                user: action.payload,
                loading: false
            }
        }
        case SET_USER_IS_ME: {
            const newUser = {
                ...state.user,
                isMe: action.payload
            }
            return {
                ...state,
                user: newUser,
            }
        }
        default:
            return state;
    }
}