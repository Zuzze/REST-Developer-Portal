import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatInputModule, MatTabsModule, MatExpansionModule, MatChipsModule, MatFormFieldModule, MatButtonModule, MatFormField, MatToolbarModule, MatCardModule, MatSidenav, MatSidenavModule, MatCheckbox, MatCheckboxModule, MatIconModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

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
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTabsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatButtonModule, 
    MatChipsModule,
    MatToolbarModule,
    MatCardModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatIconModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: GithubAuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
