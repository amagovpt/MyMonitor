import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormBuilder, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { MonitorService } from '../../../services/monitor.service';

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

  constructor(
    private monitor: MonitorService,
    private fb: FormBuilder
  ) {
    this.pagesForm = this.fb.group({
      domain: new FormControl({value: '', disabled: true}),
      pages: new FormControl('', [Validators.required, urlValidator, missingProtocol])
    }, { validator: DomainUrlValidation.UrlMatchDomain });
    this.matcher = new MyErrorStateMatcher();
  }

  ngOnInit(): void {
    this.monitor.getWebsiteDomain(this.website)
      .subscribe(domain => {
        if (domain) {
          this.domain = domain;
          this.pagesForm.controls.domain.setValue(domain);
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
