import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';

import { EIItem } from '../edit-initiative/edit-initiative';
import { EditInitiatiaveService } from '../edit-initiative/edit-initiatiave.service';

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

  displayInitiativeData(initiative: any) {
    this.goalTeamForm.controls['goalTeam'].setValue(initiative.goalTeam._id);
    this.router.navigate(['/edit-initiative', initiative._id]);

    // When saving, the value of goal team should be added to the data sent by the request
    // Clear on reload
    console.log('display data');
  }

  deleteIndicator() {
    console.log('delete this');
  }

  public addGoalTeamToInitiative() {
    const currentItem: EIItem = {
      goalTeam: this.goalTeamForm.value
    };

    this.editInitiatiaveService.addData(currentItem);
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  initiatives!: Observable<any>;
  goalTeams!: Observable<any>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private apollo: Apollo,
    private router: Router,
    private editInitiatiaveService: EditInitiatiaveService
  ) {}

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

    this.goalTeams = this.apollo
      .watchQuery({
        query: GET_GOAL_TEAMS,
      })
      .valueChanges.pipe(
        map((result: any) => {
          return result.data.goalTeams.goalTeams;
        })
      );
  }
}
