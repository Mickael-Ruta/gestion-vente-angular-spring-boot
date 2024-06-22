import { CanActivateFn } from '@angular/router';

export const athentificationGuard: CanActivateFn = (route, state) => {
  return true;
};
