type ValidationError = {error: {error: string, message: string[]}}
export function isError(apiError: unknown): apiError is ValidationError {
  return apiError !== null && typeof apiError === 'object' 
    && 'error' in apiError && apiError.error instanceof Object
    && 'message' in apiError.error
}

type ApiError = { error: string }
export function isApiError(apiError: unknown): apiError is ApiError {
  return apiError !== null && typeof apiError === 'object' && 'error' in apiError && typeof apiError.error === 'string'
}