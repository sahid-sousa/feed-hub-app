import {Component, ViewChild} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    ToastComponent,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  @ViewChild('toast') toast!: ToastComponent;

  currentYear = new Date().getFullYear();
  fieldsForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {
    this.fieldsForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    })
  }

  login() {
    this.fieldsForm.markAllAsTouched();
    if (this.fieldsForm.valid) {
      const usernameLoginForm = this.fieldsForm.get('username')?.value;
      const passwordLoginForm = this.fieldsForm.get('password')?.value;
      this.authService.login(usernameLoginForm, passwordLoginForm).subscribe({
        next: (result) => {
          this.authService.saveAuthUser(JSON.stringify(result));
          const returnUrl = this.route.snapshot.params['returnUrl'] || '/pages';
          this.toast.show('Registration completed successfully!', 'success');
          this.router.navigate([returnUrl]).then();
        },
        error: (err) => {
          this.toast.show(err.error.message, 'danger');
        }
      });
    }
  }

}
