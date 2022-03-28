import { RootState } from "../store";

export const selectMe = (state: RootState) => state.me.user;
export const selectMeId = (state: RootState) => state.me.user?.id;
export const selectMeLoading = (state: RootState) => state.me.loading;