import { User } from "../../utils/types";
import meInitialState from "./meInitialState";
import { SET_ME, MeAction, MeState, SET_ME_ITEMS, SET_ME_DISPLAY, REMOVE_ME_ITEM, SET_ME_COLOR, SET_ME_BANNER, SET_ME_AVATAR, SET_ME_UPDATING, SET_ME_ITEM } from "./meTypes";

export const meReducer: (state: MeState, action: MeAction) => any = (state=meInitialState, action: MeAction) => {
    switch(action.type) {
        case SET_ME_UPDATING: {
            return {
                ...state,
                updating: action.payload
            }
        }
        case SET_ME: {
            return {
                ...state,
                user: action.payload,
                loading: false
            }
        }
        case SET_ME_DISPLAY: {
            return {
                ...state,
                user: {
                    ...state.user,
                    [action.payload.type]: action.payload.value
                }
            }
        }
        case SET_ME_ITEM: {
            let exists;
            const items = state.user?.items.map(item => {
                if(item.id === action.payload.id) {
                    exists = true;
                    return action.payload;
                }
                return item;
            })
            if(!exists) items?.push(action.payload);

            return {
                ...state,
                user: {
                    ...state.user,
                    items
                }
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
            const item = state.user?.items.find(item => item.id === action.payload);
            if(!item) return {...state};

            // Updating order of affected items and filter out removed item
            const items = state.user?.items.map(i => {
                const newItem = {...i};
                if(newItem.order > item.order) {
                    newItem.order--;
                }
                return newItem;
            }).filter(i => i.id !== item.id);
            const user = {
                ...state.user,
                items
            }

            return {
                ...state,
                user
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
        case SET_ME_AVATAR: {
            return {
                ...state,
                user: {
                    ...state.user,
                    avatarURL: action.payload
                }
            }
        }
        case SET_ME_BANNER: {
            return {
                ...state,
                user: {
                    ...state.user,
                    bannerURL: action.payload
                }
            }
        }
        default:
            return state;
    }
}