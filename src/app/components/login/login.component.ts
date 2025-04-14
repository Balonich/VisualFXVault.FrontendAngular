import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthenticationResponse } from '../../models/authentication-response';
import { UsersService } from '../../services/users.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  loginError = '';

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', Validators.required],
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.loginError = '';
      const { Email, Password } = this.loginForm.value;

      this.usersService.login(Email, Password).subscribe({
        next: () => {
          // The auth state is now handled in the service with signals
          this.router.navigate(['products', 'showcase']);
        },
        error: (error: any) => {
          this.loginError =
            error.error?.message || 'Login failed. Please try again.';
          console.error(error);
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    } else {
      // Mark form controls as touched to trigger validation messages
      this.loginForm.markAllAsTouched();
    }
  }

  get emailFormControl(): FormControl {
    return this.loginForm.get('Email') as FormControl;
  }

  get passwordFormControl(): FormControl {
    return this.loginForm.get('Password') as FormControl;
  }
}
