import { RootState } from "../store";

export const selectUserData = (state: RootState) => state.user.userData;

export const selectUserEmail = (state: RootState) => state.user.email;

export const selectUserId = (state: RootState) => state.user.id;

export const selectIsUserLoggedIn = (state: RootState) => !!state.user.userData;
