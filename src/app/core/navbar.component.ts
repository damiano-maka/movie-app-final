import { AsyncPipe, DOCUMENT, JsonPipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-navbar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, RouterLink, AsyncPipe, JsonPipe],
  template: `
    <div
      class="navbar text-neutral-content"
      style="background-color: var(--sfondo-scuro);"
    >
      <div class="flex-0">
        <img
          src="././assets/logo.png"
          class="cursor-pointer"
          width="100"
          routerLink="/home"
          alt="page-logo-dm"
        />
      </div>

      @if (authSig()) {
      <div class="flex-1 gap-2">
        <a class="btn btn-ghost text-white text-xl" routerLink="home/movies"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 30 30"
            width="30"
            height="30"
          >
            <path
              fill="white"
              d="M21 13v10h-6v-6h-6v6h-6v-10h-3l12-12 12 12h-3zm-1-5.907v-5.093h-3v2.093l3 3z"
            /></svg
        ></a>
        <a
          class="btn btn-ghost text-white text-xl flex justify-center ml-auto"
          routerLink="/search"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 30 30"
            width="30"
            height="30"
            fill="none"
            stroke="white"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" /></svg
        ></a>
      </div>
      <div class="flex-none gap-2 mr-5">
        <div class="dropdown dropdown-end">
          <div class="avatar" tabindex="0" role="button">
            <div
              class="w-11 rounded-full ring ring-offset-base-100 ring-offset-2"
            >
              <img [src]="user()?.picture" />
            </div>
          </div>

          <ul
            tabindex="0"
            class="mt-3 z-[1] p-2 shadow menu menu-lg md:menu-md dropdown-content rounded-box w-52"
            style="background-color: var(--sfondo-nav);"
          >
            <li (click)="itemClick()"><a routerLink="mylist">My list</a></li>
            <li (click)="itemClick()">
              <a class="justify-between" routerLink="profile">Profile</a>
            </li>
            <li
              (click)="
                auth.logout({
                  logoutParams: {
                    returnTo: 'https://dami-streaming.vercel.app/'
                  }
                })
              "
            >
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
      } @else{
      <button
        class="btn btn-neutral text-white text-xl hover:btn-ghost mr-5 mx-auto"
        (click)="auth.loginWithRedirect()"
      >
        Log in
      </button>
      }
    </div>
  `,
  styles: [
    `
      img:hover {
        transform: scale(1.23);
        transition: ease-in 450ms;
      }
    `,
  ],
})
export class NavbarComponent {
  auth = inject(AuthService);
  document = inject(DOCUMENT);
  authSig = toSignal(this.auth.isAuthenticated$);
  user = toSignal(inject(AuthService).user$);

  itemClick() {
    const el = document.activeElement as HTMLElement;
    el.blur();
  }
}
