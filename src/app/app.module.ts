import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppComponent } from './app.component';
import { HttpClient } from '@angular/common/http/src/client';
import { GithubAuthInterceptor } from './githubauth.interceptor';
import { ExplorerComponent } from './components/explorer/explorer.component';

@NgModule({
  declarations: [
    AppComponent,
    ExplorerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: GithubAuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
