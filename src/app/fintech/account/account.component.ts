import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { FintechService } from '../fintech.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher, MatAutocompleteSelectedEvent, MatPaginator, MatTableDataSource } from '@angular/material';
import { AuthenticationService } from 'src/app/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PaperFormErrorStateMatcher } from 'src/app/util/paper-form-error-state-matcher';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

interface Bank{
  name: string,
  img: string,
  id: string, 
  accounts: Array<any>
  numAccounts: number
}

interface ActivityListElement{
  bank: string,
  time: string
}

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  currentUser:any;
  currentBank:any;
  currentAccounts:Array<any>;
  public displayedColumns: string[] = [  'bank', 'time'];
  activityList:MatTableDataSource<ActivityListElement>;

  private formBuilder:FormBuilder
  public matcher:ErrorStateMatcher
  public paperForm:FormGroup

  @ViewChild(MatPaginator) paginator: MatPaginator;
 

  banks: Bank[]
  filteredBanks: Observable<Bank[]>;

  public showActivity = true;
  public pageSize = 15;
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

    this.paperForm = this.formBuilder.group({
      bankCtrl: ['', [ Validators.required ]]
     
    })
   }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('user'))

    this.fintechService.getBankList().subscribe(
      data => {
        console.log(data)
        this.banks = Array.from(data.content, (x:any) => {
          return { name: x.bankName, id: x._id, img: '', numAccounts: x.accounts.length, accounts: x.accounts }
        }) ;

        this.filteredBanks = this.paperForm.controls['bankCtrl'].valueChanges
        .pipe(
          startWith(''),
          map(bank => bank ? this._filterBanks(bank) : this.banks.slice())
        );
      },
      error => {
        console.log(error)
      }
    )

    this.getActivityList();

    let w = window.innerWidth;
    if(w <= this.maxWidth){
      this.showActivity = false
      this.pageSize = 15;
    } else {
      this.pageSize = 15;
    }
    
  }

  getActivityList(){
    this.fintechService.getActivityList().subscribe(
      data => {
        console.log(data)

        let list = Array.from( data.content, (x:any) => {
          return { bank: x.bank.bankName, time: x.date }
        } )
        this.activityList = new MatTableDataSource<ActivityListElement> ( list );
        this.activityList.paginator = this.paginator;
        
      },
      error => {
        console.log(error)
      }
    )
  }

  private _filterBanks(value: string): Bank[] {
    const filterValue = value.toLowerCase();

    return this.banks.filter(bank => bank.name.toLowerCase().indexOf(filterValue) === 0);
  }

  onBankSelect(evt:MatAutocompleteSelectedEvent) {
    console.log(evt)

    this.currentBank = this.getBankByName(evt.option.value);
    this.fintechService.getAccountList(this.currentUser._id, this.currentBank.id ).subscribe(
      data => {
        console.log(data)

        this.currentAccounts = data.content;
       
      },
      error => {
        console.log(error)
      }
    )

    this.addActivity();

    
  }
  addActivity(){
    let activityData: any = {};
    activityData.user = this.currentUser._id;
    activityData.bank = this.currentBank.id;

    let w = window.innerWidth;
    if(w <= this.maxWidth){ this.showActivity = false }

    this.fintechService.createActivity(activityData).subscribe(
      data => {
        console.log(data)
        this.getActivityList();
        
      },
      error => {
        console.log(error)
      }
    )
  }
  onActivityClick(activity){
    console.log(activity);
    
    this.currentBank = this.getBankByName(activity.bank);
    this.paperForm.controls['bankCtrl'].setValue(this.currentBank.name)
    this.addActivity();

    this.fintechService.getAccountList(this.currentUser._id, this.currentBank.id ).subscribe(
      data => {
        console.log(data)

        this.currentAccounts = data.content;
       
      },
      error => {
        console.log(error)
      }
    )
  }
  getBankByName(name){
    let bank = this.banks.filter( x => x.name.toLowerCase() === name.toLowerCase() )[0];
    console.log(bank);
    return bank;
  }

  showPanel(){
    this.showActivity = true;
  }

  showBadge(ac){
    return ac.balance < 50000
  }

  onSubmit() {
    localStorage.setItem('bank', JSON.stringify(this.currentBank));
    localStorage.setItem('accounts', JSON.stringify(this.currentAccounts));
    this.router.navigateByUrl('payment')
  }
  

}
