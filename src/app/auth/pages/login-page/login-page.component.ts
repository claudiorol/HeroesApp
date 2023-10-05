import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [`hr { height: 1px; border: none; background-color: black; opacity: 0.7 }`]
})
export class LoginPageComponent {

  constructor ( 
    private authService: AuthService,
    private router: Router ) {}

  onLogin(user: string, password: string): void {
    this.authService.login(user, password).subscribe( user => {
      this.router.navigate(['/']);
    })
  }
}
