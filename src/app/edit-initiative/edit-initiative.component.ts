import { Component, OnDestroy, OnInit } from '@angular/core';
// This is the object that is exposed in a reactive form in contrast to the template-driven forms which are limited to directives within that template
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { RouteStateService } from '../route-state.service';

const GET_INITIATIVE = gql`
  query getInitiative($id: ID!) {
    initiative(_id: $id) {
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
`;

const UPDATE_INITIATIVE = gql`
  mutation updateInitiative(
    $id: ID!
    $name: String!
    $leadName: String!
    $leadEmail: String!
    $startYear: String!
    $endYear: String!
    $statement: String!
    $goalTeam: String!
  ) {
    updateInitiative(
      initiativeInput: {
        id: $id
        name: $name
        leadName: $leadName
        leadEmail: $leadEmail
        startYear: $startYear
        endYear: $endYear
        statement: $statement
        goalTeam: $goalTeam
      }
    ) {
      _id
      name
      leadName
      leadEmail
      startYear
      endYear
      statement
      goalTeam {
        name
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
  selector: 'app-edit-initiative',
  templateUrl: './edit-initiative.component.html',
  styleUrls: ['./edit-initiative.component.scss'],
})
export class EditInitiativeComponent implements OnInit, OnDestroy {
  private destroy = new Subject<void>();

  initiativeId: any;
  initiative: any = {};
  error!: String;
  goalTeams!: Observable<any>;
  test!: any;

  editInitiativeForm = new FormGroup({
    name: new FormControl(''),
    leadName: new FormControl(''),
    leadEmail: new FormControl(''),
    startYear: new FormControl(''),
    endYear: new FormControl(''),
    statement: new FormControl(''),
    goalTeam: new FormControl(''),
  });

  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo,
    private routeStateService: RouteStateService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.initiativeId = params.get('initiativeId');
    });

    this.goalTeams = this.apollo
      .watchQuery({
        query: GET_GOAL_TEAMS,
      })
      .valueChanges.pipe(
        map((result: any) => {
          return result.data.goalTeams.goalTeams;
        })
      );

    this.route.paramMap
      .pipe(
        map((paramMap) => {
          this.test = paramMap.get('initiativeId');
        }),
        takeUntil(this.destroy)
      )
      .subscribe((routePathParam) => {
        this.routeStateService.updatePathParamState(this.test);
      });

    this.findInitiative();
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
    this.routeStateService.updatePathParamState("");
  }

  findInitiative() {
    this.error = '';
    this.apollo
      .query({
        query: GET_INITIATIVE,
        variables: {
          id: this.initiativeId,
        },
      })
      .subscribe(({ data }) => {
        if (data.initiative) {
          this.initiative = data.initiative;
          this.editInitiativeForm.setValue({
            name: this.initiative.name,
            leadName: this.initiative.leadName,
            leadEmail: this.initiative.leadEmail,
            startYear: this.initiative.startYear,
            endYear: this.initiative.endYear,
            statement: this.initiative.statement,
            goalTeam: this.initiative.goalTeam._id,
          });
        } else this.error = 'Initiative does not exist';
      });
  }

  onSubmit() {
    this.editInitiativeForm.value.id = this.initiativeId;

    this.apollo
      .mutate({
        mutation: UPDATE_INITIATIVE,
        variables: this.editInitiativeForm.value,
      })
      .subscribe(() => {
        console.log('updated');
      });
  }
}
