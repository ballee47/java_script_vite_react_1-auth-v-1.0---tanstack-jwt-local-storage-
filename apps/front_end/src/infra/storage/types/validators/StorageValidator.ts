/**
 * Base contract for all storage validators.
 *
 * Every validator must implement this interface.
 */
export interface StorageValidator<TRequest> {
  /**
   * Validates a request.
   *
   * @param request - The request to validate.
   * @returns True if the request is valid.
   */
  validate(request: TRequest): boolean;
}