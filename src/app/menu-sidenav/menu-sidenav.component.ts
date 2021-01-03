import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';

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

const GET_GOAL_TEAMS = gql`
  {
    goalTeams {
      goalTeams {
        _id
        name
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
  goalTeamForm = new FormGroup({
    goalTeam: new FormControl(''),
  });

  // stateFormControl = new FormControl('', [Validators.required]);
  // goalTeams = [
  //   { id: 1, name: 'e' },
  //   { id: 2, name: 'f' },
  //   { id: 3, name: 'g' },
  // ];

  displayInitiativeData(initiative: Object) {
    // Goal team should appear in dropdown
    // Team where
    console.log(initiative);
    this.goalTeamForm.controls['goalTeam'].setValue(initiative.goalTeam._id);
    // console.log(this.goalTeamName);
    // Route should change to edit form
    // Form should be populated with initiative data

    // When saving, the value of goal team should be added to the data sent by the request
    console.log('display data');
  }

  deleteIndicator() {
    console.log('delete this');
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  // public initiatives!: Observable<any>;
  public initiatives!: Observable<any>;
  public goalTeams!: Observable<any>;

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

    this.goalTeams = this.apollo
      .watchQuery({
        query: GET_GOAL_TEAMS,
      })
      .valueChanges.pipe(
        map((result: any) => {
          console.log(result.data.goalTeams.goalTeams);
          return result.data.goalTeams.goalTeams;
        })
      );
  }
}
