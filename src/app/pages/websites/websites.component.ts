import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
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
    'see'
  ];

  websites: Array<any>;

  // data source of domains
  dataSource: any;
  selection: any;

  @ViewChild('input') input: ElementRef;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private monitor: MonitorService) {
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
      });
  }

  applyFilter(filterValue: string): void {
    filterValue = _.trim(filterValue);
    filterValue = _.toLower(filterValue);
    this.dataSource.filter = filterValue;
  }
}
