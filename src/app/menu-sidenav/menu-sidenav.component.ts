import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

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
        statement,
        goalTeam
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
  goalTeams = [{ test: 'e' }, { test: 'f' }, { test: 'g' }];

  displayInitiativeData(initiative: Object) {
    // Goal team should appear in dropdown
    let initiativeGoalTeam = document.getElementById('goal-team');
    console.log(initiative);
    // initiativeGoalTeam.value = initiative.goalTeam;
    // console.log(initiativeGoalTeam.value);
    // Route should change to edit form
    // Form should be populated with initiative data

    // When saving, the value of goal team should be added to the data sent by the request
    console.log('display data')
  };

  deleteIndicator() {
    console.log('delete this');
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  public initiatives!: Observable<any>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private apollo: Apollo
  ) {}

  ngOnInit(): void {
    this.initiatives = this.apollo
      .watchQuery({
        query: GET_INITIATIVES,
      })
      .valueChanges.pipe(
        map((result: any) => {
          console.log(result.data.initiatives.initiatives);
          return result.data.initiatives.initiatives;
        })
      );
  }
}
