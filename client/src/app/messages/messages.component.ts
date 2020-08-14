import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { MessageService } from '../common/message.service';
import { DataService } from '../common/data.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MessagesComponent implements OnInit {

  constructor(
    public messageService: MessageService,
    public dataService: DataService
  ) { }

  ngOnInit() {
  }

  /*refreshData(): void {
    this.dataService.refreshData()
      .subscribe(
        data => {
            this.log(data);
        },
        err => {
          this.log('refresh script failed to be executed');
        }
      );
  }
  private log(message: string) {
    this.messageService.add('OssCenter: ' + message);
  }*/
}
