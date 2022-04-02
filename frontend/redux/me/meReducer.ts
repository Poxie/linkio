import { User } from "../../utils/types";
import meInitialState from "./meInitialState";
import { SET_ME, MeAction, MeState, SET_ME_ITEMS, REMOVE_ME_ITEM, SET_ME_COLOR } from "./meTypes";

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
        case SET_ME_COLOR: {
            const { type, property, value }: { type: keyof User['colorScheme'], property: keyof User['colorScheme'][keyof User['colorScheme']], value: string } = action.payload;
            return {
                ...state,
                user: {
                    ...state.user,
                    colorScheme: {
                        ...state.user?.colorScheme,
                        [action.payload.type]: {
                            ...state.user?.colorScheme[type],
                            [property]: value
                        }
                    }
                }
            }
        }
        default:
            return state;
    }
}