import { Component, OnInit } from '@angular/core';
// This is the object that is exposed in a reactive form in contrast to the template-driven forms which are limited to directives within that template
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

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

@Component({
  selector: 'app-edit-initiative',
  templateUrl: './edit-initiative.component.html',
  styleUrls: ['./edit-initiative.component.scss'],
})
export class EditInitiativeComponent implements OnInit {
  initiativeId!: String;
  initiative: any = {};
  error!: String;

  editInitiativeForm = new FormGroup({
    initiativeName: new FormControl(''),
    initiativeLead: new FormControl(''),
    initiativeLeadEmail: new FormControl(''),
    startYear: new FormControl(''),
    endYear: new FormControl(''),
    statement: new FormControl(''),
  });

  constructor(private route: ActivatedRoute, private apollo: Apollo) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.initiativeId = params.get('initiativeId');
    });

    this.findInitiative();
  }

  findInitiative() {
    this.error = '';
    this.apollo
      .query<any>({
        query: gql`
          query($id: ID!) {
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
        `,
        variables: {
          id: this.initiativeId,
        },
      })
      .subscribe(({ data }) => {
        if (data.initiative) {this.initiative = data.initiative}
        else this.error = 'Book does not exist';
      });
  }

  onSubmit() {
    console.log(this.editInitiativeForm.value);
  }
}
