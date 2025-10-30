import {Component, ViewChild} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {
  FormControl,
  FormGroup,
  Validators,
  ValidationErrors,
  AbstractControl,
  ReactiveFormsModule
} from '@angular/forms';
import {RegisterService} from '../services/register.service';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-register',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    ToastComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  @ViewChild('toast') toast!: ToastComponent;

  fieldsForm: FormGroup;

  constructor(
    private router: Router,
    private registerService: RegisterService,
  ) {
    this.fieldsForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      rpassword: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email])
    }, { validators: this.passwordMatchValidator });
  }

  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const rpassword = control.get('rpassword')?.value;
    return password && rpassword && password !== rpassword ? { mismatch: true } : null;
  }

  register() {
    this.fieldsForm.markAllAsTouched();
    if (this.fieldsForm.invalid) {
      this.toast.show('Fill in all fields correctly!', 'warning');
      return;
    }
    if (this.fieldsForm.valid) {
      const nameRegisterForm = this.fieldsForm.get('name')?.value;
      const usernameRegisterForm = this.fieldsForm.get('username')?.value;
      const passwordRegisterForm = this.fieldsForm.get('password')?.value;
      const emailRegisterForm = this.fieldsForm.get('email')?.value;
      this.registerService.register(
        nameRegisterForm,
        usernameRegisterForm,
        passwordRegisterForm,
        emailRegisterForm
      ).subscribe({
        next: () => {
          this.toast.show('Registration completed successfully!', 'success');
          this.router.navigate(['/login']).then();
        },
        error: (err) => {
          this.toast.show(err.error.message, 'danger');
        }
      })
    }
  }

}
