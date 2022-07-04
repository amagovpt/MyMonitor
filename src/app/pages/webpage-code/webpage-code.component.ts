import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { saveAs } from 'file-saver';
import { html } from 'js-beautify';

@Component({
  selector: 'app-webpage-code',
  templateUrl: './webpage-code.component.html',
  styleUrls: ['./webpage-code.component.scss']
})
export class WebpageCodeComponent implements OnInit, OnDestroy {

  sub: Subscription;

  website: string;
  url: string;
  encodedUrl: string;

  pagecode: string;
  downloadHTML: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.website = params.website;
      this.url = params.page;
      this.pagecode = html(JSON.parse(sessionStorage.getItem('evaluation')).pagecode, { indent_size: 2 });
      const blob = new Blob([this.pagecode], { type: 'text/html' });
      this.downloadHTML = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  downloadCode(): void {
    const blob = new Blob([this.pagecode], { type: 'text/html' });
    saveAs(blob, this.url + '.html');
  }
}
