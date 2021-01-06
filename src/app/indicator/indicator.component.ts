import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

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
      indicatorInput: {
        statement: $statement
        description: $description
        label: $label
        units: $units
        dataSource: $dataSource
        type: $type
        initiative: $initiative
      }
    ) {
      statement
      description
      label
      units
      dataSource
      type
      initiative {
        name
      }
    }
  }
`;

const GET_INITIATIVE_INDICATOR = gql`
  query getIndicator($id: ID!) {
    indicator(_id: $id) {
      _id
      statement
      description
      label
      units
      dataSource
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

  initiativeId: any;
  indicatorId: any;
  indicator: any;
  indicatorType: any;
  indicatorCreateFormType: any;

  constructor(
    private apollo: Apollo,
    private _dataService: AppService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.initiativeId = params.get('initiativeId');
      this.indicatorCreateFormType = params.get('indicatorCreateFormType');
    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      if (params.get('pathwayId') !== null) {
        this.indicatorId = params.get('pathwayId');
        this.indicatorType = 'Pathway';
      }
      if (params.get('outcomeId') !== null) {
        this.indicatorId = params.get('outcomeId');
        this.indicatorType = 'Outcome';
      }

      if (this.indicatorId) {
        this.findIndicator();
      }
    });
    //add delete
  }

  findIndicator() {
    this.apollo
      .query({
        query: GET_INITIATIVE_INDICATOR,
        variables: {
          id: this.indicatorId,
        },
      })
      .subscribe(({ data }: any) => {
        if (data.indicator) {
          this.indicator = data.indicator;
          this.indicatorForm.setValue({
            statement: this.indicator.statement,
            description: this.indicator.description,
            label: this.indicator.label,
            units: this.indicator.units,
            dataSource: this.indicator.dataSource,
          });
        }
      });
  }

  onSubmit() {
    this.indicatorForm.value.type = this._dataService.getData()[0].indicatorType;
    this.indicatorForm.value.initiative = this.initiativeId;

    this.apollo
      .mutate({
        mutation: CREATE_INDICATOR,
        variables: this.indicatorForm.value,
      })
      .subscribe(() => {
        console.log('created');
      });

    this.indicatorForm.setValue({
      statement: '',
      description: '',
      label: '',
      units: '',
      dataSource: '',
    });
  }
}
