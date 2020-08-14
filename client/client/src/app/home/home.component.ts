import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, RouterModule, Routes} from '@angular/router';
import { Location } from '@angular/common';
import { DataService } from '../common/data.service';
import { OmslistComponent } from '../omslist/omslist.component';
import { NetactlistComponent } from '../netactlist/netactlist.component';
import { MessagesComponent } from '../messages/messages.component';
import { MessageService } from '../common/message.service';
import { IntegrationComponent } from '../integration/integration.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  constructor(
     private route: ActivatedRoute,
     private dataService: DataService,
     private location: Location,
     private messageService: MessageService
     ) {}

  ngOnInit() {
  }

}
