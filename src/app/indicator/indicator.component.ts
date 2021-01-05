import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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
    dataSource: new FormControl('')
  });

  onSubmit() {
    console.log(this.indicatorForm.value);
  }
  constructor() {}

  ngOnInit(): void {}
}
