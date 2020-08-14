import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from '../common/data.service';
import { CommonModule } from '@angular/common';
import { Oms } from '../common/oms.model';

@Component({
  selector: 'app-omslist',
  templateUrl: './omslist.component.html',
  styleUrls: ['./omslist.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OmslistComponent implements OnInit {

  private omss: Oms[];

  constructor(private dataService: DataService) {
   }

  ngOnInit() {

     this.getAllOms();

     this.dataService.add_subject.subscribe(response => {
          this.getAllOms();
     });
  }

  getAllOms(): void {
      this.dataService.getOmss()
        .subscribe(res => {
            this.omss = res['data'];
      },
      err => {
          console.log('Umable to get Oms data from server');
      }
    );
  }
  delete(oms: Oms): void {
    this.omss = this.omss.filter( o => o !== oms);
    this.dataService.deleteOms(oms).subscribe();
  }

 }
