import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { authHttpInterceptorFn, provideAuth0 } from '@auth0/auth0-angular';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideHttpClient(
    ),
    provideAuth0({
      domain: 'dev-hgt3pxxduftflrlo.us.auth0.com',
      clientId: 'VClVLVEV1X68ojkDjs3oTpowAu9EjE2v',
      authorizationParams:{
        redirect_uri: window.location.origin,
        audience: 'http://public-api/',
        scope: 'openid profile email offline_access read:current:user'
      },
      useRefreshTokens:true,
      cacheLocation: 'localstorage',
    })]
};
