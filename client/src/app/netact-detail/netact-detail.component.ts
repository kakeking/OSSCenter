import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../common/data.service';
import { Netact } from '../common/netact.model';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';  /*import to process Observable route parameters*/

@Component({
  selector: 'app-netact-detail',
  templateUrl: './netact-detail.component.html',
  styleUrls: ['./netact-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NetactDetailComponent implements OnInit {
   @Input() netact: Netact;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private location: Location
    ) { }

  ngOnInit() {
    this.getNetact();
  }
   getNetact(): void {
     const id = +this.route.snapshot.paramMap.get('id');
     this.dataService.getNetact(id)
      .subscribe(netact => this.netact = netact['data']);
   }

   goBack(): void {
     this.location.back();
   }
}
