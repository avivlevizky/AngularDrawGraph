import { Component, OnInit } from '@angular/core';
import { OAuthService, OAuthStorage } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';
import { UserInfo } from 'src/app/models';

@Component({
    templateUrl: 'callback.component.html'
})
export class CallbackComponent implements OnInit {

    constructor(private oauthService: OAuthService,
                private oauthStorage: OAuthStorage,
                private router: Router) {}

    ngOnInit() {
        this.oauthService.loadDiscoveryDocumentAndTryLogin().then(_ => {
            if (!this.oauthService.hasValidIdToken() || !this.oauthService.hasValidAccessToken()) {
                this.oauthService.initImplicitFlow();
            } else {
                this.oauthService.loadUserProfile().then((x: UserInfo) => {
                    this.oauthStorage.setItem('preferred_username', x.preferred_username);
                    this.router.navigate(['/flow_graph']);
                });

            }
        });
    }
}

