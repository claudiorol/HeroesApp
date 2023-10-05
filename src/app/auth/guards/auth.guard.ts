import { inject } from '@angular/core'
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs';

const checkAuthStatus = () => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuth().pipe(
    tap( ( isAuthenticated ) => {
      if ( !isAuthenticated ) {
        router.navigate(['/auth/login'])
      }
    })
  )
}

export const canActivateGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return checkAuthStatus();
};
 
export const canMatchGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  return checkAuthStatus();
};
