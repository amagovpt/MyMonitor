import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Location } from '@angular/common';
import * as _ from 'lodash';

@Component({
  selector: 'app-list-of-pages',
  templateUrl: './list-of-pages.component.html',
  styleUrls: ['./list-of-pages.component.css']
})
export class ListOfPagesComponent implements OnInit {

  @Input('pages') pages: Array<any>;

  displayedColumns = [
    'Uri',
    'Score',
    'A',
    'AA',
    'AAA',
    'Evaluation_Date',
    'See'
  ];

  // data source of domains
  dataSource: any;
  selection: any;

  @ViewChild('input') input: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private location: Location) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.pages);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string): void {
    filterValue = _.trim(filterValue);
    filterValue = _.toLower(filterValue);
    this.dataSource.filter = filterValue;
  }

  getUriRoute(uri: string): Array<string> {
    const path = this.location.path();
    let segments = _.split(path, '/');
    segments[0] = '/user';
    segments.splice(1, 1);
    segments.push(uri);
    segments = _.map(segments, s => decodeURIComponent(s));

    return segments;
  }
}
