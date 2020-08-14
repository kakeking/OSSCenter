import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../common/data.service';
import { Netact } from '../common/netact.model';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';  /*import to process Observable route parameters*/

@Component({
  selector: 'app-integration-detail',
  templateUrl: './integration-detail.component.html',
  styleUrls: ['./integration-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class IntegrationDetailComponent implements OnInit {
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

  save(): void {
    this.dataService.updateNetact(this.netact)
      .subscribe(() => this.goBack());
  }
}
