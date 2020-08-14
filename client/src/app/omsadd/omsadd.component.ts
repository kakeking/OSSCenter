import { Oms } from '../common/oms.model';
import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { DataService } from '../common/data.service';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';  /*import to process Observable route parameters*/

@Component({
  selector: 'app-oms-add',
  templateUrl: './omsadd.component.html',
  styleUrls: ['./omsadd.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OmsaddComponent implements OnInit {
  omss: Oms[];

  constructor(
    private dataService: DataService,
    private location: Location
  ) { }

  ngOnInit() {
  }

  goBack(): void {
    this.location.back();
  }

  add(id: number, name: string, southip: string, northip: string, username: string, password: string, superpassword: string): void {
    name = name.trim();
    southip = southip.trim();
    northip = northip.trim();
    username = username.trim();
    password = password.trim();
    superpassword = superpassword.trim();
    if (!name || !southip || !northip || !username || !password || !superpassword) { return; }
    this.dataService.addOms(
      {
        _id: id,
        name: name,
        south: southip,
        north: northip,
        username: username,
        password: password,
        superpw: superpassword
    } as Oms)
        .subscribe(() => this.goBack());
      }
  }


