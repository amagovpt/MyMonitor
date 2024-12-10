import {
  Component,
  OnInit,
  Input,
} from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "src/app/services/message.service";
import { MonitorService } from "src/app/services/monitor.service";


@Component({
  selector: 'app-add-observatory',
  templateUrl: './add-observatory.component.html',
  styleUrls: ['./add-observatory.component.scss']
})
export class AddObservatoryComponent implements OnInit {
  @Input("website") website: string;

  constructor(
    private monitor: MonitorService,
    private message: MessageService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
  }


  transferObservatoryPages(): void {
    this.monitor.transferObservatoryPages(this.website).subscribe((result) => {
      if (result) {
        this.message.show("ADD_PAGES.transfer.success");
        this.router.navigateByUrl("/user");
      } else {
        this.message.show("ADD_PAGES.transfer.error");
      }
    });
  }
}

