import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app5';

  constructor(
    private router:Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
    ) {
      this.matIconRegistry.addSvgIcon(
        "svg_dashboard",
        this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/img/icon_dashboard.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "svg_offer",
        this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/img/offers.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "svg_order",
        this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/img/orders.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "svg_product",
        this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/img/products.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "svg_settings",
        this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/img/settings.svg")
      );
      
      this.matIconRegistry.addSvgIcon(
        "svg_report",
        this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/img/reports.svg")
      );
      
      this.matIconRegistry.addSvgIcon(
        "svg_logout",
        this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/img/logout_white.svg")
      );
      
      this.matIconRegistry.addSvgIcon(
        "svg_availability",
        this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/img/availability.svg")
      );
      
      this.matIconRegistry.addSvgIcon(
        "svg_upload",
        this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/img/upload.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "svg_download",
        this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/img/download.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "svg_arrow_left",
        this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/img/icon_arrow_left.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "svg_edit",
        this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/img/edit_white.svg")
      );

      // --- Bank Icons --- //
      this.matIconRegistry.addSvgIcon(
        "svg_search",
        this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/img/bank/search.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "svg_alarm",
        this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/img/bank/alarm.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "svg_bank",
        this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/img/bank/bank.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "svg_dollar",
        this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/img/bank/dollar.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "svg_pay",
        this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/img/bank/pay.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "svg_money",
        this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/img/bank/money.svg")
      );



      this.router.navigateByUrl('login')

     }

}
