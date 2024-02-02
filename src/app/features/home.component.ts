import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '@auth0/auth0-angular';
import { RouterLink, RouterOutlet } from '@angular/router';
import { WelcomeComponent } from '../core/welcome.component';

@Component({
  selector: 'app-home',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, WelcomeComponent],
  template: `
    @if (authSig()) {
    <div
      class="navbar justify-center gap-5"
      style="background-color: var(--sfondo-nav);"
    >
      <button class="btn btn-neutral" routerLink="movies">Movies</button>
      <button class="btn btn-neutral" routerLink="series">Series</button>
    </div>
    <div class="vh">
      <router-outlet></router-outlet>
    </div>
    }@else {
    <app-welcome />
    }
  `,
  styles: [
    `
      .vh {
        min-height: 60vh;
      }
    `,
  ],
})
export default class HomeComponent implements OnInit {
  auth = inject(AuthService);
  authSig = toSignal(this.auth.isAuthenticated$);
  changeDetectorRef = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.changeDetectorRef.detectChanges();
  }
}
