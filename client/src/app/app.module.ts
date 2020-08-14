import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';

// Import the Http Module and our Data Service
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './common/data.service';
import { MessageService } from './common/message.service';
import { OmslistComponent } from './omslist/omslist.component';
import { OmsaddComponent } from './omsadd/omsadd.component';
import { NetactlistComponent } from './netactlist/netactlist.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './/app-routing.module';
import { NetactDetailComponent } from './netact-detail/netact-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { IntegrationComponent } from './integration/integration.component';
import { NavbarComponent } from './navbar/navbar.component';
import { OmsDetailComponent } from './oms-detail/oms-detail.component';
import { ApiComponent } from './api/api.component';
import { FooterComponent } from './footer/footer.component';
import { IntegrationDetailComponent } from './integration-detail/integration-detail.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

@NgModule({
  declarations: [
    AppComponent,
    OmslistComponent,
    OmsaddComponent,
    NetactlistComponent,
    HomeComponent,
    NetactDetailComponent,
    MessagesComponent,
    IntegrationComponent,
    NavbarComponent,
    OmsDetailComponent,
    ApiComponent,
    FooterComponent,
    IntegrationDetailComponent,
    ContactUsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [DataService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
