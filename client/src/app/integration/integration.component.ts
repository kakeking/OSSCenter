import { Component, OnInit, ViewEncapsulation, Directive, ViewContainerRef, Injectable } from '@angular/core';
import { DataService } from '../common/data.service';
import { Netact } from '../common/netact.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MessagesComponent } from '../messages/messages.component';
import { MessageService } from '../common/message.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-integration',
  templateUrl: './integration.component.html',
  styleUrls: ['./integration.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class IntegrationComponent implements OnInit {
      netacts: Netact[];

        constructor(
          private dataService: DataService,
          private route: ActivatedRoute,
          private http: HttpClient,
          private messageService: MessageService
          ) { }

      ngOnInit() {
          this.getNetacts();

          this.dataService.add_subject.subscribe(response => {
              this.getNetacts();
          });
        }

          getNetacts(): void {
              this.dataService.getNetacts()
                .subscribe(
                  data => {
                  // Read the result field from JSON response
                   this.netacts = data['data'];
                },
                 err => {
                  console.log('Unable to get integration data from server');
              });
          }

}
