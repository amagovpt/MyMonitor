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
  }
  async getAllWebsites(): Promise<Website[]>{
  this.websiteMap = new Map<string, Website>();
  return new Promise((resolve, reject) => {
    this.monitor.getUserWebsites()
    .subscribe(async websites => {
      await Promise.all(websites.map(async (website,index) => {
        await this.addWebsite(website,index+1);
      }))
      resolve(this.getWebsiteList())
    })
  });

}

addWebsite(websiteData: any,index:number):Promise<Website> {
  const websiteName = websiteData.Name;
  return new Promise((resolve, reject) => {this.monitor.getUserWebsitePages(websiteName).subscribe((pages) => {
    const website = new Website(websiteData.url, websiteName, websiteData.Declaration, websiteData.DeclarationDate, websiteData.Stamp, websiteData.Stamp_Update_Date, index);
    for (const page of pages || []) {
      website.addPage(
        parseFloat(page.Score),
        page.Errors,
        page.Tot,
        page.A,
        page.AA,
        page.AAA,
        page.Evaluation_Date,
        page.Uri,
        page.PageId
      );
    }
    this.websiteMap.set(websiteName, website);
    resolve(website);
  })});
}


getWebsiteList() {
  return [...this.websiteMap.values()];
}

getWebsiteByName(name: string) {
  return this.websiteMap.get(name);
}
}
