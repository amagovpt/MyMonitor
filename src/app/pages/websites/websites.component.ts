import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { MonitorService } from '../../services/monitor.service';

@Component({
  selector: 'app-websites',
  templateUrl: './websites.component.html',
  styleUrls: ['./websites.component.scss']
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

  @ViewChild('input') input: ElementRef;
  @ViewChild(MatSort) sort: MatSort;

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
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
