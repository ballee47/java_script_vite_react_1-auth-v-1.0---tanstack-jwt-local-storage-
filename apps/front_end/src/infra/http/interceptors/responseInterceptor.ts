import { AxiosError } from "axios";

import { AUTH_ROUTES } from "../auth/authRoutes";
import { handle401 } from "../refresh/index";
import { errorMapper } from "../errors/errorMapper";

import type { InternalRequestConfig } from "../types/request/internalRequestConfig";

export async function responseInterceptor(
  error: AxiosError
) {
  try {
    const request =
      error.config as InternalRequestConfig | undefined;

    // Invalid request configuration
    if (!request) {
      throw error;
    }

    // Network / DNS failure
    if (!error.response) {
      throw error;
    }

    // Request was cancelled
    if (error.code === "ERR_CANCELED") {
      throw error;
    }

    // Ignore authentication endpoints
    const url = request.url ?? "";

    if (AUTH_ROUTES.some(route => url.includes(route))) {
      throw error;
    }

    // Only recover Unauthorized responses
    if (error.response.status !== 401) {
      throw error;
    }

    // Delegate recovery to the refresh subsystem
    return await handle401(request);
  } catch (err) {
    throw errorMapper(err);
  }
}