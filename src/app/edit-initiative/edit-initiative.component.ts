import { Component, OnInit } from '@angular/core';
// This is the object that is exposed in a reactive form in contrast to the template-driven forms which are limited to directives within that template
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

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
    name: new FormControl(''),
    leadName: new FormControl(''),
    leadEmail: new FormControl(''),
    startYear: new FormControl(''),
    endYear: new FormControl(''),
    statement: new FormControl(''),
  });

  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo,
    private fb: FormBuilder
  ) {}

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
        if (data.initiative) {
          this.initiative = data.initiative;
          this.editInitiativeForm.setValue({
            name: this.initiative.name,
            leadName: this.initiative.leadName,
            leadEmail: this.initiative.leadEmail,
            startYear: this.initiative.startYear,
            endYear: this.initiative.endYear,
            statement: this.initiative.statement,
          });
          console.log(this.editInitiativeForm);
        } else this.error = 'Initiative does not exist';
      });
  }

  onSubmit() {
    console.log(this.editInitiativeForm.value);
  }
}
