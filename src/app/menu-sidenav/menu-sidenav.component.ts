import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';

import { AppService } from '../app.service.service';
import { DataInterface } from '../app.data';
import { RouteStateService } from '../route-state.service';

const GET_INITIATIVES = gql`
  {
    initiatives {
      initiatives {
        _id
        name
        leadName
        leadEmail
        startYear
        endYear
        statement
        goalTeam {
          _id
          name
        }
      }
    }
  }
`;

const GET_INITIATIVE_PATHWAY_INDICATORS = gql`
  query initiativePathwayIndicators($initiative: String!) {
    initiativePathwayIndicators(initiative: $initiative) {
      _id
      statement,
      description,
      label,
      units,
      dataSource,
      type
    }
  }
`;

const GET_INITIATIVE_OUTCOME_INDICATORS = gql`
  query initiativePathwayIndicators($initiative: String!) {
    initiativePathwayIndicators(initiative: $initiative) {
      _id
      statement,
      description,
      label,
      units,
      dataSource,
      type
    }
  }
`;

@Component({
  selector: 'app-menu-sidenav',
  templateUrl: './menu-sidenav.component.html',
  styleUrls: ['./menu-sidenav.component.scss'],
})
export class MenuSidenavComponent {
  initiatives!: Observable<any>;
  selectInitiativeForm = new FormGroup({
    initiative: new FormControl(''),
  });
  isNotHomepage: boolean = false;
  indicatorType?: string;
  pathParam!: Observable<string>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private apollo: Apollo,
    private router: Router,
    private _dataService: AppService,
    private routeStateService: RouteStateService
  ) {}

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  ngOnInit(): void {
    this.initiatives = this.apollo
      .watchQuery({
        query: GET_INITIATIVES,
      })
      .valueChanges.pipe(
        map((result: any) => {
          return result.data.initiatives.initiatives;
        })
      );
    this.pathParam = this.routeStateService.pathParam;
  }

  redirectToHomePage() {
    this.selectInitiativeForm.controls['initiative'].setValue('');
    this.isNotHomepage = false;
    this.router.navigate(['/']);
  }

  displayInitiativeData(initiative: any) {
    this.isNotHomepage = true;
    this.router.navigate(['/edit-initiative', initiative._id]);
    // Return all indicators and store in service

    this.apollo
      .query({
        query: GET_INITIATIVE_PATHWAY_INDICATORS,
        variables: {
          initiative: initiative._id,
        },
      })
      .subscribe(({ data }: any) => {
        if (data) {
          console.log(data);
        }
      });
    // const currentItem: DataInterface = {
    //   indicatorType: this.indicatorType,
    // };

    // this._dataService.addData(currentItem);
  }

  displayPathwayCreateForm() {
    this.router.navigate([
      '/initiative/create-indicator',
      this.pathParam.source._value,
    ]);

    this.indicatorType = 'P';

    const currentItem: DataInterface = {
      indicatorType: this.indicatorType,
    };

    this._dataService.addData(currentItem);
  }

  deleteIndicator() {
    console.log('delete this');
  }
}
