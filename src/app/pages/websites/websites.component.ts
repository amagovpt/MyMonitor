import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';

import { MonitorService } from '../../services/monitor.service';

@Component({
  selector: 'app-websites',
  templateUrl: './websites.component.html',
  styleUrls: ['./websites.component.css']
})
export class WebsitesComponent implements OnInit {

  loading: boolean;
  error: boolean;

  displayedColumns = [
    'Name',
    'Domain',
    'Pages',
    'Creation_Date',
    //'see'
  ];

  websites: Array<any>;

  // data source of domains
  dataSource: any;
  selection: any;

  @ViewChild('input', { static: false }) input: ElementRef;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private monitor: MonitorService,
    private cd: ChangeDetectorRef
  ) {
    this.loading = true;
    this.error = false;
  }

  ngOnInit(): void {
    this.monitor.getUserWebsites()
      .subscribe(websites => {
        if (websites !== null) {
          this.websites = websites;
          this.dataSource = new MatTableDataSource(websites);
          this.dataSource.sort = this.sort;
        } else {
          this.error = true;
        }

        this.loading = false;
        this.cd.detectChanges();
      });
  }

  applyFilter(filterValue: string): void {
    filterValue = _.trim(filterValue);
    filterValue = _.toLower(filterValue);
    this.dataSource.filter = filterValue;
  }
}
