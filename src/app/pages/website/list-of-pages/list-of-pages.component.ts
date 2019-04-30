import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from '@angular/core';
import {
  MatTableDataSource,
  MatPaginator,
  MatSort
} from '@angular/material';
import {
  Location
} from '@angular/common';
import {
  SelectionModel
} from '@angular/cdk/collections';
import * as _ from 'lodash';

@Component({
  selector: 'app-list-of-pages',
  templateUrl: './list-of-pages.component.html',
  styleUrls: ['./list-of-pages.component.css']
})
export class ListOfPagesComponent implements OnInit {

  @Input('pages') pages: Array<any>;

  @Output('removePages') removePages = new EventEmitter<Array<number>>();

  displayedColumns = [
    'select',
    'Uri',
    'Score',
    'A',
    'AA',
    'AAA',
    'Evaluation_Date',
    //'See'
  ];

  // data source of domains
  dataSource: any;
  selection: any;

  @ViewChild('input') input: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private location: Location) {
    this.selection = new SelectionModel<any>(true, []);
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.pages);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  deletePages(): void {
    const pagesId = _.map(this.selection.selected, 'PageId');
    this.removePages.next(pagesId);
  }

  applyFilter(filterValue: string): void {
    filterValue = _.trim(filterValue);
    filterValue = _.toLower(filterValue);
    this.dataSource.filter = filterValue;
  }

  getUriRoute(uri: string): Array < string > {
    const path = this.location.path();
    let segments = _.split(path, '/');
    segments[0] = '/user';
    segments.splice(1, 1);
    segments.push(uri);
    segments = _.map(segments, s => decodeURIComponent(s));

    return segments;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.filteredData.forEach(row => this.selection.select(row));
  }
}
