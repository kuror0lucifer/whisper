import { RootState } from "../store";

export const selectUserData = (state: RootState) => state.user.userData;

export const selectUserEmail = (state: RootState) => state.user.userData?.email;

export const selectUserId = (state: RootState) => state.user.userData?.id;

export const selectIsUserLoggedIn = (state: RootState) => !!state.user.userData;
