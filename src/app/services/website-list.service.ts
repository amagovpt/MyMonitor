import { Injectable } from '@angular/core';
import { Website } from '../models/website';
import { MonitorService } from './monitor.service';

@Injectable({
  providedIn: 'root'
})
export class WebsiteListService {

  websiteMap: Map<string, Website>;

  constructor(private monitor: MonitorService,) {
    this.websiteMap = new Map<string, Website>();
    this.monitor.getUserWebsites()
      .subscribe(websites => {
        websites.map((website) => {
          this.addWebsite(website)
          console.log(website)

        })

      });
  }

  addWebsite(websiteData: any) {
    const websiteName = websiteData.Name;
    this.monitor.getUserWebsitePages(websiteName).subscribe((pages) => {
      const website = new Website(websiteData.url, websiteName, websiteData.Declaration, websiteData.DeclarationDate, websiteData.Stamp, websiteData.Stamp_Update_Date, websiteData.WebsiteId);
      for (const page of pages || []) {
        website.addPage(
          page.Score,
          page.Errors,
          page.Tot,
          page.A,
          page.AA,
          page.AAA,
          page.Evaluation_Date
        );
      }
      this.websiteMap.set(websiteName, website);
    })
  }

  getWebsiteList() {
    console.log(this.websiteMap);
    return [...this.websiteMap.values()];
  }

  getWebsiteByName(name: string) {
    return this.websiteMap.get(name);
  }
}
