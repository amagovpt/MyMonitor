import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormBuilder, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import clone from 'lodash.clone';

import { MonitorService } from '../../../services/monitor.service';

import { CrawlerResultsDialogComponent } from '../../../dialogs/crawler-results-dialog/crawler-results-dialog.component';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

class DomainUrlValidation {

  static UrlMatchDomain(AC: AbstractControl) {
    const domain = AC.get('domain').value;

    const urls = AC.get('pages').value.split('\n').filter(a => a !== '');

    let invalid = false;
    const size = urls.length;

    if (!size) {
      return null;
    }

    for (let i = 0 ; i < size ; i++) {
      const url = urls[i].trim();

      if (!url.startsWith(domain)) {
        invalid = true;
      }
    }

    if (invalid) {
      AC.get('pages').setErrors({ 'domainNoMatch': true });
    } else {
      return null;
    }
  }
}

@Component({
  selector: 'app-website-add-pages',
  templateUrl: './website-add-pages.component.html',
  styleUrls: ['./website-add-pages.component.css']
})
export class WebsiteAddPagesComponent implements OnInit {

  @Input('website') website: string;
  @Output('addPages') addWebsitePages = new EventEmitter<any>();

  matcher: ErrorStateMatcher;

  pagesForm: FormGroup;
  domain: string;

  urisFromFile: string[];
  urisFromFileString: string;
  fileErrorMessage: string;

  crawlStatus: string;
  crawlButtonDisable: boolean;
  crawlResultsDisabled: boolean;

  constructor(
    private monitor: MonitorService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef
  ) {
    this.pagesForm = this.fb.group({
      domain: new FormControl({value: '', disabled: true}),
      pages: new FormControl('', [Validators.required, urlValidator, missingProtocol])
    }, { validator: DomainUrlValidation.UrlMatchDomain });
    this.matcher = new MyErrorStateMatcher();
    this.crawlStatus = 'not_running';
    this.crawlButtonDisable = false;
    this.crawlResultsDisabled = true;
    this.fileErrorMessage = '';
    this.urisFromFile = [];
  }

  ngOnInit(): void {
    this.monitor.getWebsiteDomain(this.website)
      .subscribe(domain => {
        if (domain) {
          this.domain = domain;
          this.pagesForm.controls.domain.setValue(domain);

          this.monitor.checkCrawler(this.domain)
            .subscribe(result => {
              if (result !== null) {
                if (result) {
                  this.crawlStatus = 'complete';
                  this.crawlButtonDisable = true;
                  this.crawlResultsDisabled = false;
                } else {
                  this.crawlStatus = 'progress';
                  this.crawlButtonDisable = true;
                  this.crawlResultsDisabled = true;
                }
              }
            });
        }
      });
  }

  addPages(e): void {
    e.preventDefault();

    const pages = this.pagesForm.value.pages.split('\n').filter(a => a !== '').filter((value, index, self) => self.indexOf(value) === index).map(p => {
      return p.trim();
    });

    this.addWebsitePages.next({ domain: this.domain, urls: pages});
  }

  handleFileInput(files: FileList) {
    const fileToRead = files.item(0);
    this.urisFromFile = [];
    if (fileToRead === null) {
      this.fileErrorMessage = '';
      this.urisFromFile = [];
      return;
    }

    switch (fileToRead.type) {
      case ('text/plain'):
        this.parseTXT(fileToRead);
        break;
      case ('text/xml'):
        this.parseXML(fileToRead);
        break;
      default:
        this.urisFromFile = [];
        this.fileErrorMessage = 'invalidType';
        break;
    }
  }

  parseTXT(file: File): string[] {
    const result = [];
    // open file and check for the urls
    const reader = new FileReader();
    reader.readAsText(file);
    // divide the url in the result array
    reader.onload = () => {
      const urlFile = reader.result.toString();
      const lines = urlFile.split('\n').map(l => l.trim()).filter(u => u !== '');

      this.urisFromFile = clone(lines);
      this.validateFileUris(this.domain, this.urisFromFile);
      this.cd.detectChanges();
    };
    return result;
  }

  parseXML(file: File): string[] {
    const reader = new FileReader();
    const result = [];
    reader.readAsText(file);
    reader.onload = () => {
      const parser = new DOMParser();
      const json = {}; // this.xml2Json.xmlToJson(xml);
      const urlJson = json['urlset']['url'];

      this.urisFromFile = clone(urlJson.map(u => u.loc));
      this.validateFileUris(this.domain, this.urisFromFile);
    };
    return result;
  }

  validateFileUris(domain: string, uris: string[]): void {
    if (domain === '') {
      this.fileErrorMessage = 'invalidDomain';
      return;
    }
    if (uris !== undefined || uris !== []) {
      for (let url of uris) {
        if (!url.startsWith(domain)) {
          this.fileErrorMessage = 'invalidDomain';
          return;
        } else {
          this.fileErrorMessage = '';
        }
      }
    }
  }

  addFilePages(): void {
    this.addWebsitePages.next({ domain: this.domain, urls: this.urisFromFile});
  }

  crawlWebsite(): void {
    this.monitor.crawlWebsite(this.domain)
      .subscribe(result => {
        if (result) {
          this.crawlStatus = 'progress';
          this.crawlButtonDisable = true;
        } else {
          alert('Error');
        }

        this.cd.detectChanges();
      });
  }

  openCrawlingResultsDialog(): void {
    const dialog = this.dialog.open(CrawlerResultsDialogComponent, {
      width: '60vw',
      data: {
        domain: this.domain
      }
    });

    dialog.afterClosed().subscribe(data => {
      if (data) {
        this.addWebsitePages.next({ domain: this.domain, urls: data});
      }
    });
  }

  deleteCrawlingResults(): void {
    this.monitor.deleteCrawlingResults(this.domain)
      .subscribe(result => {
        if (result) {
          this.crawlStatus = 'not_running';
          this.crawlButtonDisable = false;
          this.crawlResultsDisabled = true;
        } else {
          alert('Error');
        }

        this.cd.detectChanges();
      });
  }
}

function missingProtocol(control: FormControl) {
  const urls = control.value.split('\n').filter(a => a !== '');

  let invalid = false;
  const size = urls.length;

  if (!size) {
    return null;
  }

  for (let i = 0 ; i < size ; i++) {
    const url = urls[i].trim();
  
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      invalid = true;
      break;
    }
  }

  return invalid ? { 'missingProtocol': { value: true } } : null;
}

function urlValidator(control: FormControl) {
  const urls = control.value.split('\n').filter(a => a !== '');
  
  let invalid = false;
  const size = urls.length;

  if (!size) {
    return null;
  }

  for (let i = 0 ; i < size ; i++) {
    const url = urls[i].trim();

    if (!url.includes(url, '.') || url[url.length - 1] === '.') {
      invalid = true;
      break;
    }
  }

  return invalid ? { 'url': { value: true } } : null;
}
