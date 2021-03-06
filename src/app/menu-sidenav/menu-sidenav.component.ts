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
  query getInitiativePathwayIndicators($initiative: String!) {
    initiativePathwayIndicators(initiative: $initiative) {
      indicators {
        _id
        statement
        description
        label
        units
        dataSource
        type
      }
    }
  }
`;

const GET_INITIATIVE_OUTCOME_INDICATORS = gql`
  query getOutcomePathwayIndicators($initiative: String!) {
    initiativeOutcomeIndicators(initiative: $initiative) {
      indicators {
        _id
        statement
        description
        label
        units
        dataSource
        type
      }
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
  indicatorPathways?: object[];
  indicatorOutcomes?: object[];

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

    this.apollo
      .query({
        query: GET_INITIATIVE_PATHWAY_INDICATORS,
        variables: {
          initiative: initiative._id,
        },
      })
      .subscribe(({ data }: any) => {
        if (data.initiativePathwayIndicators.indicators) {
          this.indicatorPathways = data.initiativePathwayIndicators.indicators;
        }
      });

    this.apollo
      .query({
        query: GET_INITIATIVE_OUTCOME_INDICATORS,
        variables: {
          initiative: initiative._id,
        },
      })
      .subscribe(({ data }: any) => {
        if (data.initiativeOutcomeIndicators.indicators) {
          this.indicatorOutcomes = data.initiativeOutcomeIndicators.indicators;
        }
      });
  }

  displayPathwayCreateForm() {
    this.router.navigate(['/initiative/create-indicator',
      this.pathParam.source._value,
      'pathway',
    ]);

    this.indicatorType = 'P';

    const currentItem: DataInterface = {
      indicatorType: this.indicatorType,
    };

    this._dataService.addData(currentItem);
  }

  displayOutcomeCreateForm() {
    this.router.navigate([
      '/initiative/create-indicator',
      this.pathParam.source._value,
      'outcome',
    ]);

    this.indicatorType = 'O';

    const currentItem: DataInterface = {
      indicatorType: this.indicatorType,
    };

    this._dataService.addData(currentItem);
  }

  displayPathway(pathwayId: string) {
    this.isNotHomepage = true;
    this.indicatorType = 'P';
    const currentItem: DataInterface = {
      indicatorType: this.indicatorType,
    };

    this._dataService.addData(currentItem);
    this.router.navigate(['/initiative/edit-pathway', pathwayId]);
  }

  displayOutcome(outcomeId: string) {
    this.isNotHomepage = true;
    this.indicatorType = 'O';
    const currentItem: DataInterface = {
      indicatorType: this.indicatorType,
    };

    this._dataService.addData(currentItem);
    this.router.navigate(['/initiative/edit-outcome', outcomeId]);
  }
}
