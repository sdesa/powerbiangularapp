import { Component, OnInit, OnDestroy } from '@angular/core';
import { BiService } from '../bi.service';
import * as pbi from 'powerbi-client';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit, OnDestroy {

  // observable to subscribe to the token call
  tokenSubscription: Subscription;

  // variables to hold the report id and group id
  reportId: string;
  groupId: string;

  // inject the service in the constructor
  constructor(private service: BiService) { }

  // create an instance of powerbi
  private powerbi = new pbi.service.Service(pbi.factories.hpmFactory,
    pbi.factories.wpmpFactory,
    pbi.factories.routerFactory);

  // initialize the variables on init and embed the report
  ngOnInit() {
    this.groupId = 'XXXX';
    this.reportId = 'XXXX';
    this.embedReport(this.groupId, this.reportId);
  }

  embedReport(groupId: string, reportId: string) {

    // bootstrap the report to booost performance
    this.powerbi.bootstrap(document.getElementById('embedReport') as HTMLElement, {type: 'report'});

    this.tokenSubscription = this.service.getReportEmbedToken(this.groupId, this.reportId)
      .subscribe((response) => {
        const config = {
          type: 'report',
          tokenType: pbi.models.TokenType.Embed,
          embedUrl: response.embedUrl,
          accessToken: response.embedToken,
        };

        // Grab the reference to the div HTML element that will host the report.
        const reportsContainer = document.getElementById('embedReport') as HTMLElement;

        const report = this.powerbi.embed(
          reportsContainer,
          config
        );

        // Removes a given event handler if it exists.
        report.off('loaded');

        // Add an event handler which prints to Log window.
        report.on('loaded', e => {
        });

        report.off('pageChanged');
        report.on('pageChanged', e => {
        });

        report.on('error', event => {
          console.log(event.detail);
          report.off('error');
        });
      },
      (error) => {
        console.log(error);
      });
  }

  // unsubscribe to the token
  ngOnDestroy(): void {
    if (this.tokenSubscription) {
      this.tokenSubscription.unsubscribe();
    }
  }

}
