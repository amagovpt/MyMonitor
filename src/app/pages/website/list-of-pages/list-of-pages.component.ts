import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  Location
} from '@angular/common';
import {
  SelectionModel
} from '@angular/cdk/collections';

@Component({
  selector: 'app-list-of-pages',
  templateUrl: './list-of-pages.component.html',
  styleUrls: ['./list-of-pages.component.css']
})
export class ListOfPagesComponent implements OnInit {

  @Input('pages') pages: Array<any>;

  @Output('removePages') removePages = new EventEmitter<Array<number>>();

  @Output('reEvaluatePages') reEvaluatePages = new EventEmitter<void>();

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
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private location: Location) {
    this.selection = new SelectionModel<any>(true, []);
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.pages);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  deletePages(): void {
    const pagesId = this.selection.selected.map((page: any) => page.PageId);
    this.removePages.next(pagesId);
  }

  reEvaluate(): void {
    this.reEvaluatePages.next();
  }

  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  getUriRoute(uri: string): Array < string > {
    const path = this.location.path();
    let segments = path.split('/');
    segments[0] = '/user';
    segments.splice(1, 1);
    segments.push(uri);
    segments = segments.map(s => decodeURIComponent(s));

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
