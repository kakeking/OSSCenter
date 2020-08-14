import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { OmslistComponent } from './omslist/omslist.component';
import { HomeComponent } from './home/home.component';
import { NetactlistComponent } from './netactlist/netactlist.component';
import { NetactDetailComponent } from './netact-detail/netact-detail.component';
import { OmsDetailComponent } from './oms-detail/oms-detail.component';
import { IntegrationDetailComponent } from './integration-detail/integration-detail.component';
import { ApiComponent } from './api/api.component';
import { IntegrationComponent } from './integration/integration.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { OmsaddComponent } from './omsadd/omsadd.component';


const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'oms',
        component: OmslistComponent
    },
    {
        path: 'netacts',
        component: NetactlistComponent
    },
    {
        path: 'apis',
        component: ApiComponent
     },
     {
        path: 'contactus',
        component: ContactUsComponent
     },
    {
        path: 'oms/addoms',
        component: OmsaddComponent
     },
    {
        path: 'netact/:id',
        component: NetactDetailComponent
     },
     {
        path: 'oms/:id',
        component: OmsDetailComponent
     },
     {
        path: 'integration/:id',
        component: IntegrationDetailComponent
     },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
   exports: [ RouterModule ]
})
export class AppRoutingModule { }
