import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideAuth0 } from '@auth0/auth0-angular';
import { provideHttpClient } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';

const firebaseConfig = {
  //YOUR FIREBASE CONFIG GOES HERE 
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions()),
    provideHttpClient(),
    provideAuth0({
      domain: 'dev-hgt3pxxduftflrlo.us.auth0.com',
      clientId: 'VClVLVEV1X68ojkDjs3oTpowAu9EjE2v',
      authorizationParams: {
        redirect_uri: 'https://dami-streaming.vercel.app/',
        audience: 'http://public-api/',
        scope:
          'openid profile email offline_access read:roles read:users read:logs ',
      },
      useRefreshTokens: true,
      cacheLocation: 'localstorage',
    }),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideFirestore(() => getFirestore()),
      provideStorage(() => getStorage()),
    ]),
  ],
};
/* "https://damiano-maka.github.io/auth0/" */
