import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { Oms } from '../common/oms.model';
import { DataService } from '../common/data.service';
import 'rxjs/add/operator/switchMap';  /*import to process Observable route parameters*/
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-oms-detail',
  templateUrl: './oms-detail.component.html',
  styleUrls: ['./oms-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OmsDetailComponent implements OnInit {
  @Input() oms: Oms;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getOms();
  }
   getOms(): void {
     const id = +this.route.snapshot.paramMap.get('id');
     this.dataService.getOms(id)
      .subscribe(oms => this.oms = oms['data']);
   }

   goBack(): void {
     this.location.back();
   }
  }

