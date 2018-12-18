import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FintechComponent } from './fintech/fintech.component';
import { LoginComponent } from './fintech/login/login.component';
import { AccountComponent } from './fintech/account/account.component';
import { PaymentComponent } from './fintech/payment/payment.component';

const routes: Routes = [{
  path: '',
  component: FintechComponent,
  children: [
    { path: 'login', component: LoginComponent },
    { path: 'account', component: AccountComponent },
    { path: 'payment', component: PaymentComponent },

  ],
  

},
  // otherwise redirect to home
  // { path: '', redirectTo: 'fintech/login' },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
