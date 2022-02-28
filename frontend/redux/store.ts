import { $CombinedState, combineReducers, createStore } from "redux";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import reducers from "./reducers";
import { UserState } from "./user/userTypes";
import { MeState } from "./me/meTypes";

export const store = createStore(reducers);

export type RootState = {
    readonly [$CombinedState]?: undefined
} & {
    user: UserState,
    me: MeState
}
export type AppDispatch = typeof store.dispatch;

// Hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;