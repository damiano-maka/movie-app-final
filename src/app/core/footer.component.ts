import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  changeDetection:ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
     <div class="relative isolate overflow-hidden bg-gray-900 py-16 sm:py-24 lg:py-32 ">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class="mx-auto max-w-2xl grid-cols-1 gap-x-8 gap-y-16 justify-center lg:max-w-none lg:grid-cols-2">
  
      <dl class="gap-5 classe">
        <div class="flex flex-col items-start ">
          <div class="rounded-md bg-white p-2 ring-1 ring-white/10">
          <svg aria-hidden="true" (click)="click()" class="octicon octicon-mark-github cursor-pointer" height="24" version="1.1" viewBox="0 0 16 16" width="24"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
          </svg>
          </div>
          <dt class="mt-4 font-semibold text-white" >Created by <u class="cursor-pointer" (click)="click()">&copy;DamianoMaka</u></dt>
          <dd class="mt-2 leading-7 text-gray-400">A passionate Jr.Frontend Dev based in Rome, showcasing expertise in web app development and client-side design.</dd>
        </div>
        <div class="flex flex-col items-start">
          <div class="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
            <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 013.15 0V15M6.9 7.575a1.575 1.575 0 10-3.15 0v8.175a6.75 6.75 0 006.75 6.75h2.018a5.25 5.25 0 003.712-1.538l1.732-1.732a5.25 5.25 0 001.538-3.712l.003-2.024a.668.668 0 01.198-.471 1.575 1.575 0 10-2.228-2.228 3.818 3.818 0 00-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0116.35 15m.002 0h-.002" />
            </svg>
          </div>
          <dt class="mt-4 font-semibold text-white">No spam</dt>
          <dd class="mt-2 leading-7 text-gray-400">DAM! STREAMING is a sanctuary from the relentless barrage of unwanted emails,and intrusive notifications.</dd>
        </div>
      </dl>
    </div>
  </div>
  <div class="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
    <div class="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
  </div>
</div>
  `,
  styles: [`
  .classe{
    display: flex;
  }



  @media only screen and (max-width: 450px) {
  
  .classe{
   flex-direction: column;

  }
  
}
  `]
})
export class FooterComponent {
click(){
  window.open('https://github.com/damiano-maka', '_blank')
}
}
