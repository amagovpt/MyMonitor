import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  FormGroupDirective,
  NgForm,
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { MatDialog } from "@angular/material/dialog";
import clone from "lodash.clone";

import { MonitorService } from "../../../services/monitor.service";
import { MessageService } from "../../../services/message.service";

import { CrawlerResultsDialogComponent } from "../../../dialogs/crawler-results-dialog/crawler-results-dialog.component";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

class DomainUrlValidation {
  static UrlMatchDomain(AC: AbstractControl) {
    const startingUrl = AC.get("startingUrl").value;

    const urls = AC.get("pages")
      .value.split("\n")
      .filter((a) => a !== "");

    let invalid = false;
    const size = urls.length;

    if (!size) {
      return null;
    }

    for (let i = 0; i < size; i++) {
      const url = urls[i].trim();

      if (!url.startsWith(startingUrl)) {
        invalid = true;
      }
    }

    if (invalid) {
      AC.get("pages").setErrors({ domainNoMatch: true });
    } else {
      return null;
    }
  }
}

@Component({
  selector: "app-website-add-pages",
  templateUrl: "./website-add-pages.component.html",
  styleUrls: ["./website-add-pages.component.css"],
})
export class WebsiteAddPagesComponent implements OnInit {
  @Input("website") website: string;
  @Output("addPages") addWebsitePages = new EventEmitter<any>();

  matcher: ErrorStateMatcher;

  pagesForm: FormGroup;
  startingUrl: string;

  urisFromFile: string[];
  urisFromFileString: string;
  fileErrorMessage: string;

  crawlStatus: string;
  crawlButtonDisable: boolean;
  crawlResultsDisabled: boolean;

  isInObservatory: boolean;

  constructor(
    private monitor: MonitorService,
    private message: MessageService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef
  ) {
    this.pagesForm = this.fb.group(
      {
        startingUrl: new FormControl({ value: "", disabled: true }),
        pages: new FormControl("", [
          Validators.required,
          urlValidator,
          missingProtocol,
        ]),
      },
      { validator: DomainUrlValidation.UrlMatchDomain }
    );
    this.matcher = new MyErrorStateMatcher();
    this.crawlStatus = "not_running";
    this.crawlButtonDisable = false;
    this.crawlResultsDisabled = true;
    this.fileErrorMessage = "";
    this.urisFromFile = [];
    this.isInObservatory = false;
  }

  ngOnInit(): void {
    this.monitor
      .getWebsiteStartingUrl(this.website)
      .subscribe((startingUrl) => {
        if (startingUrl) {
          this.startingUrl = startingUrl;
          this.pagesForm.controls.startingUrl.setValue(startingUrl);

          this.monitor.checkCrawler(this.startingUrl).subscribe((result) => {
            if (result !== null) {
              if (result) {
                this.crawlStatus = "complete";
                this.crawlButtonDisable = true;
                this.crawlResultsDisabled = false;
              } else {
                this.crawlStatus = "progress";
                this.crawlButtonDisable = true;
                this.crawlResultsDisabled = true;
              }
            }
          });
        }
      });
    this.checkIfWebsiteIsInObservatory();
  }

  addPages(e): void {
    e.preventDefault();

    const pages = this.pagesForm.value.pages
      .split("\n")
      .filter((a) => a !== "")
      .filter((value, index, self) => self.indexOf(value) === index)
      .map((p) => {
        return p.trim();
      });

    this.addWebsitePages.next({ startingUrl: this.startingUrl, urls: pages });
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
    if (uris !== undefined || uris !== []) {
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

  crawlWebsite(): void {
    this.monitor.crawlWebsite(this.startingUrl).subscribe((result) => {
      if (result) {
        this.crawlStatus = "progress";
        this.crawlButtonDisable = true;
      } else {
        alert("Error");
      }

      this.cd.detectChanges();
    });
  }

  openCrawlingResultsDialog(): void {
    const dialog = this.dialog.open(CrawlerResultsDialogComponent, {
      width: "60vw",
      data: {
        startingUrl: this.startingUrl,
      },
    });

    dialog.afterClosed().subscribe((data) => {
      if (data) {
        this.addWebsitePages.next({
          startingUrl: this.startingUrl,
          urls: data,
        });
      }
    });
  }

  deleteCrawlingResults(): void {
    this.monitor.deleteCrawlingResults(this.startingUrl).subscribe((result) => {
      if (result) {
        this.crawlStatus = "not_running";
        this.crawlButtonDisable = false;
        this.crawlResultsDisabled = true;
      } else {
        alert("Error");
      }

      this.cd.detectChanges();
    });
  }

  private checkIfWebsiteIsInObservatory(): void {
    this.monitor
      .checkIfWebsiteIsInObservatory(this.website)
      .subscribe((result) => {
        if (result) {
          this.isInObservatory = true;
        }
      });
  }

  transferObservatoryPages(): void {
    this.monitor.transferObservatoryPages(this.website).subscribe((result) => {
      if (result) {
        this.message.show("ADD_PAGES.transfer.success");
      } else {
        this.message.show("ADD_PAGES.transfer.error");
      }
    });
  }
}

function missingProtocol(control: FormControl) {
  const urls = control.value.split("\n").filter((a) => a !== "");

  let invalid = false;
  const size = urls.length;

  if (!size) {
    return null;
  }

  for (let i = 0; i < size; i++) {
    const url = urls[i].trim();

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      invalid = true;
      break;
    }
  }

  return invalid ? { missingProtocol: { value: true } } : null;
}

function urlValidator(control: FormControl) {
  const urls = control.value.split("\n").filter((a) => a !== "");

  let invalid = false;
  const size = urls.length;

  if (!size) {
    return null;
  }

  for (let i = 0; i < size; i++) {
    const url = urls[i].trim();

    if (!url.includes(url, ".") || url[url.length - 1] === ".") {
      invalid = true;
      break;
    }
  }

  return invalid ? { url: { value: true } } : null;
}
