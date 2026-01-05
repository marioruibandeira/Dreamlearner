import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class AuthLayoutComponent { }
