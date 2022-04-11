import { createSelector } from "reselect";
import { RootState } from "../store";

export const selectMe = (state: RootState) => state.me.user;
export const selectMeId = (state: RootState) => state.me.user?.id;
export const selectMeUpdating = (state: RootState)=> state.me.updating;
export const selectMeItems = (state: RootState) => state.me.user?.items;
export const selectMeColors = (state: RootState) => state.me.user?.colorScheme;
export const selectMeLoading = (state: RootState) => state.me.loading;

export const selectMeDisplay = createSelector(
    [selectMe],
    (user) => ({
        username: user?.username,
        name: user?.name,
        bio: user?.bio,
        bannerURL: user?.bannerURL,
        avatarURL: user?.avatarURL,
    })
)