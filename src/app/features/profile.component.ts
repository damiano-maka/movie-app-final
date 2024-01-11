import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
      <h1>Your Profile</h1>
    @if (user$ | async; as user) {
      <h1>{{ user?.name }}</h1>
      <h1>{{ user?.nickname }}</h1>
      <h1>{{ user?.email }}</h1>
    }
    <pre>{{ user$ | async | json }}</pre>
  `,
  styles: ``
})
export default class ProfileComponent {
  user$ = inject(AuthService).user$
}
