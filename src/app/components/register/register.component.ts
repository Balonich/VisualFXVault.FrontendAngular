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
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    RouterModule,
    MatCardModule,
    MatOptionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;
  registerError = '';

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      PersonName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(3)]],
      Gender: ['', Validators.required],
    });
  }

  register(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.registerError = '';
      const user = this.registerForm.value;

      this.usersService.register(user).subscribe({
        next: () => {
          // Auth state is now handled by signals in the service
          this.router.navigate(['products', 'showcase']);
        },
        error: (error: any) => {
          this.registerError =
            error.error?.message || 'Registration failed. Please try again.';
          console.error(error);
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    } else {
      // Mark form controls as touched to trigger validation messages
      this.registerForm.markAllAsTouched();
    }
  }

  get emailFormControl(): FormControl {
    return this.registerForm.get('Email') as FormControl;
  }

  get passwordFormControl(): FormControl {
    return this.registerForm.get('Password') as FormControl;
  }

  get personNameFormControl(): FormControl {
    return this.registerForm.get('PersonName') as FormControl;
  }

  get genderFormControl(): FormControl {
    return this.registerForm.get('Gender') as FormControl;
  }
}
