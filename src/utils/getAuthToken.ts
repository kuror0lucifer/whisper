import { AuthTokenPayload } from "../@types/authTokenPayload";

export const getAuthToken = (): AuthTokenPayload | null => {
  try {
    const token = localStorage.getItem("auth_token");
    if (!token) return null;

    return JSON.parse(atob(token.split(".")[1]));
  } catch (err) {
    console.error(err);
    return null;
  }
};
