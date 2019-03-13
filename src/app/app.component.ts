import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { AuthConfig, OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
import { isPlatformBrowser } from '@angular/common';
import { environment } from 'src/environments/environment.prod';



const authConfig: AuthConfig = {
  // Url of the Identity Provider
  issuer: environment.authUrl,
  requireHttps: false,

  // URL of the SPA to redirect the user to after login
  redirectUri: 'https://localhost:4200/callback',

  // The SPA's id. The SPA is registerd with this id at the auth-server
  clientId: 'spa',

  // set the scope for the permissions the client should request
  // The first three are defined by OIDC. The 4th is a usecase-specific on
  scope: 'openid profile BotWebAPI',
  postLogoutRedirectUri: 'https://localhost:4200/callback'
};


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FlowGraph Web';

  constructor(@Inject(PLATFORM_ID) private platformId: object,
              private oauthService: OAuthService) {
    if (isPlatformBrowser(this.platformId)) {
      this.oauthService.configure(authConfig);
      this.oauthService.tokenValidationHandler = new JwksValidationHandler();
      this.oauthService.loadDiscoveryDocumentAndTryLogin();
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {

      this.oauthService.loadDiscoveryDocumentAndTryLogin().then(_ => {
        if (
          !this.oauthService.hasValidIdToken() ||
          !this.oauthService.hasValidAccessToken()
        ) {
          this.oauthService.initImplicitFlow();
        }
      });
    }
  }
}


