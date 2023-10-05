import { inject } from '@angular/core'
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { tap, map } from 'rxjs';

const checkAuthStatus = () => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuth().pipe(
    tap( ( isAuthenticated ) => {
      if ( isAuthenticated ) {
        router.navigate(['/'])
      }
    }),
    map( isAuthenticated => !isAuthenticated )
  )
}

export const canActivatePublicGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return checkAuthStatus();
};
 
export const canMatchPublicGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  return checkAuthStatus();
};