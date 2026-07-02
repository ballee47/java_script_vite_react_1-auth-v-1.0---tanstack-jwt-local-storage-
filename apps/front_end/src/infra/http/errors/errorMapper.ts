import { AxiosError } from "axios";

import {
  NetworkError,
  TimeoutError,
  UnauthorizedError,
  ForbiddenError,
  HttpStatusError,
} from "./index";

export function errorMapper(error: unknown): Error {
  if (!(error instanceof AxiosError)) {
    return error instanceof Error
      ? error
      : new Error("An unknown error occurred.");
  }

  // Network / DNS / Offline
  if (!error.response) {
    return new NetworkError();
  }

  // Request cancelled
  if (error.code === "ERR_CANCELED") {
    return new TimeoutError();
  }

  switch (error.response.status) {
    case 401:
      return new UnauthorizedError();

    case 403:
      return new ForbiddenError();

    default:
      return new HttpStatusError(
        error.response.status,
        error.message
      );
  }
}