import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS }    from '@angular/common/http';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// --- Material CMP --- //
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { MatPaginatorModule, MatCheckboxModule, MatMenuModule, MatBadgeModule, MatAutocompleteModule, MatNativeDateModule } from '@angular/material';
import { MatSortModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material';


import { FintechComponent } from './fintech/fintech.component';


import { AngularSvgIconModule } from 'angular-svg-icon';
import { LoginComponent } from './fintech/login/login.component';
import { AccountComponent } from './fintech/account/account.component';
import { SidenavService } from './sidenav.service';
import { JwtInterceptor } from './util/jwt.interceptor';
import { ErrorInterceptor } from './util/error.interceptor';

import {TimeAgoPipe} from 'time-ago-pipe';
import { PaymentComponent } from './fintech/payment/payment.component';



@NgModule({
  declarations: [
    AppComponent,
    FintechComponent,
    LoginComponent,
    AccountComponent,
    TimeAgoPipe,
    PaymentComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatMenuModule,
    MatBadgeModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,

    AngularSvgIconModule,
    


  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    SidenavService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
