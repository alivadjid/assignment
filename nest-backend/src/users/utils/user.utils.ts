import { UserPayload } from '../entities/user-payload';

export function isUserInRequest(
  request: unknown,
): request is Request & { user: UserPayload } {
  return (
    !!request &&
    typeof request === 'object' &&
    'user' in request &&
    typeof request.user === 'object' &&
    'username' in request.user
  );
}
