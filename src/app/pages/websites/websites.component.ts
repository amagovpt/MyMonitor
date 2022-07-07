import { Component, OnInit, Input, ChangeDetectorRef, ElementRef, ViewChild } from "@angular/core";
import { MatSort, Sort } from "@angular/material/sort";

import { Website } from "../../models/website";

import orderBy from "lodash.orderby";
import { MonitorService } from "src/app/services/monitor.service";

@Component({
  selector: "app-websites",
  templateUrl: "./websites.component.html",
  styleUrls: ["./websites.component.scss"],
})
export class WebsitesComponent implements OnInit {

  loading: boolean;
  error: boolean;

  sortedData: Array<any>;
  websites: Array<any>;

  indicator1: number;
  indicator2: number;

  pageSize: number;

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
          console.log(websites);
          this.pageSize = 50;
          this.sortedData = this.websites.slice(0, this.pageSize);
          this.indicator1 = 1;
          this.indicator2 =
            this.websites.length > this.pageSize
              ? this.pageSize
              : this.websites.length;
        } else {
          this.error = true;
        }

        this.loading = false;
        this.cd.detectChanges();
      });
  }

  nextPage(): void {
    this.sortedData = this.websites.slice(
      this.indicator2,
      this.indicator2 + this.pageSize
    );
    this.indicator1 = this.indicator1 + this.pageSize;
    this.indicator2 =
      this.indicator2 + this.pageSize > this.websites.length
        ? this.websites.length
        : this.indicator2 + this.pageSize;
  }

  previousPage(): void {
    this.sortedData = this.websites.slice(
      this.indicator1 - this.pageSize - 1 < 0
        ? 0
        : this.indicator1 - this.pageSize - 1,
      this.indicator1 - 1
    );
    this.indicator2 = this.indicator1 - 1;
    this.indicator1 =
      this.indicator1 - this.pageSize < 1 ? 1 : this.indicator1 - this.pageSize;
  }

  firstPage(): void {
    this.sortedData = this.websites.slice(0, this.pageSize);
    this.indicator1 = 1;
    this.indicator2 =
      this.websites.length > this.pageSize
        ? this.pageSize
        : this.websites.length;
  }

  lastPage(): void {
    this.indicator2 = this.websites.length;
    this.indicator1 =
      this.indicator2 % this.pageSize === 0
        ? this.indicator2 - this.pageSize + 1
        : this.indicator2 - (this.indicator2 % this.pageSize) + 1;
    this.sortedData = this.websites.slice(this.indicator1 - 1, this.indicator2);
  }

  changeItemsPerPage(e): void {
    this.pageSize = parseInt(e.target.value);
    if (this.indicator1 + this.pageSize > this.websites.length) {
      this.lastPage();
    } else {
      this.indicator2 = this.indicator1 + this.pageSize - 1;
      this.sortedData = this.websites.slice(
        this.indicator1 - 1,
        this.indicator2
      );
    }
  }

  sortData(sort: Sort): void {
    if (sort.active === "rank" || sort.active === "score") {
      if (sort.direction === "asc") {
        this.websites = this.websites.sort((a, b) => a.rank - b.rank).slice();
      } else {
        this.websites = this.websites.sort((a, b) => b.rank - a.rank).slice();
      }
    } else if (sort.active === "declaration") {
      if (sort.direction === "asc") {
        this.websites = this.websites
          .sort((a, b) => a.Declaration - b. Declaration)
          .slice();
      } else {
        this.websites = this.websites
          .sort((a, b) => b.Declaration - a.Declaration)
          .slice();
      }
    } else if (sort.active === "stamp") {
      if (sort.direction === "asc") {
        this.websites = this.websites.sort((a, b) => a.Stamp - b.Stamp).slice();
      } else {
        this.websites = this.websites.sort((a, b) => b.Stamp - a.Stamp).slice();
      }
    } else if (sort.active === "pages") {
      if (sort.direction === "asc") {
        this.websites = this.websites
          .sort((a, b) => a.Pages - b.Pages)
          .slice();
      } else {
        this.websites = this.websites
          .sort((a, b) => b.Pages - a.Pages)
          .slice();
      }
    } else if (sort.active === "A") {
      if (sort.direction === "asc") {
        this.websites = this.websites.sort((a, b) => a.A - b.A).slice();
      } else {
        this.websites = this.websites.sort((a, b) => b.A - a.A).slice();
      }
    } else if (sort.active === "AA") {
      if (sort.direction === "asc") {
        this.websites = this.websites.sort((a, b) => a.AA - b.AA).slice();
      } else {
        this.websites = this.websites.sort((a, b) => b.AA - a.AA).slice();
      }
    } else if (sort.active === "AAA") {
      if (sort.direction === "asc") {
        this.websites = this.websites.sort((a, b) => a.AAA - b.AAA).slice();
      } else {
        this.websites = this.websites.sort((a, b) => b.AAA - a.AAA).slice();
      }
    } else if (sort.active === "name") {
      if (sort.direction === "asc") {
        this.websites = this.websites.sort((a, b) => {
          if (a.Name.toLowerCase() < b.Name.toLowerCase()) {
            return -1;
          } else if (a.Name.toLowerCase() > b.Name.toLowerCase()) {
            return 1;
          }

          return 0;
        });
      } else {
        this.websites = this.websites.sort((a, b) => {
          if (a.Name.toLowerCase() < b.Name.toLowerCase()) {
            return 1;
          } else if (a.Name.toLowerCase() > b.Name.toLowerCase()) {
            return -1;
          }

          return 0;
        });
      }
    }

    if (this.indicator1 + this.pageSize > this.websites.length) {
      this.lastPage();
    } else {
      this.indicator2 = this.indicator1 + this.pageSize - 1;
      this.sortedData = this.websites.slice(
        this.indicator1 - 1,
        this.indicator2
      );
    }
  }
}
