import { logout } from "../auth/logout";

/**
 * Terminates the current user session.
 *
 * This is the single entry point for session expiration.
 * Other modules (refresh manager, interceptors, etc.)
 * should call expireSession() instead of calling logout()
 * directly.
 */
export async function expireSession(): Promise<void> {
  await logout();
}