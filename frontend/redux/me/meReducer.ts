import meInitialState from "./meInitialState";
import { SET_ME, MeAction, MeState, SET_ME_ITEMS } from "./meTypes";

export const meReducer: (state: MeState, action: MeAction) => any = (state=meInitialState, action: MeAction) => {
    switch(action.type) {
        case SET_ME: {
            return {
                user: action.payload,
                loading: false
            }
        }
        case SET_ME_ITEMS: {
            return {
                ...state,
                user: {
                    ...state.user,
                    items: action.payload
                }
            }
        }
        default:
            return state;
    }
}