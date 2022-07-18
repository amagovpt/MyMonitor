import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
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
import { MonitorService } from "src/app/services/monitor.service";


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
  selector: 'app-manually-add-pages',
  templateUrl: './manually-add-pages.component.html',
  styleUrls: ['./manually-add-pages.component.scss']
})
export class ManuallyAddPagesComponent implements OnInit {

  @Input("website") website: string;
  @Output("addPages") addWebsitePages = new EventEmitter<any>();

  matcher: ErrorStateMatcher;

  pagesForm: FormGroup;
  startingUrl: string;


  constructor(
    private monitor: MonitorService,
    private fb: FormBuilder,
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
  }

  ngOnInit(): void {
    this.monitor
      .getWebsiteStartingUrl(this.website)
      .subscribe((startingUrl) => {
        if (startingUrl) {
          this.startingUrl = startingUrl;
          this.pagesForm.controls.startingUrl.setValue(startingUrl);
        }
      });
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
  }}

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

