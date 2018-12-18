import { Component, OnInit, ViewChild } from '@angular/core';
import { SidenavService } from '../sidenav.service';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';


@Component({
  selector: 'app-fintech',
  templateUrl: './fintech.component.html',
  styleUrls: ['./fintech.component.scss']
})
export class FintechComponent implements OnInit {

  @ViewChild('sidenav')
  public sidenav: MatSidenav;

  constructor(
    private router:Router, 
    private sidenavService:SidenavService, 
    ) {
      
     }


  ngOnInit() {
    // this.sidenavService.setSidenav(this.sidenav);
  }

  isLoggedIn(){
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("user");

    if(token){
      return true
    } 
    return false;
  }
  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    this.router.navigateByUrl('')
  }

}
