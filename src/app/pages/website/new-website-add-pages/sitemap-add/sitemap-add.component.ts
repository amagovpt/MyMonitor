import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from "@angular/core";
import clone from "lodash.clone";
import { MonitorService } from "src/app/services/monitor.service";


@Component({
  encapsulation: ViewEncapsulation.ShadowDom,
  selector: 'app-sitemap-add',
  templateUrl: './sitemap-add.component.html',
  styleUrls: ['./sitemap-add.component.scss']
})
export class SitemapAddComponent implements OnInit {

  @Input("website") website: string;
  @Output("addPages") addWebsitePages = new EventEmitter<any>();

  urisFromFile: string[];
  urisFromFileString: string;
  fileErrorMessage: string;
  startingUrl: string;

  // fileInput: FormControl;          [formControl]="fileInput"

  file: File;
  validFile: boolean;


  constructor(
    private monitor: MonitorService,
    private cd: ChangeDetectorRef
  ) {

    this.fileErrorMessage = "";
    this.urisFromFile = [];
  }

  ngOnInit(): void {
    this.monitor
      .getWebsiteStartingUrl(this.website)
      .subscribe((startingUrl) => {
        if (startingUrl) {
          this.startingUrl = startingUrl;
        }
      })
  }


  handleFileInput(files: FileList) {
    const fileToRead = files.item(0);
    this.urisFromFile = [];
    if (fileToRead === null) {
      this.fileErrorMessage = "";
      this.urisFromFile = [];
      return;
    }

    switch (fileToRead.type) {
      case "text/plain":
        this.parseTXT(fileToRead);
        break;
      case "text/xml":
        this.parseXML(fileToRead);
        break;
      default:
        this.urisFromFile = [];
        this.fileErrorMessage = "invalidType";
        break;
    }
  }

  parseTXT(file: File): string[] {
    const result = [];
    // open file and check for the urls
    const reader = new FileReader();
    reader.readAsText(file);
    // divide the url in the result array
    reader.onload = () => {
      const urlFile = reader.result.toString();
      const lines = urlFile
        .split("\n")
        .map((l) => l.trim())
        .filter((u) => u !== "");

      this.urisFromFile = clone(lines);
      this.validateFileUris(this.startingUrl, this.urisFromFile);
      this.cd.detectChanges();
    };
    return result;
  }

  parseXML(file: File): string[] {
    const reader = new FileReader();
    const result = [];
    reader.readAsText(file);
    reader.onload = () => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(reader.result.toString(), "text/xml");

      const urls = doc.getElementsByTagName("loc");

      this.urisFromFile = new Array<string>();
      for (let i = 0; i < urls.length; i++) {
        const url = urls.item(i);
        this.urisFromFile.push(url.textContent.trim());
      }

      this.validateFileUris(this.startingUrl, this.urisFromFile);
    };
    return result;
  }

  validateFileUris(startingUrl: string, uris: string[]): void {
    if (startingUrl === "") {
      this.fileErrorMessage = "invalidDomain";
      return;
    }
    if (uris !== undefined ) {
      for (let url of uris) {
        if (!url.startsWith(startingUrl)) {
          this.fileErrorMessage = "invalidDomain";
          return;
        } else {
          this.fileErrorMessage = "";
        }
      }
    }
  }

  addFilePages(): void {
    this.addWebsitePages.next({
      startingUrl: this.startingUrl,
      urls: this.urisFromFile,
    });
  }
}
