import userInitialState from "./userInitialState";
import { REMOVE_USER_ITEM, SET_USER, SET_USER_IS_ME, SET_USER_ITEM, SET_USER_ITEMS, UserAction, UserState } from "./userTypes";

export const userReducer: (state: UserState, action: UserAction) => any = (state=userInitialState, action: UserAction) => {
    switch(action.type) {
        case SET_USER: {
            return {
                user: action.payload,
                loading: false
            }
        }
        case SET_USER_ITEM: {
            const id = action.payload.id;

            // Creating new array of items, with updated user item
            let found;
            const newItems = state.user?.items?.map(item => {
                if(item.id === id) {
                    found = true;
                    return {...action.payload};
                }
                return item;
            })

            // If item does not exist, push it to item array
            if(!found) {
                newItems?.push({...action.payload});
            }
            
            const user = {
                ...state.user,
                items: newItems
            }
            return {
                ...state,
                user
            }
        }
        case SET_USER_ITEMS: {
            const user = {...state.user, items: [...action.payload]};
            return {
                ...state,
                user
            }
        }
        case REMOVE_USER_ITEM: {
            const items = state.user?.items.filter(item => item.id !== action.payload) || [];
            const user = {
                ...state.user,
                items
            }

            return {
                ...state,
                user
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