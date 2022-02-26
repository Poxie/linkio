import { createSelector } from "reselect";
import { RootState } from "../store";

export const selectUser = (state: RootState) => state.user.user;
export const selectUserDisplay = createSelector(
    [selectUser],
    (user) => ({
        username: user?.username,
        name: user?.name,
        avatarURL: user?.avatarURL,
        bannerURL: user?.bannerURL
    })
);