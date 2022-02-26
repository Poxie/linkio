import { $CombinedState, combineReducers, createStore } from "redux";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import reducers from "./reducers";
import { UserState } from "./user/userTypes";

export const store = createStore(reducers);

export type RootState = {
    readonly [$CombinedState]?: undefined
} & {
    user: UserState
}
export type AppDispatch = typeof store.dispatch;

// Hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;