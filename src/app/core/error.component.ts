import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-error',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <main class="grid min-h-full place-items-center  vh py-5">
      <div class="text-center">
        <p class="font-semibold text-4xl tracking-tight text-gray-400 ">404</p>
        <h1 class="mt-4 text-5xl font-bold tracking-tight text-white">
          Page not found
        </h1>
        <p class="mt-6 text-base leading-7 text-white">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <button class="btn btn-neutral text-white" routerLink="/home">
            Go back home
          </button>
        </div>
      </div>
    </main>
  `,
  styles: [
    `
      .vh {
        min-height: 55vh;
        margin-bottom: 100px;
      }
    `,
  ],
})
export default class ErrorComponent {}
