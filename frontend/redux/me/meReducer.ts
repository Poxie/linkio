import meInitialState from "./meInitialState";
import { SET_ME, MeAction, MeState, SET_ME_ITEMS, REMOVE_ME_ITEM } from "./meTypes";

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
        case REMOVE_ME_ITEM: {
            return {
                ...state,
                user: {
                    ...state.user,
                    items: state.user?.items.filter(item => item.id !== action.payload)
                }
            }
        }
        default:
            return state;
    }
}