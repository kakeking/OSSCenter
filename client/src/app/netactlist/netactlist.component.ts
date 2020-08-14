import { Component, OnInit, ViewEncapsulation, Directive, ViewContainerRef } from '@angular/core';
import { DataService } from '../common/data.service';
import { Netact } from '../common/netact.model';

@Component({
  selector: 'app-netactlist',
  templateUrl:  './netactlist.component.html',
  styleUrls: ['./netactlist.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NetactlistComponent implements OnInit {

  private netactList: Netact[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
     this.getAllNetact();

     this.dataService.add_subject.subscribe(response => {
         this.getAllNetact();
     });
  }

  getAllNetact(): void {
      this.dataService.getNetacts()
        .subscribe(res => {
          this.netactList = res['data'];
        },
        err => {
            console.log('Unable to get Netact data from server');
        }
    );
    }
    delete(netact: Netact): void {
        this.netactList = this.netactList.filter( o => o !== netact);
        this.dataService.deleteNetact(netact).subscribe();
    }

}

