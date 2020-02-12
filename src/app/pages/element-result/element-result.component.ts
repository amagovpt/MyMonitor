import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

import { EvaluationService } from '../../services/evaluation.service';

@Component({
  selector: 'app-element-result',
  templateUrl: './element-result.component.html',
  styleUrls: ['./element-result.component.css']
})
export class ElementResultComponent implements OnInit, OnDestroy {

  @ViewChild('iframe', { static: false }) iframe: ElementRef;

  sub: Subscription;

  website: string;
  url: string;

  data: any;
  ele: string;

  constructor(
    private router: ActivatedRoute,
    public sanitizer: DomSanitizer,
    private evaluation: EvaluationService
  ) {
    this.data = {};
  }

  ngOnInit(): void {
    this.sub = this.router.params.subscribe(params => {
      this.website = params.website;
      this.url = params.page;
      this.ele = params.ele;

      this.data = this.evaluation.getTestResults(this.ele);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  tabChanged(event): void {
    if (event.index === 1) {
      const parser = new DOMParser();
      const evalDoc = parser.parseFromString(this.data.page, 'text/html');
      const imgNodes = evalDoc.evaluate('//img', evalDoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

      let i = 0;
      let n = imgNodes.snapshotItem(i);
      const protocol = _.startsWith(this.data.finalUrl, 'https://') ? 'https://' : 'http://';
      const www = _.includes(this.data.finalUrl, 'www.') ? 'www.' : '';

      let fixSrcUrl = _.clone(_.split(_.replace(_.replace(this.url, 'http://', ''), 'https://', ''), '/')[0]);
      if (fixSrcUrl[_.size(fixSrcUrl)-1] === '/') {
        fixSrcUrl = fixSrcUrl.substring(0, _.size(fixSrcUrl) - 2);
      }

      while(n) {
        if (n['attributes']['src'] && !_.startsWith(n['attributes']['src'].value, 'http') && !_.startsWith(n['attributes']['src'].value, 'https')) {
          n['attributes']['src'].value = `${protocol}${www}${fixSrcUrl}${n['attributes']['src'].value}`;
        }

        if (n['attributes']['srcset'] && !_.startsWith(n['attributes']['srcset'].value, 'http') && !_.startsWith(n['attributes']['srcset'].value, 'https')) {
          n['attributes']['srcset'].value = `${protocol}${www}${fixSrcUrl}${n['attributes']['srcset'].value}`;
        }

        i++;
        n = imgNodes.snapshotItem(i);
      }

      i = 0;
      const cssNodes = evalDoc.evaluate('//link', evalDoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

      n = cssNodes.snapshotItem(i);

      while(n) {
        if (n['attributes']['href'] && !_.startsWith(n['attributes']['href'].value, 'http') && !_.startsWith(n['attributes']['href'].value, 'https')) {
          if (_.startsWith(n['attributes']['href'].value, '/')) {
            n['attributes']['href'].value = `${protocol}${www}${fixSrcUrl}${n['attributes']['href'].value}`;
          } else {
            n['attributes']['href'].value = `${protocol}${www}${fixSrcUrl}/${n['attributes']['href'].value}`;
          }
        }
        /*const split = _.split(n['attributes']['href'].value, '.css&');
        if (_.size(split) > 1) {
          for (let s of split) {
            console.log(s);
          }
        }*/
        i++;
        n = cssNodes.snapshotItem(i);
      }

      const doc = this.iframe.nativeElement.contentDocument || this.iframe.nativeElement.contentWindow;
      doc.open();
      doc.write(evalDoc.getElementsByTagName('html')[0]['outerHTML']);
      doc.close();
    }
  }
}
