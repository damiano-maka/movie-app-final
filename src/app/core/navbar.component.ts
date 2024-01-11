import { AsyncPipe, DOCUMENT, JsonPipe } from '@angular/common';
import { Component, inject, signal  } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { toSignal } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,AsyncPipe,JsonPipe],
  template: `
 <div class="navbar bg-neutral text-neutral-content">
  <div class="flex-1">
    <a class="btn btn-ghost text-xl" routerLink="home">Movie Lab</a>
  </div>
  <div class="flex-none gap-2 mr-5">
    <div class="form-control mr-5">
      <input type="text" placeholder="Search" class="input input-bordered w-24 md:w-auto" />
    </div>
    @if (authSig()) {
      <div class="dropdown dropdown-end">
      <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>
      <ul tabindex="0" class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <a class="justify-between" routerLink="profile">
            Profile
            <!-- <span class="badge">New</span> -->
          </a>
        </li>
        <li><a>Settings</a></li>
        <li (click)="auth.logout({ logoutParams: { returnTo: document.location.origin } })"><a>Logout</a></li>
      </ul>
    </div>
    } @else {
     
      <button class="btn" (click)="auth.loginWithRedirect()">Log in</button>
    }
    

  </div>
</div>
<!--   <button routerLink="home">home</button>
    <button routerLink="profile">profile</button>

     @if (authSig()) {
      <button (click)="auth.logout({ logoutParams: { returnTo: document.location.origin } })">
        Log out
      </button>
    } @else {
      <button (click)="auth.loginWithPopup()">Log in</button>
    }
 -->

  `,
  styles: ``
})
export class NavbarComponent {
 auth = inject(AuthService)
 document = inject(DOCUMENT)
 authSig = toSignal(this.auth.isAuthenticated$)
}
