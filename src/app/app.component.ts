import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { UsersService } from './services/users.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    RouterModule,
    RouterLinkActive,
    ReactiveFormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  searchForm!: FormGroup;

  constructor(
    public usersService: UsersService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      searchStr: [''],
    });
  }

  search(): void {
    const searchTerm = this.searchForm.get('searchStr')?.value;
    if (searchTerm) {
      this.router.navigate(['/search'], { queryParams: { q: searchTerm } });
    }
  }

  logout() {
    this.usersService.logout();
    this.router.navigate(['products', 'showcase']);
  }
}
