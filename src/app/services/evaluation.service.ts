import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { Observable, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, retry, catchError } from 'rxjs/operators';

import * as _ from 'lodash';

import { Response } from '../models/response';
import { Evaluation } from '../models/evaluation';
import { MmError } from '../models/error';

import { ConfigService } from './config.service';
import { UserService } from './user.service';
import { MessageService } from './message.service';

import tests from './tests';
import techs from './techs';
import scs from './scs';
import xpath from './xpath';
import tests_colors from './tests_colors';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  url: string;
  evaluation: Evaluation;

  constructor(
    private router: Router,
    private http: HttpClient,
    private message: MessageService,
    private user: UserService,
    private config: ConfigService,
    private translate: TranslateService
  ) { }

  getEvaluation(website: string, url: string): Observable<Evaluation> {
    if (this.url && _.isEqual(this.url, url) && this.evaluation) {
      return of(this.evaluation.processed);
    } else {
      const _url = sessionStorage.getItem('url');
      if (_url && _.isEqual(_url, url)) {
        this.url = _url;
        this.evaluation = <Evaluation> JSON.parse(sessionStorage.getItem('evaluation'));
        return of(this.evaluation.processed);
      } else {
        return ajax.post(this.config.getServer('/monitor/evaluation'), {website, url: encodeURIComponent(url) , cookie: this.user.getUserData()}).pipe(
          retry(3),
          map(res => {
            const response = <Response> res.response;

            if (!res.response || res.status === 404) {
              throw new MmError(404, 'Service not found', 'SERIOUS');
            }

            if (response.success !== 1) {
              throw new MmError(response.success, response.message);
            }

            this.url = url;
            this.evaluation = <Evaluation> response.result;
            this.evaluation.processed = this.processData();

            sessionStorage.setItem('url', url);
            sessionStorage.setItem('evaluation', JSON.stringify(this.evaluation));

            return this.evaluation.processed;
          }),
          catchError(err => {
            console.log(err);
            return of(null);
          }));
      }
    }
  }

  evaluateUrl(url: string): Observable<any> {
    return ajax.post(this.config.getServer('/monitor/evaluate/'), {url: encodeURIComponent(url), cookie: this.user.getUserData()}).pipe(
      retry(3),
      map(res => {
        const response = <Response> res.response;

        if (!res.response || res.status === 404) {
          throw new MmError(404, 'Service not found', 'SERIOUS');
        }

        if (response.success !== 1) {
          throw new MmError(response.success, response.message);
        }

        this.url = url;
        this.evaluation = <Evaluation> response.result;
        this.evaluation.processed = this.processData();

        sessionStorage.setItem('url', url);
        sessionStorage.setItem('evaluation', JSON.stringify(this.evaluation));

        return this.evaluation.processed;
      }),
      catchError(err => {
        console.log(err);
        return of(null);
      })
    );
  }

  getTestResults(test: string): any {
    if (!this.url || !this.evaluation) {
      this.url = sessionStorage.getItem('url');
      this.evaluation = JSON.parse(sessionStorage.getItem('evaluation'));
    }

    const data = this.evaluation.data;
    const tot = data.tot;
    const allNodes = data.nodes;
    const webpage = this.evaluation.pagecode;
    const url = this.url;
    const ele = test;

    const testSee = {
      'css': ['colorContrast', 'colorFgBgNo', 'cssBlink', 'fontAbsVal', 'fontValues',
              'justifiedCss', 'layoutFixed', 'lineHeightNo', 'valueAbsCss', 'valueRelCss'
      ],
      'div': ['aGroupNo', 'applet', 'appletAltNo', 'blink', 'brSec', 'ehandBoth', 'ehandBothNo',
              'ehandMouse', 'ehandTagNo', 'ehandler', 'charSpacing', 'embed', 'embedAltNo',
              'fieldLegNo', 'fieldNoForm', 'form', 'formSubmitNo', 'hx', 'hxSkip', 'id', 'idRep',
              'iframe', 'iframeTitleNo', 'justifiedTxt', 'liNoList', 'marquee', 'object', 'objectAltNo',
              'table', 'tableCaptionSummary', 'tableComplex', 'tableComplexError', 'tableData',
              'tableDataCaption', 'tableLayout', 'tableLayoutCaption', 'tableNested', 'valueAbsHtml',
              'valueRelHtml'
      ],
      'span': ['a', 'abbrNo', 'aJs', 'aSameText', 'aAdjacent', 'aAdjacentSame', 'aImgAltNo',
               'aSkip', 'aSkipFirst', 'aTitleMatch', 'deprecElem', 'fontHtml', 'img', 'imgAltLong',
               'imgAltNo', 'imgAltNot', 'imgAltNull', 'inpImg', 'inpImgAltNo', 'inputAltNo',
               'inputIdTitleNo', 'inputLabel', 'inputLabelNo', 'label', 'labelForNo', 'labelPosNo',
               'labelTextNo', 'layoutElem', 'longDImg', 'longDNo'
      ]
    };

    let results = {};
    if (_.includes(testSee['css'], ele)) {
      results = this.getCSS(webpage, ele);
    } else {
      results = this.getElements(url, webpage, allNodes, ele, _.includes(testSee['div'], ele) || _.includes(testSee['span'], ele));
    }

    return results;
  }

  downloadCSV(): void {
    const data = [];

    let error, level, sc, desc, num;
    const descs = ['CSV.errorType', 'CSV.level', 'CSV.criteria', 'CSV.desc', 'CSV.count'];
    const numTable = [];

    const _eval = this.evaluation.processed;

    for (const row in _eval['results']) {
      const rowData = [];
      error = 'CSV.' + (_eval['results'][row]['prio'] === 3 ? 'scoreok' : _eval['results'][row]['prio'] === 2 ? 'scorewar': 'scorerror');
      level = _eval['results'][row]['lvl'];
      //sc = _eval['scoreBoard'][row]['sc'];
      num = _eval['results'][row]['value'];
      desc = 'TESTS_RESULTS.' + _eval['results'][row]['msg'] + ((num === 1) ? '.s' : '.p');

      descs.push(desc, error);
      rowData.push(error, level, /*sc,*/ desc, num);
      data.push(rowData);
    }

    this.translate.get(descs).subscribe(res => {
      const labels = new Array<string>();

      for (const row in data) {
        data[row][2] = res[data[row][2]].replace('{{value}}', data[row][3]);
        data[row][2] = data[row][2].replace(new RegExp('<mark>', 'g'), '');
        data[row][2] = data[row][2].replace(new RegExp('</mark>', 'g'), '');
        data[row][2] = data[row][2].replace(new RegExp('<code>', 'g'), '');
        data[row][2] = data[row][2].replace(new RegExp('</code>', 'g'), '');
        data[row][0] = res[data[row][0]];
      }
      labels.push(res['CSV.errorType']);
      labels.push(res['CSV.level']);
      //labels.push(res['CSV.criteria']);
      labels.push(res['CSV.desc']);
      labels.push(res['CSV.count']);

      new Angular5Csv(data, this.url + '-' + _eval.metadata.last_update, {headers: labels});
    });
  }

<<<<<<< HEAD
  private getServer(service: string): string {
    const host = location.host;

    return 'http://' + _.split(host, ':')[0] + ':3443' + service;
  }

=======
>>>>>>> 662980eadc72e5fd84193ba89bb40f07388645a6
  //EMBEBED
  private highLightCss(styles: any, ele: string): any {
    const begin = '<em style=\'background-color: yellow;border: 0.3em solid Yellow;font-weight: bold;\'>';
    const end =  '}</em>\n';
    let lines = '';
    for (const s in styles) {
      if (!isNaN(parseInt(s))) {
        const node = styles[s].firstChild.nodeValue;
        const nodes = node.split('}');

        if ( ele === 'valueRelCss') {
          for ( const line in nodes) {
            if (nodes[line].match(/width:[0-9]+(%|em|ex)/)) {
              lines += begin + nodes[line] + end;
            } else {
              lines += nodes[line] + '}\n';
            }
          }
        } else if (ele === 'valueAbsCss') {
          for (const line in nodes ) {
            if (nodes[line].match(/width:[0-9]+(cm|mm|in|pt|pc)/)) {
              lines += begin + nodes[line] + end;
            } else {
              lines += nodes[line] + '}\n';
            }
          }
        } else if (ele === 'layoutFixed') {
         for ( const line in nodes) {
            const w = nodes[line].split(';');
            let t = false;
            for ( const i in w) {
              if ( w[i].match(/width:/) || w[i].match(/min-width/)) {
                const px = w[i].split(':')[1].replace('px', '');
                if ( new Number(px) > 120) {
                    t = true;
                   lines += begin + nodes[line] + end;
                }
              }
            }
            if (!t) {
              lines += nodes[line] +  '}\n';
            }
          }
        } else if ( ele === 'justifiedCss') {
          for ( const line in nodes) {
            if (nodes[line].match(/text-align:justify/)) {
              lines += begin + nodes[line] + end;
            } else {
              lines += nodes[line] + '}\n';
            }
          }
        } else if (ele === 'cssBlink') {
          for (const line in nodes) {
            if (nodes[line].match(/text-decoration:blink/)) {
              lines += begin + nodes[line] + end;
            } else {
              lines += nodes[line] + '}\n';
            }
          }
        } else if (ele === 'fontValues') {
          for (const line in nodes) {
            if (nodes[line].match(/font:/) || nodes[line].match(/font-size:/)) {
              lines += begin + nodes[line] + end;
            } else {
              lines += nodes[line] + '}\n';
            }
          }

        } else if (ele === 'fontAbsVal') {
          for (const line in nodes) {
            if (nodes[line].match(/font:[0-9]+(cm|mm|in|pt|pc|px)/) || nodes[line].match(/font-size:[0-9]+(cm|mm|in|pt|pc|px)/)) {
              lines += begin + nodes[line] + end;
            } else {
              lines += nodes[line] + '}\n';
            }
          }

        } else if (ele === 'lineHeightNo') {
          for (const line in nodes) {
            if (nodes[line].match(/line-height:([0-9]+)(%|em|ex)+/)) {
              lines += begin + nodes[line] + end;
            } else {
              lines += nodes[line] + '}\n';
            }
          }
        } else if (ele === 'colorFgBgNo') {
          for (const line in nodes) {
            let color = false;
            let bg = false;
            let ok = false;
            if (nodes[line].match(/[;{\s]color/)) {
              color = true;
              ok = true;
            }

            if (nodes[line].match(/[;{\s]background:/)  || nodes[line].match(/[;{\s]background-color:/)) {
              bg = true;
              ok = true;
            }
            if ( ok && bg && color) {
              lines += nodes[line] + '}\n';

            } else if ( !ok ) {
              lines += nodes[line] + '}\n';
            } else {
              lines += begin + nodes[line] + end;
            }
          }
        } else if (ele === 'colorContrast') {
          for (const line in nodes) {
            let color = false;
            let bg = false;
            let ok = false;
            if (_.trim(nodes[line]).match(/[;{\s]color:/)) {
              const colorElem = _.trim(nodes[line]).split(/[;{\s]color:/)[1].split(/[;}]/)[0];

              const color_array = this.evaluation.data.tot['elems']['color_array'];
              for ( const c in color_array ) {
                if ( _.trim(color_array[c]['c'].split(':')[1]) === colorElem ) {
                  color = true;
                  ok = true;

                  break;
                }
              }
            }
            if (nodes[line].trim().match(/[;{\s]background-color:/) || nodes[line].match(/[;{\s]background:/)) {
              let b = nodes[line].trim().split(/[;{\s]background-color:/);
              if ( !b[1] ) {
                b = nodes[line].trim().split(/[;{\s]background:/);
              }
              const colorElem = b[1].trim().split(/[;}]/)[0];
              const color_array = this.evaluation.data.tot['elems']['color_array'];
              for ( const c in color_array ) {
                if ( _.trim(color_array[c]['b'].split(':')[1]) === colorElem ) {
                  bg = true;
                  ok = true;

                  break;
                }
              }
            }
            if ( ok && bg && color) {
              lines += begin + nodes[line] + end;

            } else if ( ok ) {
              lines += nodes[line] + '}\n';
            } else {
              lines += nodes[line] + '}\n';
            }

          }
        }

      }
    }
    return lines;

  }

  //INLINE
  private highLightCss2(styles: any, ele: string): any {
    const begin = '<em style=\'background-color: yellow;border: 0.3em solid Yellow;font-weight: bold;\'>';
    const end =  '}</em>\n';
    let inline = '';
    for ( const s in styles) {
      if ( ele === 'fontValues' && (styles[s].match(/font:/) || styles[s].match(/font-size:/))) {
       inline += begin + styles[s] + end;

      } else if ( ele === 'fontAbsVal' && (styles[s].match(/font:[0-9]+(cm|mm|in|pt|pc|px)/) || styles[s].match(/font-size:[0-9]+(cm|mm|in|pt|pc|px)/))  ) {
        inline += begin + styles[s] + end;
      } else if ( ele === 'cssBlink' && styles[s].match(/text-decoration:blink/) ) {
        inline += begin + styles[s] + end;
      } else if ( ele === 'justifiedCss' && styles[s].match(/text-align:justify/) ) {
        inline += begin + styles[s] + end;
      } else if ( ele === 'valueRelCss' && styles[s].match(/width:[0-9]+(%|em|ex)/) ) {
        inline += begin + styles[s] + end;
      } else if ( ele === 'valueAbsCss' && styles[s].match(/width:[0-9]+(cm|mm|in|pt|pc)/) ) {
        inline += begin + styles[s] + end;

      } else if (ele === 'layoutFixed') {
        if (styles[s].match(/[;{\s]width:[0-9]+(px)/)) {
          const matchs = styles[s].match(/[;{\s]width:[0-9]+(px)/);
          const px = matchs[0].split(':')[1].replace('px', '').replace(' ', '');
          if (new Number(px) > 120) {
             inline += begin + styles[s] + end;
          } else {
            inline += styles[s] + '\n';
          }
        } else if (styles[s].match(/min-width:[0-9]+(px)/)) {
          const matchs = styles[s].match(/min-width:[0-9]+(px)/);
          const px = matchs[0].split(':')[1].replace('px', '').replace(' ', '');
          if (new Number(px) > 120) {
             inline += begin + styles[s] + end;
          } else {
            inline += styles[s] + '\n';
          }
        } else {
          inline += styles[s] + '\n';
        }
      } else if (ele === 'lineHeightNo' && (styles[s].match(/line-height:([0-9]+)(%|em|ex)+/))) {
        inline += begin + styles[s] + end;
      } else if (ele === 'colorFgBgNo' ) {
        let color = false;
        let bg = false;
        let ok = false;
        if (styles[s].match(/[;{\s]color/)) {
          color = true;
          ok = true;
        }
        if (styles[s].match(/[;{\s]background:/)  || styles[s].match(/[;{\s]background-color:/)) {
          bg = true;
          ok = true;
        }
        if ( ok && bg && color) {
          inline += styles[s] + '\n';
        } else if ( !ok ) {
          inline += styles[s] + '\n';
        } else {
          inline += begin + styles[s] + end;
        }
      } else if ( ele = 'colorContrast') {
        const color = false;
        const bg = false;
        let ok = false;
        if (styles[s].match(/[;{\s]color/)) {

          let color = styles[s].split(/[;{\s]color:/)[1].split(/[;}]/)[0];
          const color_array = this.evaluation.data.tot['elems']['color_array'];
          for ( const c in color_array) {
            if ( _.trim(color_array[c]['c'].split(':')[1]) === color ) {
              color = true;
              ok = true;
              break;
            }
          }

        }
        if (styles[s].match(/[;{\s]background:/)  || styles[s].match(/[;{\s]background-color:/)) {
          let color = styles[s].split(/[;{\s]background:/);
          if ( !color[1] ) {
            color = styles[s].split(/[;{\s]background-color:/);
          }
          color = color[1].split(/[;}]/)[0];
          const color_array = this.evaluation.data.tot['elems']['color_array'];
          for ( const c in color_array) {
            if ( _.trim(color_array[c]['b'].split(':')[1]) === color ) {
              color = true;
              ok = true;
              break;
            }
          }
        }
      } else {
        inline += styles[s] + '\n';
      }
    }
    return inline;
  }

  private getCSS(pagecode: string, ele: string): any {
    if (!this.url || !this.evaluation) {
      this.url = sessionStorage.getItem('url');
      this.evaluation = JSON.parse(sessionStorage.getItem('evaluation'));
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(pagecode, 'text/html');
    //INLINE
    const n = doc.evaluate('//*[@style][normalize-space(@style)!=\'\']', doc, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);

    let val = n.iterateNext();
    let inline = '';
    const classes = [];
    while (val) {
      inline = ' ' + _.toLower(val['tagName']) + '{';
      let i = 0;
      while ( i < _.size(val['style'])) {
        inline += val['style'][i] + ':' + val['style'][val['style'][i]] + ';';
        i += 1;
      }
      classes.push(inline);
      val = n.iterateNext();

    }

    const styles = doc.getElementsByTagName('style');
    return { 'embedded_css': this.highLightCss(styles, ele), 'inline_css': this.highLightCss2(classes, ele)};
  }

  private getElements(url: string, webpage: string, allNodes: Array<string>, ele: string, inpage: boolean): any {
    let path;

    if (allNodes[ele]) {
      path = allNodes[ele];
    } else {
      path = xpath[ele];
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(webpage, 'text/html');

    const nodes = doc.evaluate(path, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

    const elements = new Array();

    let i = 0;
    let n = nodes.snapshotItem(i);

    while (n) {
      let attrs = '';

      for (let i = 0 ; i < _.size(n['attributes']) ; i++) {
        const attr = <Attr> n['attributes'][i];
        if (attr.value) {
          attrs += attr.name + '="' + attr.value + '" ';
        } else {
          attrs += attr.name + ' ';
        }
      }

      let eleOuterHtml = _.clone(n['outerHTML']);

      if (_.toLower(n.nodeName) === 'img') {
        let fixSrcUrl = _.clone(url);
        if (fixSrcUrl[_.size(fixSrcUrl)-1] === '/') {
          fixSrcUrl = fixSrcUrl.substring(0, _.size(fixSrcUrl) - 2);
        }

        if (n['attributes']['src'] && !_.startsWith(n['attributes']['src'].value, 'http')) {
          n['attributes']['src'].value = `http://${fixSrcUrl}${n['attributes']['src'].value}`;

          n['width'] = '250';
          n['height'] = '250';
        }

        if (n['attributes']['srcset'] && !_.startsWith(n['attributes']['srcset'].value, 'http')) {
          n['attributes']['srcset'].value = `http://${fixSrcUrl}${n['attributes']['srcset'].value}`;

          n['width'] = '250';
          n['height'] = '250';
        }
      }

      elements.push({
        ele: _.toLower(n.nodeName),
        attr: attrs,
        code: n['outerHTML'],
        showCode: eleOuterHtml
      });

      if (inpage) {
        n['style'] = 'background:#ff0 !important;border:2px dotted #900 !important;padding:2px !important;visibility:visible !important;display:inherit !important;';
      }

      i++;
      n = nodes.snapshotItem(i)
    }

    return {
      elements,
      size: _.size(elements),
      page: inpage ? doc.getElementsByTagName('html')[0]['outerHTML'] : undefined
    };
  }

  private processData() {
    const tot = this.evaluation.data.tot;
    //const pagecode = this.evaluation.pagecode;
    //const nodes = this.evaluation.data.nodes;
    //const url = this.url;

    const data = {};
    data['metadata'] = {};
    data['metadata']['url'] = tot['info']['url'];
    data['metadata']['title'] = tot['info']['title'];
    data['metadata']['n_elements'] = tot['info']['htmlTags'];
    data['metadata']['score'] = tot['info']['score'];
    data['metadata']['size'] = this.convertBytes(tot['info']['size']);
    data['metadata']['last_update'] = tot['info']['date'];
    data['metadata']['count_results'] = _.size(tot['results']);

    data['tabs'] = {};
    data['results'] = []; // {'A': [], 'B': [], 'C': [], 'D': [], 'E': [], 'F': []};
    data['scoreBoard'] = [];
    data['elems'] = [];

    //const tabsSize = {'A': 0, 'B': 0, 'C': 0, 'D': 0, 'E': 0, 'F': 0};

    //const hidden = ['all', 'w3cValidator'];

    let infotot = {
        'ok': 0,
        'err': 0,
        'war': 0,
        'tot': 0
      };

      let infoak = {
        'A': {
          'ok': 0,
          'err': 0,
          'war': 0,
        },
        'AA': {
          'ok': 0,
          'err': 0,
          'war': 0,
        },
        'AAA': {
          'ok': 0,
          'err': 0,
          'war': 0,
        }
      };

    for (const ee in tot.results) {
      //const r = tot.results[ee];

      //const split = _.split(r, '@');
      //const sco = parseInt(split[0]);
      /*const pond = split[1];
      const res = split[2];
      const cant = split[3];*/

      //const ele = tests[ee]['elem'];
      const tes = tests[ee]['test'];
      const refs = tests[ee]['ref'];
      const lev = tests[ee]['level'];
      //const techfail = refs[0] === 'F' ? 'relationF' : 'relationT';

      let color;

      if (tests_colors[ee] === 'R') {
        color = 'err';
      } else if (tests_colors[ee] === 'Y') {
        color = 'war';
      } else if (tests_colors[ee] == 'G') {
        color = 'ok';
      }

      let level = _.toUpper(lev);

      infoak[level][color]++;

      let tnum;

      if (tot.elems[tes]) {
        if (tes === 'titleOk') {
          tnum = tot.info.title;
        } else if (tes === 'lang') {
          tnum = tot.info.lang;
        } else {
          tnum = tot['elems'][tes];
        }
      }

      //const scrcrd = this.resIcon(sco);

      //tabsSize[scrcrd]++;

      //const row = scrcrd + '' + scrcrd;

      //const msg = ee;

      const result = {};
      result['ico'] = 'assets/images/ico' + color + '.png';
      result['color'] = color;
      result['lvl'] = level;
      result['msg'] = ee;
      result['value'] = tnum;
      result['prio'] = color === 'ok' ? 3 : color === 'err'? 1 : 2;
      //result['tech_list'] = new Array();

      /*if (!_.includes(hidden, ele)) {
        result['tech_list'] = this.testView(ele, ele, tot['elems'][ele]);
        if (!isNaN(tot['elems'][ele])) {
          result['value'] += parseInt(tot['elems'][ele]);
        }
      }*/

      result['tech_list'] = this.testView(tes, tes, tnum);

      data['results'].push(result);
      /*result['title'] = ee;
      result['score'] = sco;
      result['tech'] = refs;
      result['tech_desc'] = techs[refs];
      result['tech_website'] = 'http://www.acessibilidade.gov.pt/w3/TR/WCAG20-TECHS/' + refs + '.html';
      result['tech_fail'] = techfail;
      result['tech_related_sc'] = new Array();
      result['tech_list'] = new Array();
      result['tnum'] = 0;

      const li = {};
      let sctable = '';
      const scstmp = tests[ee]['scs'].split(',');

      for (let s in scstmp) {
        s = _.trim(scstmp[s]);
        if (s !== '') {
          li['sc'] = s;
          li['lvl'] = scs[s]['1'];
          li['link'] = 'http://www.acessibilidade.gov.pt/w3/TR/UNDERSTANDING-WCAG20/' + scs[s]['0'] + '.html';
          sctable += sctable === '' ? s : ', ' + s;

          result['tech_related_sc'].push(li);
        }
      }

      if (!_.includes(hidden, ele)) {
        result['tech_list'].push(this.testView(ele, ele, tot['elems'][ele]));
        if (!isNaN(tot['elems'][ele])) {
          result['tnum'] += parseInt(tot['elems'][ele]);
        }
      }

      result['tech_list'].push(this.testView(tes, tes, tnum));

      if (!isNaN(tnum)) {
        result['tnum'] += parseInt(tnum);
      } else if (tnum) {
        result['tnum'] = tnum;
      }

      data['results'][scrcrd].push(_.clone(result));
      data['elems'].push(ele);
      data['elems'].push(tes);

      let key;
      let _class;
      let prio;

      if (lev.indexOf('A') !== -1) {
        key = lev;
        if (sco === 10) {
          _class = 'scoreok';
          prio = 3;
        } else {
          if (sco < 6) {
            _class = 'scorerror';
            prio = 1;
          } else {
            _class = 'scorewar';
            prio = 2;
          }
        }
      } else {
        key = _.toUpper(lev);
        if (sco === 10) {
          _class = 'scoreok';
          prio = 3;
        } else {
          _class = 'scorewar';
          prio = 2;
        }
      }

      data['scoreBoard'].push({
        'class': _class,
        'level': _.toUpper(lev),
        'sc': sctable,
        'desc': msg,
        'tnum': result['tnum'],
        'prio': prio
      });*/
    }

    data['results'] = _.orderBy(data['results'], ['lvl', 'prio'], ['asc', 'asc']);

    //data['scoreBoard'] = _.orderBy(data['scoreBoard'], ['level', 'prio'], ['asc', 'asc']);
    data['infoak'] = infoak;

    /*for (const k in tabsSize) {
      const v = tabsSize[k];
      if (v > 0) {
        data['tabs'][k] = v;
      }
    }
    console.log(data);*/
    return data;
  }

  private testView(ele: string, txt: string, tot: number): any {
    const item = {};

    item['txt'] = txt;
    item['tot'] = tot ? tot : 0;

    if (ele === 'w3cValidatorErrors' || ele === 'dtdOld') {
      return item;
    }

    if (tot > 0 || ele === 'langNo' || ele === 'langCodeNo' || ele === 'langExtra' || ele === 'titleChars') {
      item['ele'] = ele;
    }

    return item;
  }

  private testView(ele: string, txt: string, tot: number): any {
    const item = {};

    item['txt'] = txt;
    item['tot'] = tot ? tot : 0;

    if (ele === 'w3cValidatorErrors' || ele === 'dtdOld') {
      return item;
    }

    if (tot > 0 || ele === 'langNo' || ele === 'langCodeNo' || ele === 'langExtra' || ele === 'titleChars') {
      item['ele'] = ele;
    }

    return item;
  }

  private convertBytes(length: number): string {
    if (length < 1024) {
        return length + ' bytes';
    } else if (length < 1024000) {
        return _.round((length / 1024), 1) + ' KB <em>(' + length + ' bytes)</em>';
    } else {
        return _.round((length / 1048576), 1) + ' MB <em>(' + length + ' bytes)</em>';
    }
  }

  /*private resIcon(r: number): string {
    switch (r) {
      case 10: return 'A';
      case 9: case 8: return 'B';
      case 7: case 6: return 'C';
      case 5: case 4: return 'D';
      case 3: case 2: return 'E';
      case 1: return 'F';
    }
  }*/
}
