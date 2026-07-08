import { tokenStorage } from "./tokenStorage";
import { userStorage } from "./userStorage";

export const clearStorage = () => {
  tokenStorage.clearTokens();
  userStorage.clearUsername();
};