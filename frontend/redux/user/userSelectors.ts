import { createSelector } from "reselect";
import { RootState } from "../store";

export const selectUser = (state: RootState) => state.user.user;
export const selectUserDisplay = createSelector(
    [selectUser],
    (user) => ({
        username: user?.username,
        name: user?.name,
        bio: user?.bio,
        avatarURL: user?.avatarURL,
        bannerURL: user?.bannerURL
    })
);
export const selectUserItems = createSelector(
    [selectUser],
    (user) => user?.items
);

export const selectUserIsMe = (state: RootState) => state.user.user?.isMe;