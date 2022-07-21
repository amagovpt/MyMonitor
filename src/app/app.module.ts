import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { A11yModule } from '@angular/cdk/a11y';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';
import { NgxGaugeModule } from 'ngx-gauge';

import { UserAuthGuard } from './guards/user-auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';

import { ToFixedPipe } from './pipes/to-fixed.pipe';

import { AppComponent } from './app.component';
import { ErrorComponent } from './global/error/error.component';
import { LoadingComponent } from './global/loading/loading.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NotFound404Component } from './pages/not-found-404/not-found-404.component';
import { LoginComponent } from './pages/login/login.component';
import { WebsitesComponent } from './pages/websites/websites.component';
import { UserComponent } from './pages/user/user.component';
import { NavbarComponent } from './layout/header/navbar/navbar.component';
import { WebsiteComponent } from './pages/website/website.component';
import { ListOfPagesComponent } from './pages/website/list-of-pages/list-of-pages.component';
import { WebsiteAddPagesComponent } from './pages/website/website-add-pages/website-add-pages.component';
import { WebsiteStatisticsComponent } from './pages/website/website-statistics/website-statistics.component';
import { ErrorDistributionDialogComponent } from './dialogs/error-distribution-dialog/error-distribution-dialog.component';
import { ScoreDistributionDialogComponent } from './dialogs/score-distribution-dialog/score-distribution-dialog.component';
import { RemovePagesConfirmationDialogComponent } from './dialogs/remove-pages-confirmation-dialog/remove-pages-confirmation-dialog.component';
import { UserAuthErrorDialogComponent } from './dialogs/user-auth-error-dialog/user-auth-error-dialog.component';
import { AddPagesErrorsDialogComponent } from './dialogs/add-pages-errors-dialog/add-pages-errors-dialog.component';
import { BackgroundEvaluationsInformationDialogComponent } from './dialogs/background-evaluations-information-dialog/background-evaluations-information-dialog.component';
import { TopFiveErrorsComponent } from './pages/website/top-five-errors/top-five-errors.component';
import { TopFiveBestPracticesComponent } from './pages/website/top-five-best-practices/top-five-best-practices.component';
import { AccessibilityPlotComponent } from './pages/website/accessibility-plot/accessibility-plot.component';
import { CrawlerResultsDialogComponent } from './dialogs/crawler-results-dialog/crawler-results-dialog.component';
import { CorrectionDistributionDialogComponent } from './dialogs/correction-distribution-dialog/correction-distribution-dialog.component';
import { NewWebsiteAddPagesComponent } from './pages/website/new-website-add-pages/new-website-add-pages.component';
import { ManuallyAddPagesComponent } from './pages/website/new-website-add-pages/manually-add-pages/manually-add-pages.component';
import { SitemapAddComponent } from './pages/website/new-website-add-pages/sitemap-add/sitemap-add.component';
import { CrawlWebsiteComponent } from './pages/website/new-website-add-pages/crawl-website/crawl-website.component';
import { AddObservatoryComponent } from './pages/website/new-website-add-pages/add-observatory/add-observatory.component';
import { AddPageDialogComponent } from './dialogs/add-page-dialog/add-page-dialog.component';
import { EvaluationModule } from './evaluation/evaluation.module';
import { PipesModule } from './pipes/pipes.module';


const appRoutes: Routes = [
  { path: '', component: LoginComponent, canActivate: [NoAuthGuard] },
  { path: 'user', component: UserComponent, canActivate: [UserAuthGuard], children: [
    { path: '', component: WebsitesComponent, canActivate: [UserAuthGuard] },
    { path: ':website', component: WebsiteComponent, canActivate: [UserAuthGuard]},
    //{ path: ':website/page', loadChildren: () => import('./evaluation/evaluation.module').then(m => m.EvaluationModule) }
    ] },
/*  { path: ':website/:page', component: EvaluationResultsComponent, canActivate: [UserAuthGuard] },
    { path: ':website/:page/code', component: WebpageCodeComponent, canActivate: [UserAuthGuard] },
    { path: ':website/:page/:ele', component: ElementResultComponent, canActivate: [UserAuthGuard] }*/
  { path: '**', component: NotFound404Component }
];

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
    NavbarComponent,
    WebsiteComponent,
    ListOfPagesComponent,
    WebsiteAddPagesComponent,
    WebsiteStatisticsComponent,
    ErrorDistributionDialogComponent,
    ScoreDistributionDialogComponent,
    RemovePagesConfirmationDialogComponent,
    UserAuthErrorDialogComponent,
    AddPagesErrorsDialogComponent,
    BackgroundEvaluationsInformationDialogComponent,
    TopFiveErrorsComponent,
    TopFiveBestPracticesComponent,
    AccessibilityPlotComponent,
    CrawlerResultsDialogComponent,
    CorrectionDistributionDialogComponent,
    NewWebsiteAddPagesComponent,
    ManuallyAddPagesComponent,
    SitemapAddComponent,
    CrawlWebsiteComponent,
    AddObservatoryComponent,
    AddPageDialogComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false, relativeLinkResolution: 'legacy' }
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
    A11yModule,
    FlexLayoutModule,
    RouterModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxGaugeModule,
    PipesModule,
    EvaluationModule
  ],
  entryComponents: [
    ScoreDistributionDialogComponent,
    ErrorDistributionDialogComponent,
    RemovePagesConfirmationDialogComponent,
    UserAuthErrorDialogComponent,
    AddPagesErrorsDialogComponent,
    BackgroundEvaluationsInformationDialogComponent,
    CrawlerResultsDialogComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
