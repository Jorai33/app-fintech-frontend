import { Component, OnInit, NgZone } from '@angular/core';

import {FormGroup, FormControl, FormGroupDirective, NgForm, Validators, FormBuilder} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

import {PaperFormErrorStateMatcher} from '../../util/paper-form-error-state-matcher'

import { FintechService } from '../fintech.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private formBuilder:FormBuilder
  public matcher:ErrorStateMatcher
  public paperForm:FormGroup

  constructor(
    private authService:AuthenticationService,
    private fintechService:FintechService,
    private route: ActivatedRoute,
    private router: Router,
    ) {
    this.formBuilder = new FormBuilder();

    this.matcher = new PaperFormErrorStateMatcher();

    this.paperForm = this.formBuilder.group({
      username: ['', [ Validators.required, Validators.email ]],
      password: ['', [ Validators.required ]]
    })
   }

  ngOnInit() {
    // reset login status
    this.fintechService.logout();
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.paperForm.value);
    let data:any = this.paperForm.value;
    this.authService.login(data).subscribe(
      result => {
        console.log(result);
        this.router.navigateByUrl('account');

      },
      error => {
        console.log(error);
      }
      )
  }
  

}
