import { refreshToken } from "../auth/refreshToken";

/**
 * Executes the refresh token request.
 *
 * This module is responsible ONLY for performing the
 * refresh HTTP request.
 */
export async function executeRefresh(): Promise<void> {
  await refreshToken();
}