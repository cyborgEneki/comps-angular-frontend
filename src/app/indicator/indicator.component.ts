import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { AppService } from '../app.service.service';

const CREATE_INDICATOR = gql`
  mutation createIndicator(
    $statement: String!
    $description: String!
    $label: String!
    $units: String!
    $dataSource: String!
    $type: String!
    $initiative: String!
  ) {
    createIndicator(
      quoteInput: {
        statement: $statement
        description: $description
        label: $label
        units: $units
        dataSource: $dataSource
        type: $type
        initiative: $initiative
      }
    ) {
      _id
      statement
      description
      label
      units
      dataSource
      type
      initiative
    }
  }
`;

@Component({
  selector: 'app-indicator',
  templateUrl: './indicator.component.html',
  styleUrls: ['./indicator.component.scss'],
})
export class IndicatorComponent implements OnInit {
  indicatorForm = new FormGroup({
    statement: new FormControl(''),
    description: new FormControl(''),
    label: new FormControl(''),
    units: new FormControl(''),
    dataSource: new FormControl(''),
  });

  constructor(
    private apollo: Apollo,
    private _dataService: AppService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    //PASS TYPE
    this.indicatorForm.value.indicatorType = this._dataService.getData()[0].indicatorType;

    //PASS INITIATIVE_ID
    console.log(this.indicatorForm.value);

    this.apollo
      .mutate({
        mutation: CREATE_INDICATOR,
        variables: this.indicatorForm.value,
      })
      .subscribe(() => {
        console.log('created');
      });
  }
}
