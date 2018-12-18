import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { FintechService } from '../fintech.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher, MatAutocompleteSelectedEvent, MatPaginator, MatTableDataSource, MatSort, MatMenuTrigger } from '@angular/material';
import { AuthenticationService } from 'src/app/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PaperFormErrorStateMatcher } from 'src/app/util/paper-form-error-state-matcher';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

interface Bank{
  name: string,
  img: string,
  id: string, 
  accounts: Array<any>
  numAccounts: number
}

export interface PaymentListElement {
  position: number;
  refereneceNo: string;
  fromAccount: string;
  toAccount: string;
  amount: number;
  date: string;
  bank: string;
}

// the `default as` syntax.
import * as _moment from 'moment';
import { AccountSameErrorStateMatcher } from 'src/app/util/account-same-error-state-matcher';
import { FundErrorStateMatcher } from 'src/app/util/fund-error-state-matcher';
// tslint:disable-next-line:no-duplicate-imports
// import {default as _rollupMoment} from 'moment';

// const moment = _rollupMoment || _moment;
const moment = _moment;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  providers: [
    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class PaymentComponent implements OnInit {

  private formBuilder:FormBuilder
  public matcher:ErrorStateMatcher
  public matcherAccountSame:AccountSameErrorStateMatcher
  public matcherFund:FundErrorStateMatcher
  public paperForm:FormGroup

  public bank:any;
  public accounts:Array<any>;
  public fromAccounts:Array<any>;
  public toAccounts:Array<any>;
  public currentUser:any;
  public currentFromAccount:any;
  public currentToAccount:any;

  public showActivity = true;
  public pageSize = 15;
  


  public displayedColumns: string[] = ['position', 'refereneceNo', 'fromAccount', 'toAccount',  'amount', 'date', 'bank', 'star'];
  public dataSource: MatTableDataSource<PaymentListElement>;
  sortedData: PaymentListElement[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;


  public maxWidth:number = 768;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // let w = event.target.innerWidth;
    let w = window.innerWidth;
    if(w > this.maxWidth){
      this.showActivity = true;
    }
  }
 

  constructor(
    private authService:AuthenticationService,
    private fintechService:FintechService,
    private route: ActivatedRoute,
    private router: Router,
  ) { 
    this.formBuilder = new FormBuilder();
    this.matcher = new PaperFormErrorStateMatcher();
    this.matcherAccountSame = new AccountSameErrorStateMatcher();
    this.matcherFund = new FundErrorStateMatcher();

    this.paperForm = this.formBuilder.group({
      bankCtrl: ['', [ Validators.required ]],
      accountFromCtrl: ['', [ Validators.required ]],
      accountToCtrl: ['', [ Validators.required ]],
      amountCtrl: ['', [ Validators.required, Validators.min(1) ]],
      dateCtrl: [moment(), [ Validators.required ]]
      // dateCtrl: [moment([2017, 0, 1]), [ Validators.required ]]
    }, { validator: Validators.compose( [ this.checkAccountSame.bind(this), this.checkAccountBalance.bind(this) ] ) })
  }

  
  ngOnInit() {

    this.bank = JSON.parse(localStorage.getItem('bank'))
    this.accounts = JSON.parse(localStorage.getItem('accounts'))
    this.fromAccounts = JSON.parse(localStorage.getItem('accounts'))
    this.toAccounts = JSON.parse(localStorage.getItem('accounts'))
    this.currentUser = JSON.parse(localStorage.getItem('user'))

    this.paperForm.controls['bankCtrl'].setValue(this.bank.name)
    this.getPaymentList();

    let w = window.innerWidth;
    if(w <= this.maxWidth){
      this.showActivity = false
      this.pageSize = 15;
    } else {
      this.pageSize = 15;
    }

  }

  getPaymentList(){
   
      this.fintechService.getPaymentList().subscribe(
        data => {
          console.log(data)
  
          let list:Array<any> = Array.from( data.content, (x:any) => {
            return { 
              refereneceNo: x.refereneceNo,
              fromAccount: x.fromAccount.accountNo,
              toAccount: x.toAccount.accountNo,
              amount: x.amount,
              date: x.date,
              bank: x.bank.bankName
            }
          } )

          for(let i=0; i< list.length; i++){
            list[i].position = i+1
          }

          this.dataSource = new MatTableDataSource<PaymentListElement> ( list );
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          
        },
        error => {
          console.log(error)
        }
      )
    
  }

  getAccountList(){
    this.fintechService.getAccountList(this.currentUser._id, this.bank.id ).subscribe(
      data => {
        console.log(data)

        

        this.accounts = data.content;
        this.fromAccounts = this.accounts
        this.toAccounts = this.accounts
        if(this.currentFromAccount) {
          let from = this.accounts.filter((x:any) => { return x._id === this.currentFromAccount._id })[0]
          let to = this.accounts.filter((x:any) => { return x._id === this.currentToAccount._id })[0]
  
          console.log(this.currentFromAccount)
          console.log(this.currentToAccount)
          console.log(from)
          console.log(to)
          this.paperForm.controls.accountFromCtrl.setValue(from);
          this.paperForm.controls.accountToCtrl.setValue(to);
        }
       
        localStorage.setItem('accounts', JSON.stringify(this.accounts))
       
      },
      error => {
        console.log(error)
      }
    )
  }
  fromAccountChange(evt){
    
    this.currentFromAccount = evt.value;
    console.log(evt.value)
  }
  toAccountChange(evt){
    this.currentToAccount = evt.value;
    console.log(evt.value)


  }

  checkAccountSame(group: FormGroup) { // here we have the 'passwords' group
    // console.log(group)
    if(!group.controls.accountFromCtrl) { return null }

    let accountFrom = group.controls.accountFromCtrl.value;
    let accountTo = group.controls.accountToCtrl.value;

    return accountFrom._id === accountTo._id ? { accountSame: true } : null     
  }

  checkAccountBalance(group: FormGroup) { // here we have the 'passwords' group
    // console.log(group)
    if(!group.controls.accountFromCtrl) { return null }
    let accountFrom = group.controls.accountFromCtrl.value;
    let amount = group.controls.amountCtrl.value;

    return accountFrom.balance < amount ? { fundError: true } : null     
  }

  showPanel(){
    this.showActivity = true;
  }

  onSubmit(){
    console.warn(this.paperForm.value);
    let data:any = {};
    data.user = this.currentUser._id
    data.bank = this.bank.id
    data.fromAccount = this.paperForm.value.accountFromCtrl._id
    data.toAccount = this.paperForm.value.accountToCtrl._id
    data.date = this.paperForm.value.dateCtrl.toDate();
    data.currency = this.paperForm.value.accountToCtrl.currency;
    data.amount = this.paperForm.value.amountCtrl;
    console.log(data)
    this.fintechService.doPayment(data).subscribe(
      result => {
        console.log(result);
        this.getPaymentList();
        this.getAccountList();

        
      },
      error => {
        console.log(error);
      }
      )
  }

}
