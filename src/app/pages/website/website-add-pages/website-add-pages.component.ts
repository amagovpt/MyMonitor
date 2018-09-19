import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormControlName, FormBuilder, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import * as _ from 'lodash';

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
    let domain = AC.get('domain').value;
    domain = _.replace(domain, 'http://', '');
    domain = _.replace(domain, 'https://', '');
    domain = _.replace(domain, 'www.', '');

    const urls = _.uniq(_.without(_.split(AC.get('pages').value, '\n'), ''));

    let invalid = false;
    const size = _.size(urls);

    if (!size) {
      return null;
    }

    for (let i = 0 ; i < size ; i++) {
      let url = _.trim(urls[i]);
      url = _.replace(url, 'http://', '');
      url = _.replace(url, 'https://', '');
      url = _.replace(url, 'www.', '');

      if (!_.startsWith(url, domain)) {
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
      pages: new FormControl('', [Validators.required, urlValidator])
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

    const pages = _.map(_.uniq(_.without(_.split(this.pagesForm.value.pages, '\n'), '')), p => {
      p = _.replace(p, 'http://', '');
      p = _.replace(p, 'https://', '');
      p = _.replace(p, 'www.', '');

      if (p[_.size(p)-1] === '/') {
        p = p.substring(0, _.size(p)-1);
      }

      return _.trim(p);
    });

    this.addWebsitePages.next({ domain: this.domain, urls: pages});
  }
}

function urlValidator(control: FormControl) {
  const urls = _.uniq(_.without(_.split(control.value, '\n'), ''));

  let invalid = true;
  const size = _.size(urls);

  if (!size) {
    return null;
  }

  for (let i = 0 ; i < size ; i++) {
    let url = _.trim(urls[i]);

    if (!_.startsWith(url, 'http://') && !_.startsWith(url, 'https://') && !_.startsWith(url, 'www.')) {
      if (_.includes(url, '.') && url[_.size(url) - 1] !== '.') {
        invalid = false;
      } else {
        invalid = true;
      }
    } else if (_.startsWith(url, 'http://')) {
      url = _.replace(url, 'http://', '');
      if (_.includes(url, '.') && url[_.size(url) - 1] !== '.') {
        invalid = false;
      } else {
        invalid = true;
      }
    } else if (_.startsWith(url, 'https://')) {
      url = _.replace(url, 'https://', '');
      if (_.includes(url, '.') && url[_.size(url) - 1] !== '.') {
        invalid = false;
      } else {
        invalid = true;
      }
    } else if (_.startsWith(url, 'www.')) {
      url = _.replace(url, 'www.', '');
      if (_.includes(url, '.') && url[_.size(url) - 1] !== '.') {
        invalid = false;
      } else {
        invalid = true;
      }
    } else {
      invalid = true;
    }
  }

  return invalid ? { 'url': { value: true } } : null;
}
