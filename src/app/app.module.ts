import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { NgxGaugeModule } from 'ngx-gauge';
import { HighlightModule } from 'ngx-highlightjs';

import { CookieService } from 'ngx-cookie-service';

import { UserAuthGuard } from './guards/user-auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';

import { ToFixedPipe } from './pipes/to-fixed.pipe';
import { HtmlPipe } from './pipes/html.pipe';

import { AppComponent } from './app.component';
import { ErrorComponent } from './global/error/error.component';
import { LoadingComponent } from './global/loading/loading.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NotFound404Component } from './pages/not-found-404/not-found-404.component';
import { LoginComponent } from './pages/login/login.component';
import { WebsitesComponent } from './pages/websites/websites.component';
import { UserComponent } from './pages/user/user.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent, canActivate: [NoAuthGuard] },
  { path: 'user', component: UserComponent, canActivate: [UserAuthGuard], children: [
    { path: '', component: WebsitesComponent }
  ] },
  { path: '**', component: NotFound404Component }
];

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: true
};

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    LoadingComponent,
    HeaderComponent,
    FooterComponent,
    NotFound404Component,
    LoginComponent,
    WebsitesComponent,
    UserComponent,
    ToFixedPipe,
    HtmlPipe
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    ),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    RouterModule,
    HttpClientModule,
    MaterialModule,
    PerfectScrollbarModule,
    FormsModule,
    ReactiveFormsModule,
    NgxGaugeModule,
    HighlightModule.forRoot()
  ],
  providers: [
    CookieService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
