import meInitialState from "./meInitialState";
import { SET_ME, MeAction, MeState } from "./meTypes";

export const meReducer: (state: MeState, action: MeAction) => any = (state=meInitialState, action: MeAction) => {
    switch(action.type) {
        case SET_ME: {
            return {
                user: action.payload,
                loading: false
            }
        }
        default:
            return state;
    }
}