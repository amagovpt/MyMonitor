import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { MatSort, Sort } from "@angular/material/sort";


import { WebsiteListService } from "src/app/services/website-list.service";
import { Route, Router } from "@angular/router";

@Component({
  encapsulation: ViewEncapsulation.ShadowDom,
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
    private websiteList: WebsiteListService,
    private cd: ChangeDetectorRef, private router: Router
  ) {
    this.loading = true;
    this.error = false;
  }

  async ngOnInit(): Promise<void> {
    this.websites = await this.websiteList.getAllWebsites();
    this.pageSize = 50;
    this.sortedData = this.websites.slice(0, this.pageSize);
    this.indicator1 = 1;
    this.indicator2 =
      this.websites.length > this.pageSize
        ? this.pageSize
        : this.websites.length;

    this.loading = false;
    this.sortData(({ active: 'rank', direction: 'asc' }) as Sort);
    this.cd.detectChanges();

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
    if (sort.active === "rank") {
      if (sort.direction === "asc") {
        this.websites = this.websites.sort((a, b) => a.id - b.id).slice();
      } else {
        this.websites = this.websites.sort((a, b) => b.id - a.id).slice();
      }
    }
    if (sort.active === "score") {
      if (sort.direction === "asc") {
        this.websites = this.websites.sort((a, b) => a.score - b.score).slice();
      } else {
        this.websites = this.websites.sort((a, b) => b.score - a.score).slice();
      }
    } else if (sort.active === "declaration") {
      if (sort.direction === "asc") {
        this.websites = this.websites
          .sort((a, b) => a.declaration - b.declaration)
          .slice();
      } else {
        this.websites = this.websites
          .sort((a, b) => b.declaration - a.declaration)
          .slice();
      }
    } else if (sort.active === "stamp") {
      if (sort.direction === "asc") {
        this.websites = this.websites.sort((a, b) => a.stamp - b.stamp).slice();
      } else {
        this.websites = this.websites.sort((a, b) => b.stamp - a.stamp).slice();
      }
    } else if (sort.active === "pages") {
      if (sort.direction === "asc") {
        this.websites = this.websites
          .sort((a, b) => a.pages.length - b.pages.length)
          .slice();
      } else {
        this.websites = this.websites
          .sort((a, b) => b.pages.length - a.pages.length)
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
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
          } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          }

          return 0;
        });
      } else {
        this.websites = this.websites.sort((a, b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return 1;
          } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
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
  sendTo(websiteName:number){
    this.router.navigateByUrl(`/acessibility-declaration/${websiteName}`);
  }
}
